export const cv = {
  name: "Alya Prameswari", title: "Product Designer",
  email: "alya.p@email.com", phone: "+62 812 3456 7890", location: "Jakarta, Indonesia",
  links: ["linkedin.com/in/alyap", "alyap.design"],
  summary: "Product designer with 5+ years of experience shipping mobile and web products for fintech and e-commerce. Turns messy problems into clear flows, and works closely with engineers to ship on time.",
  experience: [
    { role: "Senior Product Designer", org: "Nusa Pay", period: "2022 – Present", points: ["Led redesign of the onboarding flow, raising completion by 28%.", "Built a design system used by 4 product squads.", "Mentored 3 junior designers."] },
    { role: "UI/UX Designer", org: "Tokoriang", period: "2019 – 2022", points: ["Designed checkout and seller dashboard for 2M+ users.", "Ran 40+ usability tests to guide the roadmap."] },
  ],
  education: [
    { school: "Universitas Indonesia", degree: "B.Sc. Computer Science", period: "2015 – 2019" },
    { school: "Google UX Certificate", degree: "Professional Certificate", period: "2020" },
  ],
  skills: ["Figma", "User Research", "Prototyping", "Design Systems", "HTML & CSS", "Workshop Facilitation"],
  projects: [{ name: "Warung Kita", desc: "Inventory app for small food stalls, 10k downloads." }],
  orgs: [{ name: "ADPII Jakarta", role: "Community Lead", period: "2021 – 2023" }],
  refs: [{ name: "Raka Wijaya", role: "Head of Design, Nusa Pay", contact: "raka@nusapay.id" }],
};
export type CV = typeof cv;
export const templates = [
  { id: "classic", name: "ATS Classic", desc: "Formal, black and white, and minimal. Built to pass any applicant tracking system.", tags: ["Formal", "Single column"] },
  { id: "modern", name: "ATS Modern", desc: "Professional layout with an indigo accent. Clean for recruiters, readable for bots.", tags: ["Accent color", "Two column"] },
  { id: "creative", name: "Creative CV", desc: "Colorful sidebar, skill bars, and a photo. Made to stand out in design and media roles.", tags: ["Photo", "Colorful"] },
] as const;
