import type { ReactNode } from "react";
import { Photo } from "./Photo";
import type { CV, SectionId } from "@/lib/types";
import { dict, Lang } from "@/lib/i18n";
import { active, lines } from "@/lib/cvutils";
const H = ({ t }: { t: string }) => <h3 className="mb-1.5 mt-4 break-after-avoid border-l-[3px] border-indigo-600 pl-2 text-[10.5px] font-bold text-indigo-700">{t}</h3>;
const MAIN: SectionId[] = ["summary", "work", "projects", "refs"];
const SIDE: SectionId[] = ["skills", "education", "links", "org"];
export default function ATSModernPreview({ cv, lang }: { cv: CV; lang: Lang }) {
  const h = dict[lang].cvh;
  const S: Record<SectionId, () => ReactNode> = {
    summary: () => <><H t={h.profile} /><p>{cv.summary}</p></>,
    work: () => <><H t={h.work} />{cv.work.map((e) => (
      <div key={e.id} className="mb-2 break-inside-avoid">
        <div className="flex justify-between"><b className="text-slate-900">{e.role}</b><span className="text-indigo-600">{e.period}</span></div>
        <div className="text-slate-500">{e.org}</div>
        <ul className="ml-3.5 list-disc">{lines(e.points).map((p, i) => <li key={i}>{p}</li>)}</ul>
      </div>))}</>,
    projects: () => <><H t={h.projects} />{cv.projects.map((p) => <p key={p.id} className="break-inside-avoid"><b className="text-slate-900">{p.name}</b>{p.desc && ` — ${p.desc}`}</p>)}</>,
    refs: () => <><H t={h.refs} />{cv.refs.map((r) => <p key={r.id} className="break-inside-avoid"><b className="text-slate-900">{r.name}</b>{r.role && `, ${r.role}`}{r.contact && <><br />{r.contact}</>}</p>)}</>,
    skills: () => <><H t={h.skills} /><div className="flex flex-wrap gap-1">{cv.skills.map((s) => <span key={s} className="rounded bg-indigo-50 px-1.5 py-0.5 text-[8.5px] font-medium text-indigo-700">{s}</span>)}</div></>,
    education: () => <><H t={h.education} />{cv.education.map((e) => <div key={e.id} className="mb-1.5 break-inside-avoid"><b className="text-slate-900">{e.school}</b><br />{e.degree}<br /><span className="text-indigo-600">{e.period}</span></div>)}</>,
    links: () => <><H t={h.links} />{cv.links.map((l) => <p key={l.id} className="break-words">{l.label && <b className="text-slate-900">{l.label}<br /></b>}{l.url}</p>)}</>,
    org: () => <><H t={h.org} />{cv.org.map((o) => <p key={o.id} className="break-inside-avoid"><b className="text-slate-900">{o.name}</b><br />{o.role}<br /><span className="text-indigo-600">{o.period}</span></p>)}</>,
  };
  return (
    <div className="min-h-[841px] text-[9.5px] leading-[1.5] text-slate-700">
      <div className="flex items-center justify-between bg-indigo-600 px-9 py-7 text-white">
        <div>
          <h1 className="text-[26px] font-extrabold leading-none">{cv.name || dict[lang].f.name}</h1>
          {cv.title && <p className="mt-1 text-[12px] text-indigo-100">{cv.title}</p>}
          <p className="mt-2 text-[9px] text-indigo-100">{[cv.email, cv.phone, cv.location].filter(Boolean).join(" · ")}</p>
        </div>
        {cv.photo && <Photo cv={cv} base={64} imgClass="rounded-full border-2 border-white/60" />}
      </div>
      <div className="grid grid-cols-[1fr_150px] gap-6 px-9 pb-8 pt-1">
        <div>{active(cv, MAIN).map((id) => <div key={id}>{S[id]()}</div>)}</div>
        <div>{active(cv, SIDE).map((id) => <div key={id}>{S[id]()}</div>)}</div>
      </div>
    </div>
  );
}
