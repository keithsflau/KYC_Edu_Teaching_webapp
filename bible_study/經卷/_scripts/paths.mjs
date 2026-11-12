/** Canonical output roots after OT/NT folder split */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const VOLUME_ROOT = path.join(__dirname, '..');
export const OT_ROOT = path.join(VOLUME_ROOT, '舊約');
export const NT_ROOT = path.join(VOLUME_ROOT, '新約');
export const TOPIC_ROOT = path.join(VOLUME_ROOT, '專題');

/** Fix legacy cross-links in topic/book data */
export function fixVolumeHref(href) {
  if (!href || typeof href !== 'string') return href;
  return href
    .replace('../../摩西五經/', '../../舊約/摩西五經/')
    .replace('../../歷史書/', '../../舊約/歷史書/')
    .replace('../../詩歌智慧書/', '../../舊約/詩歌智慧書/')
    .replace('../../先知書/', '../../舊約/先知書/')
    .replace('../../四福音/', '../../新約/四福音/')
    .replace('../../保羅書信/', '../../新約/保羅書信/')
    .replace('../../啟示錄/', '../../新約/啟示錄/')
    .replace('../../使徒行傳/', '../../新約/使徒行傳/')
    .replace('../../一般書信/', '../../新約/一般書信/');
}
