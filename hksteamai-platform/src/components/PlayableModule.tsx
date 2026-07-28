"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { NcsLangSwitcher } from "@/components/NcsLangSwitcher";
import {
  moduleSrcWithLang,
  postNcsLangToIframe,
  readStoredNcsLang,
  type NcsLangCode,
} from "@/lib/ncs-lang";

type Props = {
  src: string;
  title: string;
  backLabel: string;
  freeBadge?: string;
  isFreeDemo?: boolean;
};

export function PlayableModule({
  src,
  title,
  backLabel,
  freeBadge,
  isFreeDemo,
}: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [lang, setLang] = useState<NcsLangCode>(() => readStoredNcsLang());
  const [iframeSrc] = useState(() => moduleSrcWithLang(src, readStoredNcsLang()));

  const syncIframeLang = useCallback(
    (next: NcsLangCode) => {
      postNcsLangToIframe(iframeRef.current, next);
    },
    []
  );

  const handleLangChange = useCallback(
    (next: NcsLangCode) => {
      setLang(next);
      syncIframeLang(next);
    },
    [syncIframeLang]
  );

  return (
    <>
      <div className="player-toolbar">
        <Link href="/library" className="btn btn-ghost btn-sm">
          {backLabel}
        </Link>
        <h1>{title}</h1>
        {isFreeDemo && freeBadge ? (
          <span className="badge free">{freeBadge}</span>
        ) : null}
        <NcsLangSwitcher onChange={handleLangChange} />
      </div>

      <div className="player-frame-wrap">
        <iframe
          ref={iframeRef}
          title={title}
          src={iframeSrc}
          allow="camera *; microphone *; fullscreen *"
          onLoad={() => syncIframeLang(lang)}
        />
      </div>
    </>
  );
}
