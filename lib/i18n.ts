export type Lang = "en" | "id";
export const LANG_KEY = "cvb:lang";
export function readLang(): Lang {
  if (typeof window === "undefined") return "en";
  try { const s = localStorage.getItem(LANG_KEY); if (s === "en" || s === "id") return s; } catch {}
  return navigator.language?.toLowerCase().startsWith("id") ? "id" : "en";
}
const en = {
  nav: { features: "Features", templates: "Templates", about: "About", create: "Create CV" },
  hero: { badge: "Free to start, no sign-up", h1: "Build a CV that gets you the interview.", p: "Choose a template, fill in your story, and watch a print-ready CV take shape beside you.", cta: "Create your CV", see: "See templates" },
  feat: { title: "Everything you need, nothing you don’t.", items: [
    { t: "Live preview", d: "See every change on an A4 page as you type." },
    { t: "ATS-friendly", d: "Clean structure that applicant systems can read." },
    { t: "Six templates", d: "Switch layouts without retyping anything." },
    { t: "Made to look good", d: "Considered spacing and type, ready to send." },
    { t: "Works on your phone", d: "Edit and preview from any screen size." },
    { t: "One-click PDF", d: "Export a print-ready file when you finish." } ] },
  tplTitle: "Six templates, six personalities.",
  steps: { title: "From blank page to PDF in three steps.", items: [
    { t: "Pick a template", d: "Start with a layout that fits the job you want." },
    { t: "Fill in your details", d: "Add experience, education, and skills section by section." },
    { t: "Download your CV", d: "Export a PDF and send it with confidence." } ] },
  ctaTitle: "Your next role starts with a better CV.",
  landing: { stats: [{ n: 6, s: "", l: "Templates" }, { n: 2, s: "", l: "Languages" }, { n: 8, s: "", l: "CV sections" }, { n: 100, s: "%", l: "Stays on your device" }],
    chips: ["ATS-friendly", "A4 PDF", "EN / ID"], tplSub: "Hover to pause. Click one to start building.", ctaSub: "Free, no sign-up, and your CV data never leaves your browser.", tplKicker: "Templates", featKicker: "Features", stepsKicker: "How it works" },
  foot: "© 2026 Kerja CV. All rights reserved.",
  pick: { title: "Choose your template", sub: "You can switch anytime in the builder. Your content stays.", back: "Back to home", select: "Select Template" },
  tpls: {
    classic: { name: "ATS Classic", desc: "Formal, black and white, and minimal. Built to pass any applicant tracking system.", tags: ["Formal", "Single column"] },
    modern: { name: "ATS Modern", desc: "Professional layout with an indigo accent. Clean for recruiters, readable for bots.", tags: ["Accent color", "Two column"] },
    creative: { name: "Creative CV", desc: "Colorful sidebar, skill chips, and a photo. Made to stand out in design and media roles.", tags: ["Photo", "Colorful"] },
    executive: { name: "Executive", desc: "Serif typography with a label column and gold accents. Calm and authoritative for senior roles.", tags: ["Serif", "Label column"] },
    elegant: { name: "Elegant", desc: "Soft grey sidebar with teal details. Light, airy, and easy to scan.", tags: ["Sidebar", "Teal accent"] },
    bold: { name: "Bold", desc: "Dark header, amber section tags, and card sections. Confident and high contrast.", tags: ["Dark header", "Cards"] } },
  b: { templates: "Templates", edit: "Edit", preview: "Preview", download: "Download PDF", reset: "Reset", resetTitle: "Reset your CV?", resetMsg: "This clears all CV content on this device. This cannot be undone.", cancel: "Cancel", confirm: "Reset CV",
    saved: "Saved automatically", add: "Add Entry", remove: "Remove", upload: "Upload photo", change: "Change photo", uploadHint: "Any image, up to 10 MB", font: "Font", fontDefault: "Template default", photoSize: "Photo size", photoReset: "Reset position", photoDrag: "Drag the photo in the preview to move it. Use the corner dot to resize.", removePhoto: "Remove photo", photoErr: "Choose an image file under 10 MB.",
    show: "Show section", hide: "Hide section", hidden: "Hidden", up: "Move up", down: "Move down", zoomIn: "Zoom in", zoomOut: "Zoom out", page: "Page",
    addSkill: "Add", fixErrors: "Fix the highlighted fields before downloading.", empty: "Nothing here yet. Add your first entry.", loading: "Loading your CV…" },
  sec: { personal: { l: "Personal", f: "Personal Information" }, summary: { l: "Summary", f: "Professional Summary" }, links: { l: "Links", f: "Social Links" }, education: { l: "Education", f: "Education" }, work: { l: "Work", f: "Work Experience" }, org: { l: "Organization", f: "Organization" }, skills: { l: "Skills", f: "Skills" }, projects: { l: "Projects", f: "Projects" }, refs: { l: "References", f: "References" } },
  entry: { links: "Link", education: "Education", work: "Experience", org: "Organization", projects: "Project", refs: "Reference" },
  f: { name: "Full name", title: "Job title", email: "Email", phone: "Phone", location: "Location", summary: "Summary", label: "Label", url: "URL", school: "School", degree: "Degree", period: "Period", role: "Role", company: "Company", points: "Highlights (one per line)", orgName: "Organization", desc: "Description", projectName: "Project name", refName: "Name", refRole: "Position and company", contact: "Email or phone", skill: "Add a skill (press Enter)" },
  err: { required: "Required", email: "Enter a valid email", url: "Enter a valid URL", phone: "Enter a valid phone number" },
  cvh: { summary: "Summary", profile: "Profile", about: "About me", links: "Links", education: "Education", work: "Experience", org: "Organization", skills: "Skills", projects: "Projects", refs: "References", contact: "Contact" },
};
export type Dict = typeof en;
const id: Dict = {
  nav: { features: "Fitur", templates: "Template", about: "Tentang", create: "Buat CV" },
  hero: { badge: "Gratis, tanpa daftar", h1: "Buat CV yang membawamu ke tahap wawancara.", p: "Pilih template, isi ceritamu, dan lihat CV siap cetak terbentuk di sebelahmu.", cta: "Buat CV", see: "Lihat template" },
  feat: { title: "Semua yang kamu butuhkan, tanpa yang tidak perlu.", items: [
    { t: "Pratinjau langsung", d: "Lihat setiap perubahan di halaman A4 saat kamu mengetik." },
    { t: "Ramah ATS", d: "Struktur bersih yang bisa dibaca sistem pelamar." },
    { t: "Enam template", d: "Ganti layout tanpa mengetik ulang." },
    { t: "Tampil menarik", d: "Spasi dan tipografi yang rapi, siap dikirim." },
    { t: "Nyaman di ponsel", d: "Edit dan lihat pratinjau di layar berukuran apa pun." },
    { t: "PDF sekali klik", d: "Ekspor file siap cetak setelah selesai." } ] },
  tplTitle: "Enam template, enam kepribadian.",
  steps: { title: "Dari halaman kosong ke PDF dalam tiga langkah.", items: [
    { t: "Pilih template", d: "Mulai dari layout yang cocok dengan pekerjaan yang kamu incar." },
    { t: "Isi datamu", d: "Tambahkan pengalaman, pendidikan, dan keahlian bagian demi bagian." },
    { t: "Unduh CV", d: "Ekspor PDF dan kirim dengan percaya diri." } ] },
  ctaTitle: "Peran berikutnya dimulai dari CV yang lebih baik.",
  landing: { stats: [{ n: 6, s: "", l: "Template" }, { n: 2, s: "", l: "Bahasa" }, { n: 8, s: "", l: "Bagian CV" }, { n: 100, s: "%", l: "Tetap di perangkatmu" }],
    chips: ["Ramah ATS", "PDF A4", "EN / ID"], tplSub: "Arahkan kursor untuk menjeda. Klik salah satu untuk mulai membuat.", ctaSub: "Gratis, tanpa daftar, dan data CV-mu tidak pernah keluar dari browser.", tplKicker: "Template", featKicker: "Fitur", stepsKicker: "Cara kerja" },
  foot: "© 2026 Kerja CV. Hak cipta dilindungi.",
  pick: { title: "Pilih template", sub: "Kamu bisa menggantinya kapan saja di builder. Isi CV tetap aman.", back: "Kembali ke beranda", select: "Pilih Template" },
  tpls: {
    classic: { name: "ATS Classic", desc: "Formal, hitam putih, dan minimalis. Dibuat agar lolos sistem pelacakan pelamar.", tags: ["Formal", "Satu kolom"] },
    modern: { name: "ATS Modern", desc: "Layout profesional dengan aksen indigo. Rapi untuk rekruter, terbaca oleh sistem.", tags: ["Aksen warna", "Dua kolom"] },
    creative: { name: "Creative CV", desc: "Sidebar berwarna, chip keahlian, dan foto. Untuk tampil beda di bidang desain dan media.", tags: ["Foto", "Berwarna"] },
    executive: { name: "Executive", desc: "Tipografi serif dengan kolom label dan aksen emas. Tenang dan berwibawa untuk posisi senior.", tags: ["Serif", "Kolom label"] },
    elegant: { name: "Elegant", desc: "Sidebar abu-abu lembut dengan detail teal. Ringan, lega, dan mudah dipindai.", tags: ["Sidebar", "Aksen teal"] },
    bold: { name: "Bold", desc: "Header gelap, label bagian berwarna amber, dan section berbentuk kartu. Tegas dan kontras tinggi.", tags: ["Header gelap", "Kartu"] } },
  b: { templates: "Template", edit: "Edit", preview: "Pratinjau", download: "Unduh PDF", reset: "Reset", resetTitle: "Reset CV kamu?", resetMsg: "Semua isi CV di perangkat ini akan dihapus. Tindakan ini tidak bisa dibatalkan.", cancel: "Batal", confirm: "Reset CV",
    saved: "Tersimpan otomatis", add: "Tambah Entri", remove: "Hapus", upload: "Unggah foto", change: "Ganti foto", uploadHint: "Gambar apa saja, maks. 10 MB", font: "Font", fontDefault: "Bawaan template", photoSize: "Ukuran foto", photoReset: "Reset posisi", photoDrag: "Geser foto di pratinjau untuk memindahkannya. Gunakan titik di sudut untuk mengubah ukuran.", removePhoto: "Hapus foto", photoErr: "Pilih file gambar di bawah 10 MB.",
    show: "Tampilkan bagian", hide: "Sembunyikan bagian", hidden: "Disembunyikan", up: "Naikkan", down: "Turunkan", zoomIn: "Perbesar", zoomOut: "Perkecil", page: "Halaman",
    addSkill: "Tambah", fixErrors: "Perbaiki kolom yang ditandai sebelum mengunduh.", empty: "Belum ada isi. Tambahkan entri pertamamu.", loading: "Memuat CV kamu…" },
  sec: { personal: { l: "Pribadi", f: "Informasi Pribadi" }, summary: { l: "Ringkasan", f: "Ringkasan Profesional" }, links: { l: "Tautan", f: "Tautan Sosial" }, education: { l: "Pendidikan", f: "Pendidikan" }, work: { l: "Kerja", f: "Pengalaman Kerja" }, org: { l: "Organisasi", f: "Organisasi" }, skills: { l: "Keahlian", f: "Keahlian" }, projects: { l: "Proyek", f: "Proyek" }, refs: { l: "Referensi", f: "Referensi" } },
  entry: { links: "Tautan", education: "Pendidikan", work: "Pengalaman", org: "Organisasi", projects: "Proyek", refs: "Referensi" },
  f: { name: "Nama lengkap", title: "Jabatan", email: "Email", phone: "Telepon", location: "Lokasi", summary: "Ringkasan", label: "Label", url: "URL", school: "Sekolah / Universitas", degree: "Gelar / Jurusan", period: "Periode", role: "Posisi", company: "Perusahaan", points: "Pencapaian (satu per baris)", orgName: "Organisasi", desc: "Deskripsi", projectName: "Nama proyek", refName: "Nama", refRole: "Jabatan dan perusahaan", contact: "Email atau telepon", skill: "Tambah keahlian (tekan Enter)" },
  err: { required: "Wajib diisi", email: "Masukkan email yang valid", url: "Masukkan URL yang valid", phone: "Masukkan nomor telepon yang valid" },
  cvh: { summary: "Ringkasan", profile: "Profil", about: "Tentang saya", links: "Tautan", education: "Pendidikan", work: "Pengalaman Kerja", org: "Organisasi", skills: "Keahlian", projects: "Proyek", refs: "Referensi", contact: "Kontak" },
};
export const dict: Record<Lang, Dict> = { en, id };
