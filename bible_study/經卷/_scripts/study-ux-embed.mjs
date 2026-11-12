/** Shared study-page UX assets (scroll reveal, accordions, checklist bar). */
import path from 'path';

/** Relative path from a book HTML file up to repo-root `3D地圖/bible-maps/shared`. */
export function sharedUxBaseFrom(filePath, volumeRoot) {
  const dir = path.dirname(filePath);
  const rel = path.relative(dir, path.join(volumeRoot, '..', '3D地圖', 'bible-maps', 'shared'));
  return rel.split(path.sep).join('/');
}

export function uxHeadFor(base) {
  return `
  <link rel="stylesheet" href="${base}/book-study-ux.css">`;
}

export function uxScriptsFor(base) {
  return `
  <script src="${base}/book-study-ux.js"></script>`;
}

/** @deprecated Prefer uxHeadFor / sharedUxBaseFrom — depth-3 book pages need 4× ../ */
export const UX_BASE = '../../../../3D地圖/bible-maps/shared';
export const uxHead = uxHeadFor(UX_BASE);
export const uxScripts = uxScriptsFor(UX_BASE);
