import type { CV, SectionId } from "./types";
export const lines = (s: string) => s.split("\n").map((x) => x.trim()).filter(Boolean);
const has = (cv: CV, id: SectionId) => id === "summary" ? !!cv.summary.trim() : id === "skills" ? cv.skills.length > 0 : cv[id].length > 0;
export const active = (cv: CV, only?: SectionId[]) => cv.sections.filter((s) => s.visible && has(cv, s.id) && (!only || only.includes(s.id))).map((s) => s.id);
export const initials = (n: string) => n.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() ?? "").join("") || "CV";
export type ErrCode = "required" | "email" | "url" | "phone";
export function validate(cv: CV): Record<string, ErrCode> {
  const e: Record<string, ErrCode> = {};
  if (!cv.name.trim()) e.name = "required";
  if (cv.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cv.email.trim())) e.email = "email";
  if (cv.phone.trim() && !/^\+?[\d\s().-]{6,20}$/.test(cv.phone.trim())) e.phone = "phone";
  cv.links.forEach((l) => { if (l.url.trim() && !/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/\S*)?$/i.test(l.url.trim())) e["link:" + l.id] = "url"; });
  return e;
}
