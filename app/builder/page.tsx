"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User, FileText, Link2, GraduationCap, Briefcase, Users, Wrench, FolderGit2, BadgeCheck, ChevronDown, Download, Minus, Plus, ArrowLeft } from "lucide-react";
import { cv, templates } from "@/lib/data";
import { TemplatePaper, TemplateId } from "@/components/templates";
import { Field, AddButton, Entry, PhotoUpload, EmptyState } from "@/components/ui";

const sections = [
  { id: "personal", label: "Personal", full: "Personal Information", icon: User },
  { id: "summary", label: "Summary", full: "Professional Summary", icon: FileText },
  { id: "links", label: "Links", full: "Social Links", icon: Link2 },
  { id: "education", label: "Education", full: "Education", icon: GraduationCap },
  { id: "work", label: "Work", full: "Work Experience", icon: Briefcase },
  { id: "org", label: "Organization", full: "Organization", icon: Users },
  { id: "skills", label: "Skills", full: "Skills", icon: Wrench },
  { id: "projects", label: "Projects", full: "Projects", icon: FolderGit2 },
  { id: "refs", label: "References", full: "References", icon: BadgeCheck },
];

function Body({ id }: { id: string }) {
  switch (id) {
    case "personal": return <div className="grid gap-3 sm:grid-cols-2"><div className="sm:col-span-2"><PhotoUpload /></div><Field label="Full name" value={cv.name} /><Field label="Job title" value={cv.title} /><Field label="Email" value={cv.email} /><Field label="Phone" value={cv.phone} /><Field label="Location" value={cv.location} className="sm:col-span-2" /></div>;
    case "summary": return <Field label="Summary" value={cv.summary} area />;
    case "links": return <div className="space-y-3">{cv.links.map((l, i) => <Entry key={l} title={`Link ${i + 1}`}><Field label="Label" value={i ? "Portfolio" : "LinkedIn"} /><Field label="URL" value={l} /></Entry>)}<AddButton label="Add Entry" /></div>;
    case "education": return <div className="space-y-3">{cv.education.map((e, i) => <Entry key={e.school} title={`Education ${i + 1}`}><Field label="School" value={e.school} /><Field label="Degree" value={e.degree} /><Field label="Period" value={e.period} className="sm:col-span-2" /></Entry>)}<AddButton label="Add Entry" /></div>;
    case "work": return <div className="space-y-3">{cv.experience.map((e, i) => <Entry key={e.role} title={`Experience ${i + 1}`}><Field label="Role" value={e.role} /><Field label="Company" value={e.org} /><Field label="Period" value={e.period} className="sm:col-span-2" /><Field label="Highlights" value={e.points.join("\n")} area className="sm:col-span-2" /></Entry>)}<AddButton label="Add Entry" /></div>;
    case "org": return <div className="space-y-3">{cv.orgs.map((o) => <Entry key={o.name} title="Organization 1"><Field label="Name" value={o.name} /><Field label="Role" value={o.role} /><Field label="Period" value={o.period} className="sm:col-span-2" /></Entry>)}<AddButton label="Add Entry" /></div>;
    case "skills": return <div className="space-y-3"><div className="flex flex-wrap gap-2">{cv.skills.map((s) => <span key={s} className="rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700">{s}</span>)}</div><Field label="Add a skill" /></div>;
    case "projects": return <div className="space-y-3">{cv.projects.map((p) => <Entry key={p.name} title="Project 1"><Field label="Name" value={p.name} /><Field label="Description" value={p.desc} area className="sm:col-span-2" /></Entry>)}<AddButton label="Add Entry" /></div>;
    default: return <EmptyState text="No references yet. Add someone who can vouch for your work." action="Add Reference" />;
  }
}

export default function Builder() {
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [open, setOpen] = useState("personal");
  const [tpl, setTpl] = useState<TemplateId>("modern");
  const [zoom, setZoom] = useState(0.85);
  useEffect(() => { if (window.innerWidth < 640) setZoom(0.55); }, []);

  return (
    <div className="flex h-screen flex-col bg-white">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-violet-100 px-4">
        <Link href="/templates" className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-600"><ArrowLeft size={16} />Templates</Link>
        <div className="flex rounded-full bg-violet-50 p-1 text-sm font-semibold lg:hidden">
          {(["edit", "preview"] as const).map((t) => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-4 py-1 capitalize transition ${tab === t ? "bg-white text-violet-700 shadow" : "text-slate-500"}`}>{t}</button>)}
        </div>
        <button className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-4 py-2 text-sm font-semibold text-white sm:flex"><Download size={15} />Download PDF</button>
      </header>

      <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(380px,460px)_1fr]">
        <aside className={`min-h-0 flex-col border-r border-violet-100 ${tab === "edit" ? "flex" : "hidden"} lg:flex`}>
          <nav className="flex shrink-0 gap-1.5 overflow-x-auto border-b border-violet-100 px-3 py-2.5" aria-label="Sections">
            {sections.map(({ id, label, icon: I }) => (
              <button key={id} onClick={() => setOpen(id)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${open === id ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-violet-100"}`}><I size={13} />{label}</button>
            ))}
          </nav>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {sections.map(({ id, full, icon: I }) => (
              <section key={id} className={`rounded-2xl border bg-white transition ${open === id ? "border-violet-300 shadow-lg shadow-violet-100" : "border-slate-200"}`}>
                <button onClick={() => setOpen(open === id ? "" : id)} aria-expanded={open === id} className="flex w-full items-center gap-3 p-4 text-left">
                  <span className={`grid h-9 w-9 place-items-center rounded-xl ${open === id ? "bg-gradient-to-br from-violet-600 to-pink-500 text-white" : "bg-violet-50 text-violet-600"}`}><I size={17} /></span>
                  <b className="flex-1 text-sm">{full}</b><ChevronDown size={18} className={`text-slate-400 transition ${open === id ? "rotate-180" : ""}`} />
                </button>
                {open === id && <div className="border-t border-slate-100 p-4"><Body id={id} /></div>}
              </section>
            ))}
          </div>
        </aside>

        <main className={`min-h-0 flex-col bg-slate-100 ${tab === "preview" ? "flex" : "hidden"} lg:flex`}>
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-2.5">
            <div className="flex rounded-full bg-slate-100 p-1 text-xs font-semibold">
              {templates.map((t) => <button key={t.id} onClick={() => setTpl(t.id)} className={`rounded-full px-3 py-1.5 transition ${tpl === t.id ? "bg-violet-600 text-white" : "text-slate-500 hover:text-violet-600"}`}>{t.name}</button>)}
            </div>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <button aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.4, +(z - 0.1).toFixed(2)))} className="rounded-lg p-1.5 hover:bg-slate-100"><Minus size={16} /></button>
              <span className="w-12 text-center">{Math.round(zoom * 100)}%</span>
              <button aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.3, +(z + 0.1).toFixed(2)))} className="rounded-lg p-1.5 hover:bg-slate-100"><Plus size={16} /></button>
              <button className="ml-2 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-3 py-1.5 text-white sm:hidden"><Download size={14} />PDF</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6"><div className="mx-auto w-fit"><TemplatePaper id={tpl} scale={zoom} /></div></div>
        </main>
      </div>
    </div>
  );
}
