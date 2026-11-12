#!/usr/bin/env node
/**
 * 檢查資料夾內的課件 index.html，寫入 Markdown 報告。
 *
 * 用法：node scripts/run-lesson-check.mjs --root <資料夾> --out <報告.md>
 *
 * 結束碼：有失敗為 1，全部通過為 0。
 * 私用區字元達到 30 個視為「大量」。
 */

import crypto from 'node:crypto';
import fs from 'node:fs';
import http from 'node:http';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PAGE_TIMEOUT_MS = 8000;
const PUA_LIMIT = 30;
const JS_TYPES = new Set([
  '',
  'text/javascript',
  'application/javascript',
  'text/ecmascript',
  'application/ecmascript',
  'module',
]);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.wasm': 'application/wasm',
  '.txt': 'text/plain; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.xml': 'application/xml',
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function usage() {
  return [
    '用法：node scripts/run-lesson-check.mjs --root <資料夾> --out <報告.md>',
    '',
    '遍歷資料夾內所有課件 index.html（略過 node_modules、.git、_archive，',
    '以及旁邊有 src 的 dist），檢查編碼、內聯 script、相對資源、空白頁，',
    '若本機有 Chrome 或 Edge 再以無頭模式開每一頁並記下控制台錯誤。',
    '有失敗時結束碼為 1，全部通過時為 0。',
  ].join('\n');
}

function parseArgs(argv) {
  const args = { root: '', out: '', help: false };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--help' || token === '-h') {
      args.help = true;
    } else if (token === '--root') {
      args.root = argv[i + 1] || '';
      i += 1;
    } else if (token === '--out') {
      args.out = argv[i + 1] || '';
      i += 1;
    } else {
      throw new Error(`未知參數：${token}`);
    }
  }
  return args;
}

function oneLine(text, max = 500) {
  const flat = String(text ?? '').replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max)}…` : flat;
}

function inlineCode(text) {
  return oneLine(text, 240).replace(/`/g, "'");
}

function isPua(codePoint) {
  return (codePoint >= 0xe000 && codePoint <= 0xf8ff)
    || (codePoint >= 0xf0000 && codePoint <= 0xffffd)
    || (codePoint >= 0x100000 && codePoint <= 0x10fffd);
}

function scanChars(text) {
  let fffd = 0;
  let pua = 0;
  for (const ch of text) {
    const codePoint = ch.codePointAt(0);
    if (codePoint === 0xfffd) fffd += 1;
    else if (isPua(codePoint)) pua += 1;
  }
  return { fffd, pua };
}

function decodeUtf8(buffer) {
  try {
    return { ok: true, text: new TextDecoder('utf-8', { fatal: true }).decode(buffer) };
  } catch {
    return { ok: false, text: new TextDecoder('utf-8', { fatal: false }).decode(buffer) };
  }
}

function startsWithTag(lower, index, name) {
  const token = `<${name}`;
  if (!lower.startsWith(token, index)) return false;
  const next = lower[index + token.length];
  return next === undefined || next === '>' || next === '/' || /\s/.test(next);
}

function stripHtmlComments(html) {
  const lower = html.toLowerCase();
  const parts = [];
  let cursor = 0;
  let i = 0;
  while (i < html.length) {
    const lt = lower.indexOf('<', i);
    if (lt === -1) break;
    if (startsWithTag(lower, lt, 'script') || startsWithTag(lower, lt, 'style')) {
      const name = startsWithTag(lower, lt, 'script') ? 'script' : 'style';
      const close = lower.indexOf(`</${name}>`, lt);
      i = close === -1 ? html.length : close + name.length + 3;
      continue;
    }
    if (lower.startsWith('<!--', lt)) {
      parts.push(html.slice(cursor, lt));
      const end = lower.indexOf('-->', lt + 4);
      i = end === -1 ? html.length : end + 3;
      cursor = i;
      continue;
    }
    i = lt + 1;
  }
  parts.push(html.slice(cursor));
  return parts.join('');
}

function getAttr(source, name) {
  const match = source.match(new RegExp(
    `(?:^|[\\s/])(?:[\\w-]+:)?${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`,
    'i',
  ));
  if (!match) return null;
  return match[1] ?? match[2] ?? match[3] ?? '';
}

function decodeAttr(value) {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => safeCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, num) => safeCodePoint(Number(num)));
}

function safeCodePoint(value) {
  if (!Number.isInteger(value) || value < 0 || value > 0x10ffff) return '';
  try {
    return String.fromCodePoint(value);
  } catch {
    return '';
  }
}

