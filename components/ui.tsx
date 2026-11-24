"use client";
import { useState } from "react";
import { Plus, Trash2, UploadCloud } from "lucide-react";
import type { Dict } from "@/lib/i18n";
import type { PhotoBox } from "@/lib/types";
const base = "w-full rounded-xl border bg-white px-3 py-2 text-sm outline-none transition focus:ring-4";
export function Field({ label, value, onChange, area, error, className = "", type = "text" }: { label: string; value: string; onChange: (v: string) => void; area?: boolean; error?: string; className?: string; type?: string }) {
  const cls = `${base} ${error ? "border-rose-400 focus:border-rose-400 focus:ring-rose-100" : "border-slate-200 focus:border-violet-400 focus:ring-violet-100"}`;
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      {area ? <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} className={cls} />
        : <input type={type} value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={!!error} className={cls} />}
      {error && <span className="mt-1 block text-xs font-medium text-rose-500">{error}</span>}
    </label>
  );
}
export const AddButton = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button type="button" onClick={onClick} className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-violet-200 py-2.5 text-sm font-semibold text-violet-600 transition hover:border-violet-400 hover:bg-violet-50"><Plus size={16} />{label}</button>
);
export const Entry = ({ title, removeLabel, onRemove, children }: { title: string; removeLabel: string; onRemove: () => void; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
    <div className="mb-3 flex items-center justify-between"><b className="text-sm">{title}</b>
      <button type="button" onClick={onRemove} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-rose-500 transition hover:bg-rose-50"><Trash2 size={13} />{removeLabel}</button></div>
    <div className="grid gap-3 sm:grid-cols-2">{children}</div>
  </div>
);
export const EmptyState = ({ text, action, onClick }: { text: string; action: string; onClick: () => void }) => (
  <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-pink-50 p-6 text-center">
    <p className="mb-3 text-sm text-slate-600">{text}</p><AddButton label={action} onClick={onClick} />
  </div>
);
export function PhotoUpload({ photo, onChange, box, onBox, t }: { photo: string; onChange: (v: string) => void; box: PhotoBox; onBox: (b: PhotoBox) => void; t: Dict }) {
  const [err, setErr] = useState("");
  const pick = (f?: File) => {
    if (!f) return;
    if (!f.type.startsWith("image/") || f.size > 10 * 1024 * 1024) { setErr(t.b.photoErr); return; }
    setErr("");
    const url = URL.createObjectURL(f); const img = new Image();
    img.onload = () => {
      const s = 360, side = Math.min(img.naturalWidth, img.naturalHeight), c = document.createElement("canvas"); c.width = c.height = s;
      c.getContext("2d")?.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, s, s);
      onChange(c.toDataURL("image/jpeg", 0.85)); URL.revokeObjectURL(url);
    };
    img.onerror = () => { setErr(t.b.photoErr); URL.revokeObjectURL(url); };
    img.src = url;
  };
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-4">
      {photo ? <img src={photo} alt="" className="h-14 w-14 rounded-full object-cover" /> : <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-violet-500"><UploadCloud size={22} /></span>}
      <div className="text-sm">
        <div className="flex flex-wrap gap-x-3">
          <label className="cursor-pointer font-bold text-violet-700 hover:underline focus-within:underline">{photo ? t.b.change : t.b.upload}
            <input type="file" accept="image/*" className="sr-only" onChange={(e) => { pick(e.target.files?.[0]); e.target.value = ""; }} /></label>
          {photo && <button type="button" onClick={() => onChange("")} className="font-medium text-rose-500 hover:underline">{t.b.removePhoto}</button>}
        </div>
        <p className={`text-xs ${err ? "font-medium text-rose-500" : "text-slate-500"}`}>{err || t.b.uploadHint}</p>
        {photo && <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600">
          <label className="flex items-center gap-2 font-semibold">{t.b.photoSize}<input type="range" min={0.4} max={3} step={0.05} value={box.scale} onChange={(e) => onBox({ ...box, scale: +e.target.value })} className="w-28 accent-violet-600" /></label>
          <button type="button" onClick={() => onBox({ dx: 0, dy: 0, scale: 1 })} className="font-semibold text-violet-700 hover:underline">{t.b.photoReset}</button></div>}
        {photo && <p className="mt-1 text-xs text-slate-500">{t.b.photoDrag}</p>}
      </div>
    </div>
  );
}
