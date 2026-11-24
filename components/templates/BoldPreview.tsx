import type { ReactNode } from "react";
import type { CV, SectionId } from "@/lib/types";
import { dict, Lang } from "@/lib/i18n";
import { active, lines } from "@/lib/cvutils";
import { Photo } from "./Photo";
const Card = ({ t, children }: { t: string; children: ReactNode }) => (
  <section className="mt-3 rounded-xl bg-slate-50 p-3.5">
    <h3 className="mb-2 inline-block break-after-avoid rounded-md bg-amber-400 px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-slate-900">{t}</h3>{children}
  </section>
);
export default function BoldPreview({ cv, lang }: { cv: CV; lang: Lang }) {
  const h = dict[lang].cvh;
  const S: Record<SectionId, () => ReactNode> = {
    summary: () => <Card t={h.summary}><p>{cv.summary}</p></Card>,
    links: () => <Card t={h.links}>{cv.links.map((l) => <p key={l.id}>{l.label && <b className="text-slate-900">{l.label}: </b>}{l.url}</p>)}</Card>,
    education: () => <Card t={h.education}>{cv.education.map((e) => <div key={e.id} className="mb-1 flex justify-between break-inside-avoid"><span><b className="text-slate-900">{e.school}</b>{e.degree && ` — ${e.degree}`}</span><span className="text-slate-500">{e.period}</span></div>)}</Card>,
    work: () => <Card t={h.work}>{cv.work.map((e) => (
      <div key={e.id} className="mb-2.5 break-inside-avoid">
        <div className="flex items-center justify-between"><span><b className="text-slate-900">{e.role}</b>{e.org && <span className="font-semibold text-amber-600"> @ {e.org}</span>}</span><span className="rounded bg-slate-200 px-1.5 text-[8.5px] font-semibold">{e.period}</span></div>
        <ul className="ml-3.5 mt-0.5 list-disc">{lines(e.points).map((p, i) => <li key={i}>{p}</li>)}</ul>
      </div>))}</Card>,
    org: () => <Card t={h.org}>{cv.org.map((o) => <div key={o.id} className="flex justify-between break-inside-avoid"><span><b className="text-slate-900">{o.name}</b>{o.role && ` — ${o.role}`}</span><span className="text-slate-500">{o.period}</span></div>)}</Card>,
    skills: () => <Card t={h.skills}><div className="flex flex-wrap gap-1.5">{cv.skills.map((s) => <span key={s} className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[8.5px] font-semibold text-white">{s}</span>)}</div></Card>,
    projects: () => <Card t={h.projects}>{cv.projects.map((p) => <p key={p.id} className="break-inside-avoid"><b className="text-slate-900">{p.name}</b>{p.desc && ` — ${p.desc}`}</p>)}</Card>,
    refs: () => <Card t={h.refs}>{cv.refs.map((r) => <p key={r.id} className="break-inside-avoid"><b className="text-slate-900">{r.name}</b>{r.role && `, ${r.role}`}{r.contact && ` — ${r.contact}`}</p>)}</Card>,
  };
  return (
    <div className="min-h-[841px] text-[9.5px] leading-[1.5] text-slate-700">
      <div className="flex items-center justify-between bg-slate-900 px-9 py-8 text-white">
        <div>
          <h1 className="text-[30px] font-extrabold leading-none">{cv.name || dict[lang].f.name}</h1>
          {cv.title && <p className="mt-1.5 text-[12px] font-semibold text-amber-400">{cv.title}</p>}
          <p className="mt-2.5 text-[9px] text-slate-300">{[cv.email, cv.phone, cv.location].filter(Boolean).join("  ·  ")}</p>
        </div>
        {cv.photo && <Photo cv={cv} base={76} imgClass="rounded-full border-[3px] border-amber-400" />}
      </div>
      <div className="px-9 pb-8 pt-1">{active(cv).map((id) => <div key={id}>{S[id]()}</div>)}</div>
    </div>
  );
}
