import { cv } from "@/lib/data";
const lvl = [92, 85, 80, 75, 70, 65];
const H = ({ t }: { t: string }) => <h3 className="mb-2 mt-4 flex items-center gap-2 text-[11px] font-extrabold text-violet-700"><span className="h-2 w-5 rounded-full bg-gradient-to-r from-pink-500 to-violet-500" />{t}</h3>;
export default function CreativePreview() {
  return (
    <div className="grid h-full grid-cols-[190px_1fr] text-[9.5px] leading-[1.5] text-slate-700">
      <aside className="bg-gradient-to-b from-violet-600 via-indigo-600 to-blue-600 p-6 text-white">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-4 border-pink-300 bg-white/20 text-[26px] font-extrabold">AP</div>
        <h3 className="mb-1 mt-6 text-[10px] font-bold text-pink-200">Contact</h3>
        <p className="break-all">{cv.email}</p><p>{cv.phone}</p><p>{cv.location}</p>
        <h3 className="mb-1.5 mt-5 text-[10px] font-bold text-pink-200">Skills</h3>
        {cv.skills.map((s, i) => (
          <div key={s} className="mb-2"><div className="mb-0.5">{s}</div>
            <div className="h-1.5 rounded-full bg-white/25"><div className="h-full rounded-full bg-teal-300" style={{ width: `${lvl[i]}%` }} /></div></div>
        ))}
        <h3 className="mb-1 mt-5 text-[10px] font-bold text-pink-200">Education</h3>
        {cv.education.map((e) => <p key={e.school} className="mb-1"><b>{e.school}</b><br />{e.degree}, {e.period}</p>)}
      </aside>
      <main className="px-7 py-9">
        <h1 className="text-[28px] font-extrabold leading-none text-slate-900">{cv.name}</h1>
        <p className="mt-1.5 inline-block rounded-full bg-pink-100 px-3 py-0.5 text-[10px] font-bold text-pink-600">{cv.title}</p>
        <H t="About me" /><p>{cv.summary}</p>
        <H t="Experience" />
        <div className="ml-1 border-l-2 border-violet-200 pl-4">
          {cv.experience.map((e) => (
            <div key={e.role} className="relative mb-3">
              <span className="absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-teal-500 ring-2 ring-violet-300" />
              <b className="text-slate-900">{e.role}</b> <span className="text-violet-600">· {e.org}</span>
              <div className="text-[8.5px] text-slate-400">{e.period}</div>
              <ul className="ml-3 list-disc">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          ))}
        </div>
        <H t="Projects" />{cv.projects.map((p) => <div key={p.name} className="rounded-lg bg-teal-50 p-2"><b className="text-teal-700">{p.name}</b> — {p.desc}</div>)}
        <H t="Organization" />{cv.orgs.map((o) => <p key={o.name}><b className="text-slate-900">{o.name}</b> · {o.role}</p>)}
        <H t="References" />{cv.refs.map((r) => <p key={r.name}><b className="text-slate-900">{r.name}</b> · {r.role}</p>)}
      </main>
    </div>
  );
}
