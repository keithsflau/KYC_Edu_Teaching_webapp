"use client";

import { useEffect, useId, useRef, useState } from "react";
import {
  NCS_LANGS,
  type NcsLangCode,
  readStoredNcsLang,
  writeStoredNcsLang,
} from "@/lib/ncs-lang";

type Props = {
  onChange: (lang: NcsLangCode) => void;
  className?: string;
};

export function NcsLangSwitcher({ onChange, className }: Props) {
  const labelId = useId();
  const [lang, setLang] = useState<NcsLangCode>("zh-Hant");
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    const stored = readStoredNcsLang();
    setLang(stored);
    onChangeRef.current(stored);
  }, []);

  return (
    <div className={["player-ncs-lang", className].filter(Boolean).join(" ")}>
      <label className="player-ncs-lang__label" id={labelId} htmlFor={labelId + "-select"}>
        Language
      </label>
      <select
        id={labelId + "-select"}
        className="player-ncs-lang__select"
        aria-labelledby={labelId}
        value={lang}
        onChange={(event) => {
          const next = event.target.value as NcsLangCode;
          setLang(next);
          writeStoredNcsLang(next);
          onChange(next);
        }}
      >
        {NCS_LANGS.map((option) => (
          <option key={option.code} value={option.code} lang={option.code} dir={option.dir}>
            {option.native}
          </option>
        ))}
      </select>
    </div>
  );
}
