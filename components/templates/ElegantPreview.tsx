import type { ReactNode } from "react";
import type { CV, SectionId } from "@/lib/types";
import { dict, Lang } from "@/lib/i18n";
import { active, initials, lines, rootStyle, linkList } from "@/lib/cvutils";
import { Photo } from "./Photo";
const H = ({ t }: { t: string }) => <h3 className="mb-2 mt-4 break-after-avoid border-b border-teal-200 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-700">{t}</h3>;
const SH = ({ t }: { t: string }) => <h3 className="mb-1.5 mt-5 break-after-avoid text-[9.5px] font-bold uppercase tracking-wider text-teal-700">{t}</h3>;
const SIDE: SectionId[] = ["skills", "education"];
export default function ElegantPreview({ cv, lang }: { cv: CV; lang: Lang }) {
  const h = dict[lang].cvh;
  const S: Record<SectionId, () => ReactNode> = {
    skills: () => <><SH t={h.skills} /><ul>{cv.skills.map((s) => <li key={s} className="flex items-center gap-1.5"><span className="h-1 w-1 rounded-full bg-teal-500" />{s}</li>)}</ul></>,
    education: () => <><SH t={h.education} />{cv.education.map((e) => <p key={e.id} className="mb-1.5 break-inside-avoid"><b className="text-slate-900">{e.school}</b><br />{e.degree}<br /><span className="text-slate-500">{e.period}</span></p>)}</>,
    summary: () => <><H t={h.summary} /><p className="text-justify [hyphens:auto]">{cv.summary}</p></>,
    work: () => <><H t={h.work} />{cv.work.map((e) => (
      <div key={e.id} className="mb-2.5 break-inside-avoid">
        <div className="flex justify-between"><b className="text-slate-900">{e.role}</b><span className="text-slate-500">{e.period}</span></div>
        <div className="text-teal-600">{e.org}</div>
        <ul className="ml-3.5 list-disc text-justify [hyphens:auto]">{lines(e.points).map((p, i) => <li key={i}>{p}</li>)}</ul>
      </div>))}</>,
    projects: () => <><H t={h.projects} />{cv.projects.map((p) => <p key={p.id} className="text-justify [hyphens:auto] mb-1 break-inside-avoid"><b className="text-slate-900">{p.name}</b>{p.desc && ` — ${p.desc}`}</p>)}</>,
    org: () => <><H t={h.org} />{cv.org.map((o) => <p key={o.id} className="break-inside-avoid"><b className="text-slate-900">{o.name}</b>{o.role && ` · ${o.role}`}{o.period && <span className="text-slate-500"> · {o.period}</span>}</p>)}</>,
    refs: () => <><H t={h.refs} />{cv.refs.map((r) => <p key={r.id} className="break-inside-avoid"><b className="text-slate-900">{r.name}</b>{r.role && ` · ${r.role}`}{r.contact && <span className="text-slate-500"> · {r.contact}</span>}</p>)}</>,
  };
  return (
    <div className="grid min-h-[841px] grid-cols-[185px_1fr] text-[9.5px] leading-[1.5] text-slate-700" style={rootStyle(cv)}>
      <aside className="bg-slate-100 p-6">
        {cv.photo ? <Photo cv={cv} base={84} imgClass="rounded-2xl" wrapClass="mx-auto" />
          : <div className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-2xl bg-teal-600 text-[26px] font-bold text-white">{initials(cv.name)}</div>}
        {(cv.email || cv.phone || cv.location || linkList(cv).length > 0) && <><SH t={h.contact} /><p className="break-all">{cv.email}</p><p>{cv.phone}</p><p>{cv.location}</p>{linkList(cv).map((x, i) => <p key={i} className="break-all">{x}</p>)}</>}
        {active(cv, SIDE).map((id) => <div key={id}>{S[id]()}</div>)}
      </aside>
      <main className="px-7 py-9">
        <h1 className="text-[27px] font-extrabold leading-none text-slate-900">{cv.name || dict[lang].f.name}</h1>
        {cv.title && <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-teal-600">{cv.title}</p>}
        {active(cv).filter((id) => !SIDE.includes(id)).map((id) => <div key={id}>{S[id]()}</div>)}
      </main>
    </div>
  );
}