function scriptType(attrs) {
  return (getAttr(attrs, 'type') || '').trim().toLowerCase().split(';')[0].trim();
}

function extractInlineScripts(html) {
  const cleaned = stripHtmlComments(html);
  const scripts = [];
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match = re.exec(cleaned);
  while (match) {
    const type = scriptType(match[1]);
    const src = getAttr(match[1], 'src');
    if (src == null && JS_TYPES.has(type)) {
      scripts.push({ type, code: match[2] });
    }
    match = re.exec(cleaned);
  }
  return scripts;
}

function normalizeInline(code) {
  return code.replace(/^\uFEFF/, '').replace(/^\s*<!--\s*/, '').replace(/\s*-->\s*$/, '');
}

function cleanNodeError(stderr) {
  const lines = String(stderr || '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const syntax = lines.find((line) => /SyntaxError|Error:/.test(line));
  return oneLine(syntax || lines[0] || '語法錯誤', 400);
}

function checkInlineScripts(html) {
  const reasons = [];
  const scripts = extractInlineScripts(html);
  if (scripts.length === 0) return reasons;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lesson-check-js-'));
  try {
    scripts.forEach((script, index) => {
      const code = normalizeInline(script.code);
      if (!code.trim()) return;
      const file = path.join(dir, `s${index}${script.type === 'module' ? '.mjs' : '.js'}`);
      fs.writeFileSync(file, code, 'utf8');
      const result = spawnSync(process.execPath, ['--check', file], {
        encoding: 'utf8',
        timeout: 20000,
        windowsHide: true,
      });
      const label = `內聯 script 第 ${index + 1} 段`;
      if (result.error) {
        reasons.push(`${label}無法檢查：${oneLine(result.error.message, 300)}`);
        return;
      }
      if (result.status !== 0) {
        reasons.push(`${label}語法錯誤：${cleanNodeError(result.stderr || result.stdout)}`);
      }
    });
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  return reasons;
}

function extractResourceUrls(html) {
  const source = stripHtmlComments(html)
    .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/gi, '<script$1></script>')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const urls = [];
  const tags = source.match(/<[a-zA-Z][\w:-]*\b[^>]*>/g) || [];
  for (const tag of tags) {
    const src = getAttr(tag, 'src');
    const href = getAttr(tag, 'href');
    if (src != null && src.trim()) urls.push(src.trim());
    if (href != null && href.trim()) urls.push(href.trim());
  }
  return { urls, baseHref: baseHrefOf(source) };
}

function baseHrefOf(html) {
  const match = html.match(/<base\b[^>]*>/i);
  if (!match) return '';
  return getAttr(match[0], 'href') || '';
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function isRemoteScheme(value) {
  return /^[a-z][a-z0-9+.-]*:/i.test(value)
    && !/^file:/i.test(value)
    && !/^[a-z]:[\\/]/i.test(value);
}

function resolveResource(raw, htmlFile, rootDir, baseHref) {
  const trimmed = decodeAttr(raw).trim().replace(/\\/g, '/');
  if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('?') || trimmed.startsWith('//')) {
    return { skip: true };
  }
  if (/^[a-z]:[\\/]/i.test(trimmed)) {
    const disk = path.normalize(trimmed.split('#')[0].split('?')[0]);
    return { disk, display: trimmed };
  }
  if (isRemoteScheme(trimmed)) return { skip: true };
  if (/^file:/i.test(trimmed)) {
    try {
      return { disk: fileURLToPath(trimmed), display: trimmed };
    } catch {
      return { error: `無法解析資源網址：${inlineCode(trimmed)}` };
    }
  }

  const pageUrl = pathToFileURL(htmlFile);
  let baseIsRemote = false;
  let baseUrl = pageUrl;
  const base = decodeAttr(baseHref || '').trim();
  if (base) {
    if (base.startsWith('//') || isRemoteScheme(base)) {
      baseIsRemote = true;
    } else if (base.startsWith('/')) {
      const baseDisk = path.resolve(rootDir, safeDecode(base.split('#')[0].split('?')[0].replace(/^\/+/, '')));
      const asDir = base.endsWith('/') ? baseDisk : path.dirname(baseDisk);
      const href = pathToFileURL(asDir).href.replace(/\/?$/, '/');
      baseUrl = new URL(href);
    } else {
      try {
        baseUrl = new URL(base, pageUrl);
      } catch {
        try {
          baseUrl = new URL(encodeURI(base), pageUrl);
        } catch {
          return { error: `無法解析 base href：${inlineCode(base)}` };
        }
      }
      baseIsRemote = baseUrl.protocol !== 'file:';
    }
  }
  if (baseIsRemote) return { skip: true };

  if (trimmed.startsWith('/')) {
    const pathname = safeDecode(trimmed.split('#')[0].split('?')[0].replace(/^\/+/, ''));
    return { disk: path.resolve(rootDir, pathname), display: trimmed };
  }

  let resolved;
  try {
    resolved = new URL(trimmed, baseUrl);
  } catch {
    try {
      resolved = new URL(encodeURI(trimmed), baseUrl);
    } catch {
      return { error: `無法解析資源網址：${inlineCode(trimmed)}` };
    }
  }
  if (resolved.protocol !== 'file:') return { skip: true };
  return { disk: fileURLToPath(resolved), display: trimmed };
}

function checkResources(html, htmlFile, rootDir) {
  const reasons = [];
  const { urls, baseHref } = extractResourceUrls(html);
  const seen = new Set();
  for (const raw of urls) {
    const resolved = resolveResource(raw, htmlFile, rootDir, baseHref);
    if (resolved.skip) continue;
    if (resolved.error) {
      reasons.push(resolved.error);
      continue;
    }
    const key = path.normalize(resolved.disk).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    if (!fs.existsSync(resolved.disk)) {
      reasons.push(`相對資源不存在：\`${inlineCode(resolved.display)}\`（${resolved.disk}）`);
    }
  }
  return reasons;
}

function visibleText(html) {
  return decodeAttr(html.replace(/<[^>]+>/g, ' '))
    .replace(/[\u00a0\u200b\u200c\u200d\ufeff]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function checkBlank(html) {
  const bodyMatch = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i);
  const body = bodyMatch
    ? bodyMatch[1]
    : html.replace(/<!doctype[^>]*>/gi, '').replace(/<head\b[^>]*>[\s\S]*?<\/head>/gi, '');
  const structural = body
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');
  const hasWidget = /<(canvas|svg|button)\b/i.test(structural);
  if (!hasWidget && visibleText(structural).length === 0) {
    return ['頁面空白：主體沒有可見文字，也沒有 canvas、svg 或 button'];
  }
  return [];
}

function checkFileStatic(file, rootDir) {
  let buffer;
  try {
    buffer = fs.readFileSync(file);
  } catch (error) {
    return [`無法讀取檔案：${oneLine(error.message, 300)}`];
  }
  const decoded = decodeUtf8(buffer);
  let text = decoded.text;
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  const reasons = [];
  if (!decoded.ok) reasons.push('不是有效的 UTF-8');
  const chars = scanChars(text);
  if (decoded.ok && chars.fffd > 0) reasons.push(`含有替代字元 U+FFFD（${chars.fffd} 個）`);
  if (chars.pua >= PUA_LIMIT) reasons.push(`私用區字元過多（${chars.pua} 個，門檻 ${PUA_LIMIT}）`);
  reasons.push(...checkInlineScripts(text));
  reasons.push(...checkResources(text, file, rootDir));
  reasons.push(...checkBlank(text));
  return reasons;
}

function directoryHasSrc(parent) {
  try {
    return fs.readdirSync(parent, { withFileTypes: true })
      .some((entry) => entry.isDirectory() && entry.name.toLowerCase() === 'src');
  } catch {
    return false;
  }
}

function collectIndexFiles(rootDir) {
  const files = [];
  const seen = new Set();
  const stack = [rootDir];
  while (stack.length > 0) {
    const dir = stack.pop();
    let real = dir;
    try {
      real = fs.realpathSync(dir);
    } catch {
      continue;
    }
    const marker = real.toLowerCase();
    if (seen.has(marker)) continue;
    seen.add(marker);
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) {
        if (entry.name.toLowerCase() === 'index.html') {
          try {
            if (fs.statSync(full).isFile()) files.push(path.resolve(full));
          } catch {
            // 斷掉的連結略過。
          }
        }
        continue;
      }
      if (entry.isDirectory()) {
        const lower = entry.name.toLowerCase();
        if (lower === 'node_modules' || lower === '.git' || lower === '_archive') continue;
        if (lower === 'dist' && directoryHasSrc(dir)) continue;
        stack.push(full);
        continue;
      }
      if (entry.isFile() && entry.name.toLowerCase() === 'index.html') {
        files.push(path.resolve(full));
      }
    }
  }
  files.sort((a, b) => a.localeCompare(b, 'zh-Hant', { numeric: true, sensitivity: 'base' }));
  return files;
}

