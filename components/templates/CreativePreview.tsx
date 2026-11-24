import type { ReactNode } from "react";
import type { CV, SectionId } from "@/lib/types";
import { dict, Lang } from "@/lib/i18n";
import { active, initials, lines } from "@/lib/cvutils";
const H = ({ t }: { t: string }) => <h3 className="mb-2 mt-4 flex break-after-avoid items-center gap-2 text-[11px] font-extrabold text-violet-700"><span className="h-2 w-5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />{t}</h3>;
const SH = ({ t }: { t: string }) => <h3 className="mb-1.5 mt-5 break-after-avoid text-[10px] font-bold text-pink-200">{t}</h3>;
const SIDE: SectionId[] = ["skills", "education", "links"];
export default function CreativePreview({ cv, lang }: { cv: CV; lang: Lang }) {
  const h = dict[lang].cvh;
  const S: Record<SectionId, () => ReactNode> = {
    skills: () => <><SH t={h.skills} /><div className="flex flex-wrap gap-1">{cv.skills.map((s) => <span key={s} className="rounded-full border border-teal-300 px-2 py-0.5 text-[8.5px] font-medium text-teal-100">{s}</span>)}</div></>,
    education: () => <><SH t={h.education} />{cv.education.map((e) => <p key={e.id} className="mb-1.5 break-inside-avoid"><b>{e.school}</b><br />{e.degree}<br />{e.period}</p>)}</>,
    links: () => <><SH t={h.links} />{cv.links.map((l) => <p key={l.id} className="mb-1 break-all">{l.label && <b>{l.label}<br /></b>}{l.url}</p>)}</>,
    summary: () => <><H t={h.about} /><p>{cv.summary}</p></>,
    work: () => <><H t={h.work} /><div className="ml-1 border-l-2 border-violet-200 pl-4">{cv.work.map((e) => (
      <div key={e.id} className="relative mb-3 break-inside-avoid">
        <span className="absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-teal-500 ring-2 ring-violet-300" />
        <b className="text-slate-900">{e.role}</b>{e.org && <span className="text-violet-600"> · {e.org}</span>}
        <div className="text-[8.5px] text-slate-400">{e.period}</div>
        <ul className="ml-3 list-disc">{lines(e.points).map((p, i) => <li key={i}>{p}</li>)}</ul>
      </div>))}</div></>,
    projects: () => <><H t={h.projects} />{cv.projects.map((p) => <div key={p.id} className="mb-1.5 break-inside-avoid rounded-lg bg-teal-50 p-2"><b className="text-teal-700">{p.name}</b>{p.desc && ` — ${p.desc}`}</div>)}</>,
    org: () => <><H t={h.org} />{cv.org.map((o) => <p key={o.id} className="break-inside-avoid"><b className="text-slate-900">{o.name}</b>{o.role && ` · ${o.role}`}{o.period && <span className="text-slate-400"> · {o.period}</span>}</p>)}</>,
    refs: () => <><H t={h.refs} />{cv.refs.map((r) => <p key={r.id} className="break-inside-avoid"><b className="text-slate-900">{r.name}</b>{r.role && ` · ${r.role}`}{r.contact && <span className="text-slate-400"> · {r.contact}</span>}</p>)}</>,
  };
  return (
    <div className="grid min-h-[841px] grid-cols-[190px_1fr] text-[9.5px] leading-[1.5] text-slate-700">
      <aside className="bg-gradient-to-b from-violet-600 via-indigo-600 to-blue-600 p-6 text-white">
        {cv.photo
          ? <img src={cv.photo} alt="" className="mx-auto h-20 w-20 rounded-full border-4 border-pink-300 object-cover" />
          : <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-pink-300 bg-white/20 text-[26px] font-extrabold">{initials(cv.name)}</div>}
        {(cv.email || cv.phone || cv.location) && <><SH t={h.contact} /><p className="break-all">{cv.email}</p><p>{cv.phone}</p><p>{cv.location}</p></>}
        {active(cv, SIDE).map((id) => <div key={id}>{S[id]()}</div>)}
      </aside>
      <main className="px-7 py-9">
        <h1 className="text-[28px] font-extrabold leading-none text-slate-900">{cv.name || dict[lang].f.name}</h1>
        {cv.title && <p className="mt-1.5 inline-block rounded-full bg-pink-100 px-3 py-0.5 text-[10px] font-bold text-pink-600">{cv.title}</p>}
        {active(cv).filter((id) => !SIDE.includes(id)).map((id) => <div key={id}>{S[id]()}</div>)}
      </main>
    </div>
  );
}
