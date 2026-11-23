'use client';
import { CVData } from '@/types/cv';
const dateRange = (a: string, b: string, current: boolean) => [a, current ? 'Present' : b].filter(Boolean).join(' – ');
function Section({ title, children }: { title: string; children: React.ReactNode }) { return <section className="cv-section"><h2>{title}</h2>{children}</section>; }
export default function CVPreview({ cv }: { cv: CVData }) {
  const creative = cv.settings.templateId === 'creative';
  const modern = cv.settings.templateId === 'ats-modern';
  const p = cv.personal;
  const sections = cv.settings.sectionOrder.filter((s) => cv.settings.visibleSections.includes(s));
  const content = <>
    {sections.includes('summary') && p.summary && <Section title="PROFESSIONAL SUMMARY"><p>{p.summary}</p></Section>}
    {sections.includes('experience') && cv.experiences.length > 0 && <Section title="WORK EXPERIENCE">{cv.experiences.map((e) => <div className="cv-entry" key={e.id}><div className="cv-entry-head"><strong>{e.position || 'Position'}</strong><span>{dateRange(e.startDate,e.endDate,e.current)}</span></div><div className="cv-sub">{e.company}{e.location ? ` · ${e.location}` : ''}</div>{[...e.descriptions,...e.achievements].filter(x=>x.text).length>0 && <ul>{[...e.descriptions,...e.achievements].filter(x=>x.text).map(x=><li key={x.id}>{x.text}</li>)}</ul>}</div>)}</Section>}
    {sections.includes('education') && cv.education.length > 0 && <Section title="EDUCATION">{cv.education.map(e=><div className="cv-entry" key={e.id}><div className="cv-entry-head"><strong>{e.degree} {e.major && `— ${e.major}`}</strong><span>{dateRange(e.startDate,e.endDate,e.current)}</span></div><div className="cv-sub">{e.institution}{e.gpa ? ` · GPA ${e.gpa}` : ''}</div>{e.details.filter(x=>x.text).map(x=><p key={x.id}>{x.text}</p>)}</div>)}</Section>}
    {sections.includes('skills') && Object.values(cv.skills).some(a=>a.length) && <Section title="SKILLS">{Object.entries(cv.skills).filter(([,v])=>v.length).map(([k,v])=><p key={k}><strong className="capitalize">{k}: </strong>{v.join(' · ')}</p>)}</Section>}
    {sections.includes('organizations') && cv.organizations.length>0 && <Section title="ORGANIZATIONAL EXPERIENCE">{cv.organizations.map(o=><div className="cv-entry" key={o.id}><div className="cv-entry-head"><strong>{o.position}</strong><span>{dateRange(o.startDate,o.endDate,o.current)}</span></div><div className="cv-sub">{o.name}</div>{o.descriptions.filter(x=>x.text).map(x=><p key={x.id}>{x.text}</p>)}</div>)}</Section>}
    {sections.includes('projects') && cv.projects.length>0 && <Section title="PROJECTS">{cv.projects.map(x=><div className="cv-entry" key={x.id}><div className="cv-entry-head"><strong>{x.name}</strong><span>{x.role}</span></div>{x.description && <p>{x.description}</p>}{x.technologies && <p><strong>Technologies: </strong>{x.technologies}</p>}{x.url && <p>{x.url}</p>}</div>)}</Section>}
    {sections.includes('references') && cv.references.length>0 && <Section title="REFERENCES">{cv.references.map(r=><p key={r.id}><strong>{r.name}</strong> · {r.position} · {r.company} {r.email && `· ${r.email}`} {r.phone && `· ${r.phone}`}</p>)}</Section>}
  </>;
  return <article className={`cv-paper ${creative?'cv-creative':''} ${modern?'cv-modern':''}`}>
    {creative && <aside className="cv-side">{p.photo && <img className="cv-photo" src={p.photo} alt="Profile"/>}<h1>{p.fullName || 'Your Name'}</h1><p className="cv-title">{p.title}</p><h3>CONTACT</h3>{[p.email,p.phone,p.location,p.linkedin,p.github,p.portfolio].filter(Boolean).map(x=><p key={x}>{x}</p>)}{Object.entries(cv.skills).filter(([,v])=>v.length).map(([k,v])=><div key={k}><h3 className="capitalize">{k}</h3><p>{v.join(' · ')}</p></div>)}</aside>}
    <div className="cv-main">
      {!creative && <header className="cv-header"><h1>{p.fullName || 'Your Name'}</h1><h3>{p.title || 'Professional Title'}</h3><p>{[p.email,p.phone,p.location,p.linkedin,p.github,p.portfolio].filter(Boolean).join('  |  ')}</p></header>}
      {content}
    </div>
  </article>;
}