function findBrowser() {
  const programFiles = process.env.PROGRAMFILES || 'C:\\Program Files';
  const programFilesX86 = process.env['PROGRAMFILES(X86)'] || 'C:\\Program Files (x86)';
  const localAppData = process.env.LOCALAPPDATA || '';
  const candidates = [
    path.join(programFiles, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(localAppData, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(programFilesX86, 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(programFiles, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(programFilesX86, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  ];
  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) return candidate;
  }
  const lookup = process.platform === 'win32' ? 'where.exe' : 'which';
  for (const name of ['chrome', 'msedge', 'google-chrome', 'microsoft-edge']) {
    const result = spawnSync(lookup, [name], { encoding: 'utf8', windowsHide: true });
    if (result.status !== 0) continue;
    const found = result.stdout.split(/\r?\n/).map((line) => line.trim()).find((line) => line && fs.existsSync(line));
    if (found) return found;
  }
  return '';
}

function browserLabel(exe) {
  const base = path.basename(exe).toLowerCase();
  if (base.includes('edge')) return 'Edge';
  if (base.includes('chrome')) return 'Chrome';
  return path.basename(exe);
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on('error', reject);
  });
}

function httpGet(url, timeoutMs = 1000) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: timeoutMs }, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('連線逾時'));
    });
  });
}

