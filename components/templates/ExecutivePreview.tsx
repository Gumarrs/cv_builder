import type { ReactNode } from "react";
import type { CV, SectionId } from "@/lib/types";
import { dict, Lang } from "@/lib/i18n";
import { active, lines } from "@/lib/cvutils";
import { Photo } from "./Photo";
const Row = ({ t, children }: { t: string; children: ReactNode }) => (
  <div className="mt-4 grid grid-cols-[92px_1fr] gap-4 border-t border-slate-300 pt-3">
    <h3 className="break-after-avoid text-[8.5px] font-bold uppercase tracking-[0.18em] text-slate-800">{t}</h3><div>{children}</div>
  </div>
);
export default function ExecutivePreview({ cv, lang }: { cv: CV; lang: Lang }) {
  const h = dict[lang].cvh;
  const S: Record<SectionId, () => ReactNode> = {
    summary: () => <Row t={h.summary}><p>{cv.summary}</p></Row>,
    links: () => <Row t={h.links}>{cv.links.map((l) => <p key={l.id}>{l.label && <b>{l.label}: </b>}{l.url}</p>)}</Row>,
    education: () => <Row t={h.education}>{cv.education.map((e) => <div key={e.id} className="mb-1 break-inside-avoid"><div className="flex justify-between"><b className="text-slate-900">{e.school}</b><span className="text-slate-500">{e.period}</span></div><div>{e.degree}</div></div>)}</Row>,
    work: () => <Row t={h.work}>{cv.work.map((e) => (
      <div key={e.id} className="mb-2.5 break-inside-avoid">
        <div className="flex justify-between"><b className="text-slate-900">{e.role}</b><span className="text-slate-500">{e.period}</span></div>
        <div className="italic text-amber-700">{e.org}</div>
        <ul className="ml-3.5 mt-0.5 list-disc">{lines(e.points).map((p, i) => <li key={i}>{p}</li>)}</ul>
      </div>))}</Row>,
    org: () => <Row t={h.org}>{cv.org.map((o) => <div key={o.id} className="flex justify-between break-inside-avoid"><span><b className="text-slate-900">{o.name}</b>{o.role && `, ${o.role}`}</span><span className="text-slate-500">{o.period}</span></div>)}</Row>,
    skills: () => <Row t={h.skills}><p>{cv.skills.join("  ·  ")}</p></Row>,
    projects: () => <Row t={h.projects}>{cv.projects.map((p) => <p key={p.id} className="break-inside-avoid"><b className="text-slate-900">{p.name}</b>{p.desc && ` — ${p.desc}`}</p>)}</Row>,
    refs: () => <Row t={h.refs}>{cv.refs.map((r) => <p key={r.id} className="break-inside-avoid"><b className="text-slate-900">{r.name}</b>{r.role && `, ${r.role}`}{r.contact && ` — ${r.contact}`}</p>)}</Row>,
  };
  return (
    <div className="relative min-h-[841px] px-11 py-10 font-serif text-[9.5px] leading-[1.5] text-slate-700">
      {cv.photo && <div className="absolute left-11 top-10"><Photo cv={cv} base={66} /></div>}
      <div className="border-b-2 border-slate-800 pb-3 text-center">
        <h1 className="text-[24px] font-bold uppercase tracking-[0.2em] text-slate-900">{cv.name || dict[lang].f.name}</h1>
        {cv.title && <p className="mt-1 text-[9.5px] uppercase tracking-[0.3em] text-amber-700">{cv.title}</p>}
        <p className="mt-2 text-[9px]">{[cv.email, cv.phone, cv.location].filter(Boolean).join("  |  ")}</p>
      </div>
      {active(cv).map((id) => <div key={id}>{S[id]()}</div>)}
    </div>
  );
}
