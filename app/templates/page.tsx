import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/Logo";
import { TemplatePaper } from "@/components/templates";
import { templates } from "@/lib/data";

export default function Templates() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5"><Logo /><Link href="/" className="text-sm font-medium text-slate-600 hover:text-violet-600">Back to home</Link></header>
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Choose your template</h1>
        <p className="mt-2 text-slate-600">You can switch anytime in the builder. Your content stays.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {templates.map((t) => (
            <article key={t.id} className="flex flex-col rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-200/60">
              <div className="flex justify-center rounded-2xl bg-slate-100 py-6"><TemplatePaper id={t.id} scale={0.46} /></div>
              <h2 className="mt-5 text-xl font-bold">{t.name}</h2>
              <p className="mt-1 flex-1 text-slate-600">{t.desc}</p>
              <div className="mt-3 flex gap-2">{t.tags.map((g) => <span key={g} className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">{g}</span>)}</div>
              <Link href="/builder" className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 py-3 font-semibold text-white transition hover:opacity-90">Select Template <ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