function isAutoIcon(pathname) {
  const base = pathname.slice(pathname.lastIndexOf('/') + 1).toLowerCase();
  return base === 'favicon.ico'
    || base === 'apple-touch-icon.png'
    || base === 'apple-touch-icon-precomposed.png';
}

function isEnvFile(disk) {
  const base = path.basename(disk).toLowerCase();
  return base === '.env' || base.startsWith('.env.');
}

function startStaticServer(rootDir) {
  const root = path.resolve(rootDir);
  const server = http.createServer((req, res) => {
    const fail = (status) => {
      if (!res.headersSent) res.writeHead(status);
      res.end();
    };
    try {
      const url = new URL(req.url || '/', 'http://127.0.0.1');
      let pathname = safeDecode(url.pathname);
      if (pathname.endsWith('/')) pathname += 'index.html';
      const disk = path.resolve(root, pathname.replace(/^[/\\]+/, ''));
      const rel = path.relative(root, disk);
      if (rel.startsWith('..') || path.isAbsolute(rel)) {
        fail(403);
        return;
      }
      if (isEnvFile(disk)) {
        fail(404);
        return;
      }
      let stat;
      try {
        stat = fs.statSync(disk);
      } catch {
        stat = null;
      }
      if (!stat || !stat.isFile()) {
        if (isAutoIcon(pathname)) {
          res.writeHead(204);
          res.end();
          return;
        }
        fail(404);
        return;
      }
      const ext = path.extname(disk).toLowerCase();
      res.writeHead(200, {
        'Content-Type': MIME[ext] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      const stream = fs.createReadStream(disk);
      stream.on('error', () => fail(500));
      res.on('error', () => stream.destroy());
      stream.pipe(res);
    } catch {
      fail(400);
    }
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      resolve({ server, port: server.address().port });
    });
  });
}

