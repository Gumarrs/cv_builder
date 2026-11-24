"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { dict, Dict, Lang, LANG_KEY, readLang } from "./i18n";
const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({ lang: "en", setLang: () => {}, t: dict.en });
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setL] = useState<Lang>("en");
  useEffect(() => { const l = readLang(); setL(l); document.documentElement.lang = l; }, []);
  const setLang = (l: Lang) => { setL(l); document.documentElement.lang = l; try { localStorage.setItem(LANG_KEY, l); } catch {} };
  return <Ctx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex rounded-full bg-violet-50 p-0.5 text-xs font-bold" role="group" aria-label="Language">
      {(["en", "id"] as const).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} className={`rounded-full px-2.5 py-1 uppercase transition ${lang === l ? "bg-white text-violet-700 shadow" : "text-slate-500 hover:text-violet-600"}`}>{l}</button>
      ))}
    </div>
  );
}
