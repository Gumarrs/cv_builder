"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { User, FileText, Link2, GraduationCap, Briefcase, Users, Wrench, FolderGit2, BadgeCheck, ChevronDown, ChevronUp, Download, Minus, Plus, ArrowLeft, Eye, EyeOff, RotateCcw, Check, X } from "lucide-react";
import { FlowPaper, previewById } from "@/components/templates";
import { Field, AddButton, Entry, PhotoUpload, EmptyState } from "@/components/ui";
import { LangSwitch, useLang } from "@/lib/lang";
import { useCVStore } from "@/lib/store";
import { templateIds, uid } from "@/lib/data";
import { validate } from "@/lib/cvutils";
import type { CV, SectionId } from "@/lib/types";
import type { Dict } from "@/lib/i18n";

type SecKey = "personal" | SectionId;
const icons: Record<SecKey, typeof User> = { personal: User, summary: FileText, links: Link2, education: GraduationCap, work: Briefcase, org: Users, skills: Wrench, projects: FolderGit2, refs: BadgeCheck };
const iconBtn = "grid h-8 w-8 place-items-center rounded-lg text-slate-500 transition hover:bg-violet-50 hover:text-violet-700 disabled:opacity-30 disabled:hover:bg-transparent";

function List<T extends { id: string }>({ items, onChange, make, title, t, children }: { items: T[]; onChange: (v: T[]) => void; make: () => T; title: string; t: Dict; children: (it: T, patch: (p: Partial<T>) => void) => ReactNode }) {
  const add = () => onChange([...items, make()]);
  if (!items.length) return <EmptyState text={t.b.empty} action={t.b.add} onClick={add} />;
  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <Entry key={it.id} title={`${title} ${i + 1}`} removeLabel={t.b.remove} onRemove={() => onChange(items.filter((x) => x.id !== it.id))}>
          {children(it, (p) => onChange(items.map((x) => (x.id === it.id ? { ...x, ...p } : x))))}
        </Entry>
      ))}
      <AddButton label={t.b.add} onClick={add} />
    </div>
  );
}

function Skills({ cv, set, t }: { cv: CV; set: <K extends keyof CV>(k: K, v: CV[K]) => void; t: Dict }) {
  const [v, setV] = useState("");
  const add = () => {
    const incoming = v.split(",").map((s) => s.trim()).filter((s) => s && !cv.skills.includes(s));
    if (incoming.length) set("skills", [...cv.skills, ...incoming]);
    setV("");
  };
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {cv.skills.map((s) => (
          <span key={s} className="flex items-center gap-1 rounded-full bg-violet-100 py-1 pl-3 pr-1.5 text-xs font-semibold text-violet-700">{s}
            <button type="button" aria-label={`${t.b.remove} ${s}`} onClick={() => set("skills", cv.skills.filter((x) => x !== s))} className="grid h-4 w-4 place-items-center rounded-full hover:bg-violet-200"><X size={11} /></button></span>
        ))}
      </div>
      <div className="flex items-end gap-2">
        <label className="block flex-1"><span className="mb-1 block text-xs font-semibold text-slate-600">{t.f.skill}</span>
          <input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100" /></label>
        <button type="button" onClick={add} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700">{t.b.addSkill}</button>
      </div>
    </div>
  );
}

