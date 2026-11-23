import Link from "next/link";
import { LayoutTemplate, Eye, ShieldCheck, Palette, Smartphone, Download, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { TemplatePaper } from "@/components/templates";
import { templates } from "@/lib/data";

const features = [
  { icon: Eye, t: "Live preview", d: "See every change on an A4 page as you type.", c: "from-violet-500 to-indigo-500" },
  { icon: ShieldCheck, t: "ATS-friendly", d: "Clean structure that applicant systems can read.", c: "from-blue-500 to-teal-400" },
  { icon: LayoutTemplate, t: "Three templates", d: "Switch layouts without retyping anything.", c: "from-pink-500 to-violet-500" },
  { icon: Palette, t: "Made to look good", d: "Considered spacing and type, ready to send.", c: "from-teal-400 to-blue-500" },
  { icon: Smartphone, t: "Works on your phone", d: "Edit and preview from any screen size.", c: "from-indigo-500 to-pink-500" },
  { icon: Download, t: "One-click PDF", d: "Export a print-ready file when you finish.", c: "from-violet-500 to-pink-500" },
];
const steps = [
  { t: "Pick a template", d: "Start with a layout that fits the job you want." },
  { t: "Fill in your details", d: "Add experience, education, and skills section by section." },
  { t: "Download your CV", d: "Export a PDF and send it with confidence." },
];
const btn = "inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5";

export default function Landing() {
  return (
    <div className="overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b border-violet-100 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <div className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            {["Features", "Templates", "About"].map((l) => <a key={l} href={`#${l.toLowerCase()}`} className="transition hover:text-violet-600">{l}</a>)}
          </div>
          <Link href="/templates" className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-300/50 transition hover:-translate-y-0.5">Create CV</Link>
        </nav>
      </header>

      <section className="relative">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700"><span className="h-2 w-2 rounded-full bg-teal-500" />Free to start, no sign-up</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">Build a CV that gets you the interview.</h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600">Choose a template, fill in your story, and watch a print-ready CV take shape beside you.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/templates" className={`${btn} bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-300/60`}>Create your CV <ArrowRight size={18} /></Link>
              <a href="#templates" className={`${btn} border border-violet-200 bg-white text-violet-700`}>See templates</a>
            </div>
          </div>
          <div className="relative mx-auto h-[470px] w-full max-w-[520px]">
            <div className="absolute left-0 top-10 -rotate-6"><TemplatePaper id="classic" scale={0.48} /></div>
            <div className="absolute right-0 top-14 rotate-6"><TemplatePaper id="creative" scale={0.48} /></div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 transition hover:-translate-y-2"><TemplatePaper id="modern" scale={0.56} /></div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">Everything you need, nothing you don’t.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: I, t, d, c }) => (
            <div key={t} className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:shadow-violet-200/50">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c} text-white`}><I size={22} /></span>
              <h3 className="mt-4 text-lg font-bold">{t}</h3><p className="mt-1 text-slate-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="templates" className="bg-gradient-to-b from-violet-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">Three templates, three personalities.</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {templates.map((t) => (
              <Link key={t.id} href="/templates" className="group flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <TemplatePaper id={t.id} scale={0.4} />
                <h3 className="mt-5 font-bold">{t.name}</h3><p className="mt-1 text-center text-sm text-slate-500">{t.tags.join(" · ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">From blank page to PDF in three steps.</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="flex gap-4 rounded-3xl border border-violet-100 bg-white p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 font-bold text-white">{i + 1}</span>
              <div><h3 className="font-bold">{s.t}</h3><p className="mt-1 text-slate-600">{s.d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-extrabold md:text-4xl">Your next role starts with a better CV.</h2>
          <Link href="/templates" className={`${btn} mt-8 bg-white text-violet-700 shadow-xl`}>Create your CV <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="border-t border-violet-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-slate-500">
          <Logo /><span>© 2026 Kerja CV. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
