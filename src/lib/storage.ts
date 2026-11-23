import { CVData, emptyCV } from '@/types/cv';
const KEY = 'cv-builder:v1';
export function loadCV(): CVData {
  try { const raw = localStorage.getItem(KEY); if (!raw) return emptyCV; const parsed = JSON.parse(raw); return { ...emptyCV, ...parsed, personal: { ...emptyCV.personal, ...parsed.personal }, skills: { ...emptyCV.skills, ...parsed.skills }, settings: { ...emptyCV.settings, ...parsed.settings } } as CVData; }
  catch { return emptyCV; }
}
export function saveCV(cv: CVData) { try { localStorage.setItem(KEY, JSON.stringify(cv)); return true; } catch { return false; } }
export function clearCV() { localStorage.removeItem(KEY); }
