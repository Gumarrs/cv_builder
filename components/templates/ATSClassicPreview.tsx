import type { ReactNode } from "react";
import type { CV, SectionId } from "@/lib/types";
import { dict, Lang } from "@/lib/i18n";
import { active, lines } from "@/lib/cvutils";
const H = ({ t }: { t: string }) => <h3 className="mb-1 mt-4 break-after-avoid border-b border-black pb-0.5 text-[10px] font-bold uppercase tracking-widest">{t}</h3>;
export default function ATSClassicPreview({ cv, lang }: { cv: CV; lang: Lang }) {
  const h = dict[lang].cvh;
  const S: Record<SectionId, () => ReactNode> = {
    summary: () => <><H t={h.summary} /><p>{cv.summary}</p></>,
    links: () => <><H t={h.links} />{cv.links.map((l) => <p key={l.id}>{l.label && <b>{l.label}: </b>}{l.url}</p>)}</>,
    education: () => <><H t={h.education} />{cv.education.map((e) => <div key={e.id} className="flex justify-between break-inside-avoid"><span><b>{e.school}</b>{e.degree && `, ${e.degree}`}</span><i>{e.period}</i></div>)}</>,
    work: () => <><H t={h.work} />{cv.work.map((e) => (
      <div key={e.id} className="mb-2 break-inside-avoid">
        <div className="flex justify-between font-bold"><span>{e.role}{e.org && `, ${e.org}`}</span><span className="font-normal italic">{e.period}</span></div>
        <ul className="ml-4 list-disc">{lines(e.points).map((p, i) => <li key={i}>{p}</li>)}</ul>
      </div>))}</>,
    org: () => <><H t={h.org} />{cv.org.map((o) => <div key={o.id} className="flex justify-between break-inside-avoid"><span><b>{o.name}</b>{o.role && `, ${o.role}`}</span><i>{o.period}</i></div>)}</>,
    skills: () => <><H t={h.skills} /><p>{cv.skills.join(", ")}</p></>,
    projects: () => <><H t={h.projects} />{cv.projects.map((p) => <p key={p.id} className="break-inside-avoid"><b>{p.name}</b>{p.desc && ` — ${p.desc}`}</p>)}</>,
    refs: () => <><H t={h.refs} />{cv.refs.map((r) => <p key={r.id} className="break-inside-avoid"><b>{r.name}</b>{r.role && `, ${r.role}`}{r.contact && ` — ${r.contact}`}</p>)}</>,
  };
  return (
    <div className="min-h-[841px] px-11 py-10 font-serif text-[9.5px] leading-[1.5] text-black">
      <div className="relative text-center">
        {cv.photo && <img src={cv.photo} alt="" className="absolute right-0 top-0 h-[70px] w-[70px] object-cover" />}
        <h1 className="text-[24px] font-bold tracking-wide">{cv.name || dict[lang].f.name}</h1>
        {cv.title && <p className="italic">{cv.title}</p>}
        <p className="mt-1">{[cv.email, cv.phone, cv.location].filter(Boolean).join(" | ")}</p>
      </div>
      {active(cv).map((id) => <div key={id}>{S[id]()}</div>)}
    </div>
  );
}
