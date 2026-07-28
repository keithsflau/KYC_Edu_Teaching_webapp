import crypto from "crypto";

const DEFAULT_TTL_SEC = 120; // 2 minutes

function signingSecret(): string {
  return (
    process.env.MODULE_SIGNING_SECRET ||
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "dev-only-insecure-signing-secret"
  );
}

function hmac(payload: string): string {
  return crypto
    .createHmac("sha256", signingSecret())
    .update(payload)
    .digest("base64url");
}

export type SignedModuleToken = {
  path: string;
  userId: string;
  exp: number;
  sig: string;
};

/** Mint a short-lived signed token for module HTML fetch */
export function mintModuleToken(
  path: string,
  userId: string,
  ttlSec = DEFAULT_TTL_SEC
): SignedModuleToken {
  const exp = Math.floor(Date.now() / 1000) + ttlSec;
  const payload = `${path}|${userId}|${exp}`;
  return { path, userId, exp, sig: hmac(payload) };
}

export function verifyModuleToken(token: {
  path: string;
  userId: string;
  exp: number | string;
  sig: string;
}): { ok: true } | { ok: false; reason: string } {
  const exp = Number(token.exp);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) {
    return { ok: false, reason: "token_expired" };
  }
  if (!token.path || !token.userId || !token.sig) {
    return { ok: false, reason: "token_malformed" };
  }
  const payload = `${token.path}|${token.userId}|${exp}`;
  const expected = hmac(payload);
  const a = Buffer.from(expected);
  const b = Buffer.from(String(token.sig));
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "token_invalid" };
  }
  return { ok: true };
}

export function buildSignedQuery(token: SignedModuleToken): string {
  const q = new URLSearchParams({
    path: token.path,
    uid: token.userId,
    exp: String(token.exp),
    sig: token.sig,
  });
  return q.toString();
}