function connectCdp(wsUrl) {
  const url = new URL(wsUrl);
  const key = crypto.randomBytes(16).toString('base64');
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host: url.hostname, port: Number(url.port) });
    let buf = Buffer.alloc(0);
    let opened = false;
    const pending = new Map();
    const listeners = new Set();
    let nextId = 0;
    let frags = [];
    const fail = (error) => {
      socket.destroy();
      if (!opened) reject(error);
    };
    function sendFrame(opcode, payload) {
      const body = Buffer.isBuffer(payload) ? payload : Buffer.from(String(payload));
      const mask = crypto.randomBytes(4);
      const masked = Buffer.alloc(body.length);
      for (let i = 0; i < body.length; i += 1) masked[i] = body[i] ^ mask[i % 4];
      let header;
      if (body.length < 126) {
        header = Buffer.from([0x80 | opcode, 0x80 | body.length]);
      } else if (body.length < 65536) {
        header = Buffer.alloc(4);
        header[0] = 0x80 | opcode;
        header[1] = 0xfe;
        header.writeUInt16BE(body.length, 2);
      } else {
        throw new Error('瀏覽器訊息過大');
      }
      socket.write(Buffer.concat([header, mask, masked]));
    }
    function handleText(text) {
      let msg;
      try {
        msg = JSON.parse(text);
      } catch {
        return;
      }
      if (msg.id != null && pending.has(msg.id)) {
        const waiter = pending.get(msg.id);
        pending.delete(msg.id);
        clearTimeout(waiter.timer);
        if (msg.error) waiter.reject(new Error(msg.error.message || '瀏覽器指令失敗'));
        else waiter.resolve(msg.result ?? {});
        return;
      }
      if (msg.method) {
        for (const listener of listeners) listener(msg);
      }
    }
    function consume(data) {
      let rest = data;
      let guard = 0;
      while (rest.length >= 2 && guard < 100000) {
        guard += 1;
        const b0 = rest[0];
        const b1 = rest[1];
        let len = b1 & 0x7f;
        let off = 2;
        if (len === 126) {
          if (rest.length < 4) return rest;
          len = rest.readUInt16BE(2);
          off = 4;
        } else if (len === 127) {
          if (rest.length < 10) return rest;
          const big = rest.readBigUInt64BE(2);
          if (big > 32n * 1024n * 1024n) throw new Error('瀏覽器訊息過大');
          len = Number(big);
          off = 10;
        }
        const masked = (b1 & 0x80) !== 0;
        if (rest.length < off + (masked ? 4 : 0) + len) return rest;
        let mask;
        if (masked) {
          mask = rest.subarray(off, off + 4);
          off += 4;
        }
        let payload = rest.subarray(off, off + len);
        rest = rest.subarray(off + len);
        if (masked) {
          payload = Buffer.from(payload);
          for (let i = 0; i < payload.length; i += 1) payload[i] ^= mask[i % 4];
        }
        const opcode = b0 & 0x0f;
        const fin = (b0 & 0x80) !== 0;
        if (opcode === 0x9) {
          sendFrame(0xA, payload);
          continue;
        }
        if (opcode === 0x8) continue;
        if (opcode === 0x1 || opcode === 0x0) {
          if (opcode === 0x1) frags = [];
          frags.push(payload);
          if (fin) {
            const text = Buffer.concat(frags).toString('utf8');
            frags = [];
            handleText(text);
          }
        }
      }
      return rest;
    }
    const api = {
      on(listener) { listeners.add(listener); },
      off(listener) { listeners.delete(listener); },
      send(method, params = {}, sessionId, timeoutMs = PAGE_TIMEOUT_MS) {
        const id = ++nextId;
        const payload = { id, method, params };
        if (sessionId) payload.sessionId = sessionId;
        return new Promise((resolveSend, rejectSend) => {
          const timer = setTimeout(() => {
            pending.delete(id);
            rejectSend(new Error(`瀏覽器指令逾時：${method}`));
          }, timeoutMs);
          pending.set(id, { resolve: resolveSend, reject: rejectSend, timer });
          try {
            sendFrame(0x1, JSON.stringify(payload));
          } catch (error) {
            clearTimeout(timer);
            pending.delete(id);
            rejectSend(error);
          }
        });
      },
      close() {
        socket.destroy();
      },
    };
    socket.setTimeout(10000, () => {
      if (!opened) fail(new Error('WebSocket 連線逾時'));
    });
    socket.on('error', (error) => fail(error));
    socket.on('data', (chunk) => {
      try {
        buf = Buffer.concat([buf, chunk]);
        if (!opened) {
          const sep = buf.indexOf('\r\n\r\n');
          if (sep === -1) return;
          const header = buf.subarray(0, sep).toString('latin1');
          if (!/^HTTP\/1\.[01] 101\b/.test(header)) {
            fail(new Error(`WebSocket 升級失敗：${header.split('\r\n')[0]}`));
            return;
          }
          buf = buf.subarray(sep + 4);
          opened = true;
          socket.setTimeout(0);
          resolve(api);
        }
        if (opened) buf = consume(buf);
      } catch (error) {
        fail(error);
      }
    });
    socket.on('connect', () => {
      const requestPath = `${url.pathname}${url.search}`;
      socket.write(
        `GET ${requestPath} HTTP/1.1\r\n` +
        `Host: ${url.host}\r\n` +
        `Upgrade: websocket\r\n` +
        `Connection: Upgrade\r\n` +
        `Sec-WebSocket-Key: ${key}\r\n` +
        `Sec-WebSocket-Version: 13\r\n` +
        `Origin: http://${url.host}\r\n\r\n`,
      );
    });
  });
}

