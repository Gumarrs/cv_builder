import { cv } from "@/lib/data";
const H = ({ t }: { t: string }) => <h3 className="mb-1 mt-4 border-b border-black pb-0.5 text-[10px] font-bold uppercase tracking-widest">{t}</h3>;
export default function ATSClassicPreview() {
  return (
    <div className="h-full px-11 py-10 font-serif text-[9.5px] leading-[1.5] text-black">
      <div className="text-center">
        <h1 className="text-[24px] font-bold tracking-wide">{cv.name}</h1>
        <p className="mt-1">{cv.email} | {cv.phone} | {cv.location}</p>
        <p>{cv.links.join(" | ")}</p>
      </div>
      <H t="Summary" /><p>{cv.summary}</p>
      <H t="Experience" />
      {cv.experience.map((e) => (
        <div key={e.role} className="mb-2">
          <div className="flex justify-between font-bold"><span>{e.role}, {e.org}</span><span className="font-normal italic">{e.period}</span></div>
          <ul className="ml-4 list-disc">{e.points.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      ))}
      <H t="Education" />
      {cv.education.map((e) => <div key={e.school} className="flex justify-between"><span><b>{e.school}</b>, {e.degree}</span><i>{e.period}</i></div>)}
      <H t="Skills" /><p>{cv.skills.join(", ")}</p>
      <H t="Projects" />{cv.projects.map((p) => <p key={p.name}><b>{p.name}</b> — {p.desc}</p>)}
      <H t="Organization" />{cv.orgs.map((o) => <div key={o.name} className="flex justify-between"><span><b>{o.name}</b>, {o.role}</span><i>{o.period}</i></div>)}
      <H t="References" />{cv.refs.map((r) => <p key={r.name}><b>{r.name}</b>, {r.role} — {r.contact}</p>)}
    </div>
  );
}
