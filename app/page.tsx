"use client";
import Link from "next/link";
import { LayoutTemplate, Eye, ShieldCheck, Palette, Smartphone, Download, ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { TemplatePaper } from "@/components/templates";
import { LangSwitch, useLang } from "@/lib/lang";
import { templateIds } from "@/lib/data";

const featureStyle = [
  { icon: Eye, c: "from-violet-500 to-indigo-500" }, { icon: ShieldCheck, c: "from-blue-500 to-teal-400" }, { icon: LayoutTemplate, c: "from-pink-500 to-violet-500" },
  { icon: Palette, c: "from-teal-400 to-blue-500" }, { icon: Smartphone, c: "from-indigo-500 to-pink-500" }, { icon: Download, c: "from-violet-500 to-pink-500" },
];
const btn = "inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition hover:-translate-y-0.5";

export default function Landing() {
  const { t } = useLang();
  return (
    <div className="overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b border-violet-100 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Logo />
          <div className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            {([["features", t.nav.features], ["templates", t.nav.templates], ["about", t.nav.about]] as const).map(([k, l]) => <a key={k} href={`#${k}`} className="transition hover:text-violet-600">{l}</a>)}
          </div>
          <div className="flex items-center gap-3"><LangSwitch /><Link href="/templates" className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-300/50 transition hover:-translate-y-0.5">{t.nav.create}</Link></div>
        </nav>
      </header>

      <section className="relative">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-pink-300/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700"><span className="h-2 w-2 rounded-full bg-teal-500" />{t.hero.badge}</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">{t.hero.h1}</h1>
            <p className="mt-5 max-w-lg text-lg text-slate-600">{t.hero.p}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/templates" className={`${btn} bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-300/60`}>{t.hero.cta} <ArrowRight size={18} /></Link>
              <a href="#templates" className={`${btn} border border-violet-200 bg-white text-violet-700`}>{t.hero.see}</a>
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
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight md:text-4xl">{t.feat.title}</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureStyle.map(({ icon: I, c }, i) => (
            <div key={i} className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition hover:shadow-xl hover:shadow-violet-200/50">
              <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c} text-white`}><I size={22} /></span>
              <h3 className="mt-4 text-lg font-bold">{t.feat.items[i].t}</h3><p className="mt-1 text-slate-600">{t.feat.items[i].d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="templates" className="bg-gradient-to-b from-violet-50 to-white py-20">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t.tplTitle}</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {templateIds.map((id) => (
              <Link key={id} href={`/builder?template=${id}`} className="group flex flex-col items-center rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <TemplatePaper id={id} scale={0.4} />
                <h3 className="mt-5 font-bold">{t.tpls[id].name}</h3><p className="mt-1 text-center text-sm text-slate-500">{t.tpls[id].tags.join(" · ")}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">{t.steps.title}</h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {t.steps.items.map((s, i) => (
            <li key={i} className="flex gap-4 rounded-3xl border border-violet-100 bg-white p-6">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 font-bold text-white">{i + 1}</span>
              <div><h3 className="font-bold">{s.t}</h3><p className="mt-1 text-slate-600">{s.d}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 px-8 py-16 text-center text-white">
          <h2 className="text-3xl font-extrabold md:text-4xl">{t.ctaTitle}</h2>
          <Link href="/templates" className={`${btn} mt-8 bg-white text-violet-700 shadow-xl`}>{t.hero.cta} <ArrowRight size={18} /></Link>
        </div>
      </section>

      <footer className="border-t border-violet-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-slate-500">
          <Logo /><span>{t.foot}</span>
        </div>
      </footer>
    </div>
  );
}