function formatArg(arg) {
  if (!arg || typeof arg !== 'object') return '';
  if (Object.prototype.hasOwnProperty.call(arg, 'value')) return String(arg.value);
  if (arg.unserializableValue) return String(arg.unserializableValue);
  if (arg.description) return String(arg.description).split('\n')[0];
  return arg.type || '';
}

function formatException(details) {
  const exception = details.exception || {};
  const first = String(exception.description || exception.value || details.text || '例外').split('\n')[0].trim();
  let message = first;
  if (details.text === 'Uncaught' && !/^Uncaught\b/.test(message)) message = `Uncaught ${message}`;
  else if (details.text && details.text !== 'Uncaught' && !message.includes(details.text)) {
    message = `${details.text}: ${message}`;
  }
  const line = (details.lineNumber ?? 0) + 1;
  const column = (details.columnNumber ?? 0) + 1;
  const where = details.url ? `${details.url}:${line}:${column}` : `第 ${line}:${column} 欄`;
  return `${message}（${where}）`;
}

function ignorableConsole(text) {
  return /favicon\.ico/i.test(text)
    || /apple-touch-icon/i.test(text)
    || /chrome-extension:\/\//i.test(text)
    || /edge-extension:\/\//i.test(text);
}

function collectConsole(msg, bucket) {
  if (msg.method === 'Runtime.consoleAPICalled') {
    const type = msg.params?.type;
    if (type !== 'error' && type !== 'assert') return;
    const text = `console.${type}: ${oneLine((msg.params.args || []).map(formatArg).join(' '), 400)}`;
    if (!ignorableConsole(text)) bucket.push(`控制台錯誤：${text}`);
    return;
  }
  if (msg.method === 'Runtime.exceptionThrown') {
    const text = formatException(msg.params?.exceptionDetails || {});
    if (!ignorableConsole(text)) bucket.push(`控制台錯誤：${oneLine(text, 500)}`);
    return;
  }
  if (msg.method === 'Log.entryAdded') {
    const entry = msg.params?.entry || {};
    if (entry.level !== 'error') return;
    const source = entry.source || '';
    if (source && !['javascript', 'console-api', 'network', 'exception', 'security'].includes(source)) return;
    const text = `${entry.text || ''}${entry.url ? ` (${entry.url})` : ''}`;
    if (!ignorableConsole(text)) bucket.push(`控制台錯誤：${oneLine(text, 500)}`);
  }
}

