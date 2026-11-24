export type SectionId = "summary" | "links" | "education" | "work" | "org" | "skills" | "projects" | "refs";
export type TemplateId = "classic" | "modern" | "creative" | "executive" | "elegant" | "bold";
export interface PhotoBox { dx: number; dy: number; scale: number }
export interface LinkItem { id: string; label: string; url: string }
export interface EducationItem { id: string; school: string; degree: string; period: string }
export interface WorkItem { id: string; role: string; org: string; period: string; points: string }
export interface OrgItem { id: string; name: string; role: string; period: string }
export interface ProjectItem { id: string; name: string; desc: string }
export interface RefItem { id: string; name: string; role: string; contact: string }
export interface CV {
  photo: string; photoBox: PhotoBox; name: string; title: string; email: string; phone: string; location: string; summary: string;
  links: LinkItem[]; education: EducationItem[]; work: WorkItem[]; org: OrgItem[];
  skills: string[]; projects: ProjectItem[]; refs: RefItem[];
  sections: { id: SectionId; visible: boolean }[];
}
