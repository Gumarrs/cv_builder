"use client";
import { useEffect, useRef, useState } from "react";
import { Paper } from "./Paper";
import ATSClassicPreview from "./ATSClassicPreview";
import ATSModernPreview from "./ATSModernPreview";
import CreativePreview from "./CreativePreview";
import { getSample } from "@/lib/data";
import { Lang } from "@/lib/i18n";
import { useLang } from "@/lib/lang";
import type { CV, TemplateId } from "@/lib/types";
export type { TemplateId };
export const previewById = { classic: ATSClassicPreview, modern: ATSModernPreview, creative: CreativePreview } as const;
type P = { id: TemplateId; scale: number; cv?: CV; lang?: Lang };

/** Fixed single A4 page, used for static showcases (landing, templates). */
export function TemplatePaper({ id, scale, cv, lang }: P) {
  const ctx = useLang(); const l = lang ?? ctx.lang; const Tpl = previewById[id];
  return <Paper scale={scale}><Tpl cv={cv ?? getSample(l)} lang={l} /></Paper>;
}

/** Flowing multi-page preview for the builder, with dashed page-break guides. */
export function FlowPaper({ id, scale, cv, lang }: Required<P>) {
  const { t } = useLang(); const Tpl = previewById[id];
  const ref = useRef<HTMLDivElement>(null); const [h, setH] = useState(842);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight)); ro.observe(el); setH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);
  const pages = Math.max(1, Math.ceil(h / 842));
  return (
    <div className="relative shrink-0 overflow-hidden bg-white shadow-[0_18px_50px_-12px_rgba(76,29,149,.35)]" style={{ width: 595 * scale, height: pages * 842 * scale }}>
      <div ref={ref} style={{ width: 595, transform: `scale(${scale})`, transformOrigin: "top left" }}><Tpl cv={cv} lang={lang} /></div>
      {Array.from({ length: pages - 1 }, (_, i) => (
        <div key={i} className="pointer-events-none absolute inset-x-0 border-t border-dashed border-violet-400/70" style={{ top: (i + 1) * 842 * scale }}>
          <span className="absolute right-2 top-1 rounded bg-violet-600 px-1.5 py-0.5 text-[10px] font-semibold text-white">{t.b.page} {i + 2}</span>
        </div>
      ))}
    </div>
  );
}