function dedupeConsole(list) {
  const out = [];
  const seen = new Set();
  for (const item of list) {
    const key = item
      .replace(/^控制台錯誤：/, '')
      .replace(/^console\.(error|assert):\s*/i, '')
      .replace(/^Uncaught(?:\s+\(in promise\))?:\s*/i, '')
      .replace(/（[^）]*）\s*$/u, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  if (out.length <= 20) return out;
  const extra = out.length - 20;
  return [...out.slice(0, 20), `另有 ${extra} 則控制台錯誤未列出`];
}

function killBrowser(pid, profile) {
  if (process.platform === 'win32') {
    if (pid) spawnSync('taskkill', ['/pid', String(pid), '/T', '/F'], { windowsHide: true });
    const quoted = profile.replace(/'/g, "''");
    spawnSync('powershell.exe', [
      '-NoProfile',
      '-Command',
      `Get-CimInstance Win32_Process -Filter "Name = 'chrome.exe' OR Name = 'msedge.exe'" | Where-Object { $_.CommandLine -and $_.CommandLine.Contains('${quoted}') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }`,
    ], { windowsHide: true, timeout: 20000 });
    return;
  }
  if (pid) {
    try {
      process.kill(pid, 'SIGKILL');
    } catch {
      // 行程已結束。
    }
  }
}

async function removeProfile(profile) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    try {
      fs.rmSync(profile, { recursive: true, force: true });
      return;
    } catch {
      await delay(200);
    }
  }
}

class BrowserSession {
  constructor(child, profile, cdp, sessionId, port) {
    this.child = child;
    this.profile = profile;
    this.cdp = cdp;
    this.sessionId = sessionId;
    this.port = port;
    this.watch = false;
  }

  pageUrl(rootDir, file) {
    const rel = path.relative(rootDir, file).split(path.sep).map(encodeURIComponent).join('/');
    return `http://127.0.0.1:${this.port}/${rel}`;
  }

  async settle() {
    let loaded = false;
    const listener = (msg) => {
      if (msg.sessionId !== this.sessionId) return;
      if (msg.method === 'Page.loadEventFired') loaded = true;
    };
    this.cdp.on(listener);
    try {
      await this.cdp.send('Page.navigate', { url: 'about:blank' }, this.sessionId, 2000);
      const start = Date.now();
      while (!loaded && Date.now() - start < 2000) await delay(40);
    } catch {
      // 回到空白頁失敗時仍繼續檢查下一頁。
    } finally {
      this.cdp.off(listener);
    }
  }

  async check(url) {
    await this.settle();
    const bucket = [];
    let sawTarget = false;
    let loaded = false;
    const targetPath = new URL(url).pathname;
    const listener = (msg) => {
      if (msg.sessionId !== this.sessionId || !this.watch) return;
      if (msg.method === 'Page.frameNavigated' && !msg.params?.frame?.parentId) {
        try {
          if (new URL(msg.params.frame.url).pathname === targetPath) sawTarget = true;
        } catch {
          // 忽略無法解析的框架網址。
        }
      }
      if (msg.method === 'Page.loadEventFired' && sawTarget) loaded = true;
      collectConsole(msg, bucket);
      if (msg.method === 'Page.javascriptDialogOpening') {
        this.cdp.send('Page.handleJavaScriptDialog', { accept: true }, this.sessionId).catch(() => {});
      }
    };
    this.cdp.on(listener);
    this.watch = true;
    try {
      const start = Date.now();
      const nav = await this.cdp.send('Page.navigate', { url }, this.sessionId);
      if (nav.errorText) bucket.push(`控制台錯誤：無法開啟頁面：${oneLine(nav.errorText, 300)}`);
      while (!loaded && Date.now() - start < PAGE_TIMEOUT_MS) await delay(50);
      if (!loaded) {
        bucket.push(sawTarget
          ? '開啟頁面逾時（約 8 秒）'
          : `開啟頁面逾時（約 8 秒），未進入 ${url}`);
      }
      else {
        const grace = Math.min(300, PAGE_TIMEOUT_MS - (Date.now() - start));
        if (grace > 0) await delay(grace);
      }
    } finally {
      this.watch = false;
      this.cdp.off(listener);
    }
    return dedupeConsole(bucket);
  }

  async stop() {
    try { this.cdp.close(); } catch { /* 連線可能已關 */ }
    killBrowser(this.child.pid, this.profile);
    await removeProfile(this.profile);
  }
}

async function launchBrowser(exe) {
  const debugPort = await getFreePort();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'lesson-check-browser-'));
  let stderr = '';
  const child = spawn(exe, [
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--allow-file-access-from-files',
    `--remote-debugging-port=${debugPort}`,
    '--remote-allow-origins=*',
    `--user-data-dir=${profile}`,
    'about:blank',
  ], { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
  child.stdout.on('data', () => {});
  child.stderr.on('data', (chunk) => {
    stderr = (stderr + chunk.toString('utf8')).slice(-2000);
  });
  child.on('error', (error) => {
    stderr = `${stderr} ${error.message}`.trim();
  });
  const started = Date.now();
  let version = null;
  while (!version && Date.now() - started < 20000) {
    if (child.exitCode != null) break;
    try {
      version = JSON.parse(await httpGet(`http://127.0.0.1:${debugPort}/json/version`, 800));
    } catch {
      await delay(100);
    }
  }
  if (!version?.webSocketDebuggerUrl) {
    killBrowser(child.pid, profile);
    await removeProfile(profile);
    const detail = oneLine(stderr, 300);
    throw new Error(`無頭瀏覽器沒有開偵錯埠${detail ? `：${detail}` : ''}`);
  }
  const list = JSON.parse(await httpGet(`http://127.0.0.1:${debugPort}/json/list`));
  const page = list.find((item) => item.type === 'page');
  if (!page) {
    killBrowser(child.pid, profile);
    await removeProfile(profile);
    throw new Error('無頭瀏覽器沒有頁面目標');
  }
  const cdp = await connectCdp(version.webSocketDebuggerUrl);
  const attached = await cdp.send('Target.attachToTarget', { targetId: page.id, flatten: true });
  const sessionId = attached.sessionId;
  await cdp.send('Runtime.enable', {}, sessionId);
  await cdp.send('Page.enable', {}, sessionId);
  await cdp.send('Log.enable', {}, sessionId);
  await cdp.send('Network.enable', {}, sessionId).catch(() => {});
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true }, sessionId).catch(() => {});
  return new BrowserSession(child, profile, cdp, sessionId, 0);
}

