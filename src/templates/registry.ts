export const templateList = [
  { id: 'ats-classic', name: 'Classic ATS', category: 'ATS-Friendly', description: 'Traditional single-column resume with clear hierarchy.' },
  { id: 'ats-modern', name: 'Modern ATS', category: 'ATS-Friendly', description: 'Contemporary typography with a clean single-column layout.' },
  { id: 'creative', name: 'Creative', category: 'Designed CV', description: 'Visual two-column resume with profile photo and accent sidebar.' }
] as const;
export type TemplateId = typeof templateList[number]['id'];