export default function Builder() {
  const { t, lang } = useLang();
  const { cv, setCv, template, setTemplate, ready, reset } = useCVStore();
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [open, setOpen] = useState<string>("personal");
  const [zoom, setZoom] = useState(0.85);
  const [attempted, setAttempted] = useState(false);
  const [notice, setNotice] = useState("");
  const [confirm, setConfirm] = useState(false);
  useEffect(() => { const w = window.innerWidth; setZoom(w < 640 ? 0.55 : w < 1100 ? 0.65 : w < 1400 ? 0.8 : 0.9); }, []);
  useEffect(() => setNotice(""), [cv]);

  const set = <K extends keyof CV>(k: K, v: CV[K]) => setCv((c) => ({ ...c, [k]: v }));
  const errs = validate(cv);
  const err = (k: string) => (errs[k] && (attempted || errs[k] !== "required") ? t.err[errs[k]] : undefined);
  const move = (id: SectionId, d: number) => setCv((c) => { const a = [...c.sections]; const i = a.findIndex((s) => s.id === id); const j = i + d; if (j < 0 || j >= a.length) return c; [a[i], a[j]] = [a[j], a[i]]; return { ...c, sections: a }; });
  const toggle = (id: SectionId) => setCv((c) => ({ ...c, sections: c.sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)) }));
  const goto = (id: string) => { setOpen(id); setTimeout(() => document.getElementById("sec-" + id)?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 0); };

  const download = () => {
    setAttempted(true);
    const keys = Object.keys(errs);
    if (keys.length) { goto(keys[0].startsWith("link:") ? "links" : "personal"); setNotice(t.b.fixErrors); return; }
    const old = document.title; document.title = `${cv.name.trim()} - CV`;
    const restore = () => { document.title = old; window.removeEventListener("afterprint", restore); };
    window.addEventListener("afterprint", restore);
    window.print();
  };

  const order: { id: SecKey; visible: boolean }[] = [{ id: "personal", visible: true }, ...cv.sections];
  const body = (id: SecKey): ReactNode => {
    switch (id) {
      case "personal": return (
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2"><PhotoUpload photo={cv.photo} onChange={(v) => set("photo", v)} t={t} /></div>
          <Field label={t.f.name} value={cv.name} onChange={(v) => set("name", v)} error={err("name")} />
          <Field label={t.f.title} value={cv.title} onChange={(v) => set("title", v)} />
          <Field label={t.f.email} type="email" value={cv.email} onChange={(v) => set("email", v)} error={err("email")} />
          <Field label={t.f.phone} type="tel" value={cv.phone} onChange={(v) => set("phone", v)} error={err("phone")} />
          <Field label={t.f.location} value={cv.location} onChange={(v) => set("location", v)} className="sm:col-span-2" />
        </div>);
      case "summary": return <Field label={t.f.summary} area value={cv.summary} onChange={(v) => set("summary", v)} />;
      case "links": return <List items={cv.links} onChange={(v) => set("links", v)} make={() => ({ id: uid(), label: "", url: "" })} title={t.entry.links} t={t}>{(it, p) => <><Field label={t.f.label} value={it.label} onChange={(label) => p({ label })} /><Field label={t.f.url} value={it.url} onChange={(url) => p({ url })} error={err("link:" + it.id)} /></>}</List>;
      case "education": return <List items={cv.education} onChange={(v) => set("education", v)} make={() => ({ id: uid(), school: "", degree: "", period: "" })} title={t.entry.education} t={t}>{(it, p) => <><Field label={t.f.school} value={it.school} onChange={(school) => p({ school })} /><Field label={t.f.degree} value={it.degree} onChange={(degree) => p({ degree })} /><Field label={t.f.period} value={it.period} onChange={(period) => p({ period })} className="sm:col-span-2" /></>}</List>;
      case "work": return <List items={cv.work} onChange={(v) => set("work", v)} make={() => ({ id: uid(), role: "", org: "", period: "", points: "" })} title={t.entry.work} t={t}>{(it, p) => <><Field label={t.f.role} value={it.role} onChange={(role) => p({ role })} /><Field label={t.f.company} value={it.org} onChange={(org) => p({ org })} /><Field label={t.f.period} value={it.period} onChange={(period) => p({ period })} className="sm:col-span-2" /><Field label={t.f.points} area value={it.points} onChange={(points) => p({ points })} className="sm:col-span-2" /></>}</List>;
      case "org": return <List items={cv.org} onChange={(v) => set("org", v)} make={() => ({ id: uid(), name: "", role: "", period: "" })} title={t.entry.org} t={t}>{(it, p) => <><Field label={t.f.orgName} value={it.name} onChange={(name) => p({ name })} /><Field label={t.f.role} value={it.role} onChange={(role) => p({ role })} /><Field label={t.f.period} value={it.period} onChange={(period) => p({ period })} className="sm:col-span-2" /></>}</List>;
      case "skills": return <Skills cv={cv} set={set} t={t} />;
      case "projects": return <List items={cv.projects} onChange={(v) => set("projects", v)} make={() => ({ id: uid(), name: "", desc: "" })} title={t.entry.projects} t={t}>{(it, p) => <><Field label={t.f.projectName} value={it.name} onChange={(name) => p({ name })} className="sm:col-span-2" /><Field label={t.f.desc} area value={it.desc} onChange={(desc) => p({ desc })} className="sm:col-span-2" /></>}</List>;
      case "refs": return <List items={cv.refs} onChange={(v) => set("refs", v)} make={() => ({ id: uid(), name: "", role: "", contact: "" })} title={t.entry.refs} t={t}>{(it, p) => <><Field label={t.f.refName} value={it.name} onChange={(name) => p({ name })} /><Field label={t.f.refRole} value={it.role} onChange={(role) => p({ role })} /><Field label={t.f.contact} value={it.contact} onChange={(contact) => p({ contact })} className="sm:col-span-2" /></>}</List>;
    }
  };

  if (!ready) return <div className="grid h-screen place-items-center text-sm text-slate-500">{t.b.loading}</div>;
  const Tpl = previewById[template];

  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-violet-100 px-4">
        <Link href="/templates" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-600"><ArrowLeft size={16} /><span className="hidden sm:inline">{t.b.templates}</span></Link>
        <div className="flex rounded-full bg-violet-50 p-1 text-sm font-semibold md:hidden">
          {(["edit", "preview"] as const).map((k) => <button key={k} onClick={() => setTab(k)} className={`rounded-full px-4 py-1 transition ${tab === k ? "bg-white text-violet-700 shadow" : "text-slate-500"}`}>{t.b[k]}</button>)}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1 text-xs font-medium text-teal-600 xl:flex"><Check size={14} />{t.b.saved}</span>
          <LangSwitch />
          <button onClick={() => setConfirm(true)} aria-label={t.b.reset} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"><RotateCcw size={15} /><span className="hidden md:inline">{t.b.reset}</span></button>
          <button onClick={download} className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-sm font-semibold text-white sm:flex"><Download size={15} />{t.b.download}</button>
        </div>
      </header>
      {notice && <div role="alert" className="shrink-0 bg-rose-50 px-4 py-2 text-center text-sm font-medium text-rose-600">{notice}</div>}

      <div className="grid min-h-0 flex-1 md:grid-cols-[minmax(330px,420px)_1fr]">
        <aside className={`min-h-0 flex-col border-r border-violet-100 ${tab === "edit" ? "flex" : "hidden"} md:flex`}>
          <nav className="flex shrink-0 gap-1.5 overflow-x-auto border-b border-violet-100 px-3 py-2.5" aria-label="Sections">
            {order.map(({ id }) => { const I = icons[id]; return (
              <button key={id} onClick={() => goto(id)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${open === id ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-violet-100"}`}><I size={13} />{t.sec[id].l}</button>); })}
          </nav>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {order.map(({ id, visible }, idx) => { const I = icons[id]; const isOpen = open === id; const sid = id as SectionId; return (
              <section key={id} id={"sec-" + id} className={`rounded-2xl border bg-white transition ${isOpen ? "border-violet-300 shadow-lg shadow-violet-100" : "border-slate-200"} ${visible ? "" : "opacity-70"}`}>
                <div className="flex items-center gap-1 pr-2">
                  <button onClick={() => setOpen(isOpen ? "" : id)} aria-expanded={isOpen} className="flex flex-1 items-center gap-3 p-4 text-left">
                    <span className={`grid h-9 w-9 place-items-center rounded-xl ${isOpen ? "bg-gradient-to-br from-violet-600 to-pink-500 text-white" : "bg-violet-50 text-violet-600"}`}><I size={17} /></span>
                    <b className="text-sm">{t.sec[id].f}</b>{!visible && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">{t.b.hidden}</span>}
                    <ChevronDown size={18} className={`ml-auto text-slate-400 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {id !== "personal" && <>
                    <button className={iconBtn} aria-label={visible ? t.b.hide : t.b.show} title={visible ? t.b.hide : t.b.show} onClick={() => toggle(sid)}>{visible ? <Eye size={16} /> : <EyeOff size={16} />}</button>
                    <button className={iconBtn} aria-label={t.b.up} title={t.b.up} disabled={idx === 1} onClick={() => move(sid, -1)}><ChevronUp size={16} /></button>
                    <button className={iconBtn} aria-label={t.b.down} title={t.b.down} disabled={idx === order.length - 1} onClick={() => move(sid, 1)}><ChevronDown size={16} /></button>
                  </>}
                </div>
                {isOpen && <div className="border-t border-slate-100 p-4">{body(id)}</div>}
              </section>); })}
          </div>
        </aside>

        <main className={`min-h-0 flex-col bg-slate-100 ${tab === "preview" ? "flex" : "hidden"} md:flex`}>
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
            <div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold">
              {templateIds.map((id) => <button key={id} onClick={() => setTemplate(id)} aria-pressed={template === id} className={`rounded-full px-3 py-1.5 transition ${template === id ? "bg-violet-600 text-white" : "text-slate-500 hover:text-violet-600"}`}>{t.tpls[id].name}</button>)}
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <button aria-label={t.b.zoomOut} onClick={() => setZoom((z) => Math.max(0.4, +(z - 0.1).toFixed(2)))} className="rounded-lg p-1.5 hover:bg-slate-100"><Minus size={16} /></button>
              <span className="w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button aria-label={t.b.zoomIn} onClick={() => setZoom((z) => Math.min(1.3, +(z + 0.1).toFixed(2)))} className="rounded-lg p-1.5 hover:bg-slate-100"><Plus size={16} /></button>
              <button onClick={download} className="ml-2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-3 py-1.5 text-white sm:hidden"><Download size={14} />PDF</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6"><div className="mx-auto w-fit"><FlowPaper id={template} scale={zoom} cv={cv} lang={lang} /></div></div>
        </main>
      </div>

      {tab === "edit" && (
        <button onClick={() => setTab("preview")} aria-label={t.b.preview} className="fixed bottom-4 right-4 z-40 overflow-hidden rounded-xl border-2 border-violet-400 bg-white shadow-xl shadow-violet-300/50 transition hover:scale-105 md:hidden">
          <FlowPaper id={template} scale={0.2} cv={cv} lang={lang} />
          <span className="absolute inset-x-0 bottom-0 bg-violet-600 py-0.5 text-center text-[10px] font-bold text-white">{t.b.preview}</span>
        </button>
      )}
      {confirm && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={() => setConfirm(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="rt" onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
            <h2 id="rt" className="text-lg font-extrabold">{t.b.resetTitle}</h2><p className="mt-2 text-sm text-slate-600">{t.b.resetMsg}</p>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setConfirm(false)} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">{t.b.cancel}</button>
              <button onClick={() => { reset(); setAttempted(false); setConfirm(false); setOpen("personal"); }} className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-600">{t.b.confirm}</button>
            </div>
          </div>
        </div>
      )}
      {createPortal(<div id="print-root"><div style={{ width: 595, zoom: 794 / 595 }}><Tpl cv={cv} lang={lang} /></div></div>, document.body)}
    </div>
  );
}
