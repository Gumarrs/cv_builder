import { cv } from "@/lib/data";
const H = ({ t }: { t: string }) => <h3 className="mb-1.5 mt-4 border-l-[3px] border-indigo-600 pl-2 text-[10.5px] font-bold text-indigo-700">{t}</h3>;
export default function ATSModernPreview() {
  return (
    <div className="h-full text-[9.5px] leading-[1.5] text-slate-700">
      <div className="bg-indigo-600 px-9 py-7 text-white">
        <h1 className="text-[26px] font-extrabold leading-none">{cv.name}</h1>
        <p className="mt-1 text-[12px] text-indigo-100">{cv.title}</p>
        <p className="mt-2 text-[9px] text-indigo-100">{cv.email} · {cv.phone} · {cv.location}</p>
      </div>
      <div className="grid grid-cols-[1fr_150px] gap-6 px-9 pb-8 pt-1">
        <div>
          <H t="Profile" /><p>{cv.summary}</p>
          <H t="Experience" />
          {cv.experience.map((e) => (
            <div key={e.role} className="mb-2">
              <div className="flex justify-between"><b className="text-slate-900">{e.role}</b><span className="text-indigo-600">{e.period}</span></div>
              <div className="text-slate-500">{e.org}</div>
              <ul className="ml-3.5 list-disc">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
          <H t="Projects" />{cv.projects.map((p) => <p key={p.name}><b className="text-slate-900">{p.name}</b> — {p.desc}</p>)}
          <H t="References" />{cv.refs.map((r) => <p key={r.name}><b className="text-slate-900">{r.name}</b>, {r.role}</p>)}
        </div>
        <div>
          <H t="Skills" />
          <div className="flex flex-wrap gap-1">{cv.skills.map((s) => <span key={s} className="rounded bg-indigo-50 px-1.5 py-0.5 text-[8.5px] font-medium text-indigo-700">{s}</span>)}</div>
          <H t="Education" />
          {cv.education.map((e) => <div key={e.school} className="mb-1.5"><b className="text-slate-900">{e.school}</b><br />{e.degree}<br /><span className="text-indigo-600">{e.period}</span></div>)}
          <H t="Links" />{cv.links.map((l) => <p key={l}>{l}</p>)}
          <H t="Organization" />{cv.orgs.map((o) => <p key={o.name}><b className="text-slate-900">{o.name}</b><br />{o.role}</p>)}
        </div>
      </div>
    </div>
  );
}
