import type { CV, TemplateId } from "./types";
import type { Lang } from "./i18n";
export const uid = () => Math.random().toString(36).slice(2, 10);
export const templateIds: TemplateId[] = ["classic", "modern", "creative", "executive", "elegant", "bold"];
export const emptyCV: CV = {
  photo: "", photoBox: { dx: 0, dy: 0, scale: 1 }, font: "default", name: "", title: "", email: "", phone: "", location: "", summary: "",
  links: [], education: [], work: [], org: [], skills: [], projects: [], refs: [],
  sections: (["summary", "education", "work", "org", "skills", "projects", "refs"] as const).map((id) => ({ id, visible: true })),
};
export function getSample(lang: Lang): CV {
  const id = lang === "id";
  return {
    ...emptyCV,
    name: "Alya Prameswari", title: id ? "Desainer Produk" : "Product Designer",
    email: "alya.p@email.com", phone: "+62 812 3456 7890", location: "Jakarta, Indonesia",
    summary: id ? "Desainer produk dengan pengalaman 5+ tahun merilis produk mobile dan web untuk fintech dan e-commerce. Mengubah masalah rumit menjadi alur yang jelas dan bekerja erat dengan engineer agar rilis tepat waktu."
      : "Product designer with 5+ years of experience shipping mobile and web products for fintech and e-commerce. Turns messy problems into clear flows, and works closely with engineers to ship on time.",
    links: [{ id: uid(), label: "LinkedIn", url: "linkedin.com/in/alyap" }, { id: uid(), label: "Portfolio", url: "alyap.design" }],
    education: [{ id: uid(), school: "Universitas Indonesia", degree: id ? "S1 Ilmu Komputer" : "B.Sc. Computer Science", period: "2015 – 2019" },
      { id: uid(), school: "Google UX Certificate", degree: id ? "Sertifikat Profesional" : "Professional Certificate", period: "2020" }],
    work: [
      { id: uid(), role: id ? "Desainer Produk Senior" : "Senior Product Designer", org: "Nusa Pay", period: id ? "2022 – Sekarang" : "2022 – Present",
        points: id ? "Memimpin redesain onboarding, penyelesaian naik 28%.\nMembangun design system untuk 4 tim produk.\nMembimbing 3 desainer junior." : "Led redesign of the onboarding flow, raising completion by 28%.\nBuilt a design system used by 4 product squads.\nMentored 3 junior designers." },
      { id: uid(), role: "UI/UX Designer", org: "Tokoriang", period: "2019 – 2022",
        points: id ? "Mendesain checkout dan dasbor penjual untuk 2 juta+ pengguna.\nMenjalankan 40+ uji kegunaan untuk menentukan roadmap." : "Designed checkout and seller dashboard for 2M+ users.\nRan 40+ usability tests to guide the roadmap." }],
    org: [{ id: uid(), name: "ADPII Jakarta", role: id ? "Ketua Komunitas" : "Community Lead", period: "2021 – 2023" }],
    skills: ["Figma", "User Research", "Prototyping", "Design Systems", "HTML & CSS", "Workshop Facilitation"],
    projects: [{ id: uid(), name: "Warung Kita", desc: id ? "Aplikasi stok untuk warung makan kecil, 10 ribu unduhan." : "Inventory app for small food stalls, 10k downloads." }],
    refs: [{ id: uid(), name: "Raka Wijaya", role: "Head of Design, Nusa Pay", contact: "raka@nusapay.id" }],
  };
}
