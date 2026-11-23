import { Plus, Trash2, UploadCloud } from "lucide-react";
const base = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100";
export function Field({ label, value, area, className = "" }: { label: string; value?: string; area?: boolean; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold text-slate-600">{label}</span>
      {area ? <textarea rows={4} defaultValue={value} className={base} /> : <input defaultValue={value} className={base} />}
    </label>
  );
}
export const AddButton = ({ label }: { label: string }) => (
  <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-violet-200 py-2.5 text-sm font-semibold text-violet-600 transition hover:border-violet-400 hover:bg-violet-50"><Plus size={16} />{label}</button>
);
export const Entry = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
    <div className="mb-3 flex items-center justify-between"><b className="text-sm">{title}</b>
      <button type="button" className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-rose-500 transition hover:bg-rose-50"><Trash2 size={13} />Remove</button></div>
    <div className="grid gap-3 sm:grid-cols-2">{children}</div>
  </div>
);
export const PhotoUpload = () => (
  <div className="flex items-center gap-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/50 p-4">
    <span className="grid h-14 w-14 place-items-center rounded-full bg-white text-violet-500"><UploadCloud size={22} /></span>
    <div className="text-sm"><b>Upload photo</b><p className="text-xs text-slate-500">JPG or PNG, up to 2 MB</p></div>
  </div>
);
export const EmptyState = ({ text, action }: { text: string; action: string }) => (
  <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-pink-50 p-6 text-center">
    <p className="mb-3 text-sm text-slate-600">{text}</p><AddButton label={action} />
  </div>
);
