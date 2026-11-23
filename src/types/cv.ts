export type BulletEntry = { id: string; text: string };
export type Education = { id: string; institution: string; degree: string; major: string; startDate: string; endDate: string; current: boolean; gpa: string; details: BulletEntry[] };
export type Experience = { id: string; position: string; company: string; type: string; arrangement: string; location: string; startDate: string; endDate: string; current: boolean; descriptions: BulletEntry[]; achievements: BulletEntry[] };
export type Organization = { id: string; position: string; name: string; startDate: string; endDate: string; current: boolean; descriptions: BulletEntry[] };
export type Project = { id: string; name: string; role: string; url: string; description: string; technologies: string };
export type Reference = { id: string; name: string; position: string; company: string; email: string; phone: string };
export type CVData = {
  personal: { fullName: string; title: string; email: string; phone: string; location: string; linkedin: string; github: string; portfolio: string; summary: string; photo: string };
  education: Education[]; experiences: Experience[]; organizations: Organization[];
  skills: { technical: string[]; tools: string[]; soft: string[]; languages: string[] };
  projects: Project[]; references: Reference[];
  settings: { templateId: 'ats-classic' | 'ats-modern' | 'creative'; language: 'id' | 'en'; sectionOrder: string[]; visibleSections: string[] };
};
export const emptyCV: CVData = {
  personal: { fullName: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '', portfolio: '', summary: '', photo: '' },
  education: [], experiences: [], organizations: [], skills: { technical: [], tools: [], soft: [], languages: [] }, projects: [], references: [],
  settings: { templateId: 'ats-classic', language: 'id', sectionOrder: ['summary','experience','education','skills','organizations','projects','references'], visibleSections: ['summary','experience','education','skills','organizations','projects','references'] }
};
export const uid = () => typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