function renderReport({ root, browserLine, failures, total, passed, failed }) {
  const lines = [
    '# 課件檢查報告',
    '',
    `- 根目錄：\`${root}\``,
    `- 總數：${total}`,
    `- 通過：${passed}`,
    `- 失敗：${failed}`,
    `- 瀏覽器：${browserLine}`,
    '',
    '## 失敗',
    '',
  ];
  if (failures.length === 0) {
    lines.push('沒有失敗項目。', '');
  } else {
    for (const item of failures) {
      lines.push(`### \`${item.file}\``, '');
      for (const reason of item.reasons) lines.push(`- ${reason}`);
      lines.push('');
    }
  }
  return `${lines.join('\n').replace(/\n+$/, '\n')}`;
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log(usage());
    return 0;
  }
  if (!args.root || !args.out) {
    console.error(usage());
    return 1;
  }
  const rootDir = path.resolve(args.root);
  const outFile = path.resolve(args.out);
  if (path.basename(outFile).toLowerCase() === 'index.html') {
    console.error('報告輸出不可以是 index.html。');
    return 1;
  }
  fs.mkdirSync(path.dirname(outFile), { recursive: true });

  if (!fs.existsSync(rootDir) || !fs.statSync(rootDir).isDirectory()) {
    const report = renderReport({
      root: rootDir,
      browserLine: '未檢查',
      total: 1,
      passed: 0,
      failed: 1,
      failures: [{ file: rootDir, reasons: ['根目錄不存在或不是資料夾'] }],
    });
    fs.writeFileSync(outFile, report, 'utf8');
    console.log('總數 1，通過 0，失敗 1');
    console.log(outFile);
    return 1;
  }

  const files = collectIndexFiles(rootDir);
  const exe = findBrowser();
  let browserLine = '未找到 Chrome 或 Edge，已略過控制台檢查';
  let session = null;
  let server = null;
  let infra = '';
  if (exe && files.length > 0) {
    try {
      const preview = await startStaticServer(rootDir);
      server = preview.server;
      session = await launchBrowser(exe);
      liveSession = session;
      session.port = preview.port;
      browserLine = `已使用 ${browserLabel(exe)} headless（\`${exe}\`），每頁逾時約 8 秒，一次一頁`;
    } catch (error) {
      infra = `找到 ${browserLabel(exe)} 但無法啟動無頭檢查：${oneLine(error.message, 400)}`;
      browserLine = infra;
      if (session) await session.stop().catch(() => {});
      session = null;
      liveSession = null;
    }
  }

  const results = [];
  try {
    for (let index = 0; index < files.length; index += 1) {
      const file = files[index];
      console.error(`檢查 ${index + 1}/${files.length} ${file}`);
      const reasons = checkFileStatic(file, rootDir);
      if (session) {
        try {
          const consoleReasons = await session.check(session.pageUrl(rootDir, file));
          reasons.push(...consoleReasons);
        } catch (error) {
          reasons.push(`無法檢查控制台：${oneLine(error.message, 400)}`);
        }
      }
      results.push({ file, reasons });
    }
  } finally {
    if (session) await session.stop().catch(() => {});
    liveSession = null;
    if (server) await new Promise((resolve) => server.close(() => resolve()));
  }

  const failures = results
    .filter((item) => item.reasons.length > 0)
    .map((item) => ({ file: item.file, reasons: item.reasons }));
  if (files.length === 0) failures.push({ file: rootDir, reasons: ['找不到任何 index.html'] });
  if (infra) failures.push({ file: exe || '瀏覽器', reasons: [infra] });
  const failed = failures.length;
  const total = results.length + (files.length === 0 ? 1 : 0) + (infra ? 1 : 0);
  const passed = results.filter((item) => item.reasons.length === 0).length;
  const report = renderReport({ root: rootDir, browserLine, failures, total, passed, failed });
  fs.writeFileSync(outFile, report, 'utf8');
  console.log(`總數 ${total}，通過 ${passed}，失敗 ${failed}`);
  console.log(outFile);
  return failed > 0 ? 1 : 0;
}

let liveSession = null;
process.on('SIGINT', () => {
  if (liveSession) killBrowser(liveSession.child.pid, liveSession.profile);
  process.exit(130);
});

main().then(
  (code) => process.exit(code),
  (error) => {
    console.error(error?.stack || error);
    process.exit(1);
  },
);
