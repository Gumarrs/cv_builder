"use client";
import { useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Eye, ShieldCheck, LayoutTemplate, Palette, Smartphone, Download, Sparkles, CheckCircle2, FileText } from "lucide-react";
import Logo from "@/components/Logo";
import { TemplatePaper } from "@/components/templates";
import { LangSwitch, useLang } from "@/lib/lang";
import { templateIds } from "@/lib/data";

const useIso = typeof window !== "undefined" ? useLayoutEffect : useEffect;
const featureStyle = [
  { icon: Eye, c: "from-violet-500 to-indigo-500", bg: "bg-violet-50", span: "md:col-span-2" },
  { icon: ShieldCheck, c: "from-blue-500 to-teal-400", bg: "bg-teal-50", span: "" },
  { icon: LayoutTemplate, c: "from-pink-500 to-violet-500", bg: "bg-pink-50", span: "" },
  { icon: Palette, c: "from-teal-400 to-blue-500", bg: "bg-blue-50", span: "md:col-span-2" },
  { icon: Smartphone, c: "from-indigo-500 to-pink-500", bg: "bg-indigo-50", span: "" },
  { icon: Download, c: "from-violet-500 to-pink-500", bg: "bg-fuchsia-50", span: "md:col-span-2" },
];
const btn = "inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold transition";
const kicker = "text-xs font-bold uppercase tracking-[0.2em] text-violet-600";

export default function Landing() {
  const { t, lang } = useLang();
  const root = useRef<HTMLDivElement>(null);

  useIso(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current!;
    // numbers show their final value by default (also for reduced motion)
    el.querySelectorAll<HTMLElement>(".g-count").forEach((c) => { c.textContent = (c.dataset.n ?? "") + (c.dataset.s ?? ""); });
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cleanups: (() => void)[] = [];
        const on = (target: Element | Window, ev: string, fn: (e: any) => void) => { target.addEventListener(ev, fn); cleanups.push(() => target.removeEventListener(ev, fn)); };

        // ambient: blobs, gradient text, floating layers
        gsap.to(".g-blob", { x: "random(-70,70)", y: "random(-50,50)", scale: "random(0.9,1.25)", duration: "random(6,10)", repeat: -1, yoyo: true, repeatRefresh: true, ease: "sine.inOut" });
        gsap.to(".g-grad", { backgroundPosition: "200% 0", duration: 6, repeat: -1, ease: "none" });
        gsap.to(".g-float", { y: "random(-14,-6)", duration: "random(2.2,3.6)", repeat: -1, yoyo: true, repeatRefresh: true, ease: "sine.inOut", stagger: { each: 0.3, from: "random" } });

        // hero intro
        gsap.set(".g-layer", { rotation: (i: number) => [-6, 6, 0][i] ?? 0 });
        gsap.timeline({ defaults: { ease: "power4.out" } })
          .from(".g-navbar", { y: -40, opacity: 0, duration: 0.8 })
          .from(".g-badge", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(".g-word > span", { yPercent: 115, duration: 0.9, stagger: 0.06 }, "-=0.4")
          .from(".g-hero-in", { y: 24, opacity: 0, duration: 0.7, stagger: 0.12 }, "-=0.5")
          .from(".g-layer", { y: 90, opacity: 0, scale: 0.9, duration: 1.1, stagger: 0.12 }, "-=0.9")
          .from(".g-chip", { scale: 0, opacity: 0, duration: 0.5, stagger: 0.1, ease: "back.out(2)" }, "-=0.4");

        // hero mouse parallax
        const hero = el.querySelector<HTMLElement>(".g-hero")!;
        const pars = gsap.utils.toArray<HTMLElement>(".g-par").map((p) => ({ d: +(p.dataset.depth ?? 1), x: gsap.quickTo(p, "x", { duration: 0.9, ease: "power3" }), y: gsap.quickTo(p, "y", { duration: 0.9, ease: "power3" }) }));
        on(hero, "pointermove", (e: PointerEvent) => {
          const r = hero.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
          pars.forEach((s) => { s.x(px * 40 * s.d); s.y(py * 30 * s.d); });
        });

        // navbar state
        const nav = el.querySelector<HTMLElement>(".g-navbar nav")!;
        ScrollTrigger.create({ trigger: document.body, start: "top -60", end: "bottom bottom", onToggle: (s) => { nav.dataset.scrolled = String(s.isActive); } });

        // scroll reveals
        gsap.utils.toArray<HTMLElement>(".g-reveal").forEach((r) => gsap.from(r, { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: r, start: "top 88%", once: true } }));
        gsap.set(".g-card", { opacity: 0, y: 50 });
        ScrollTrigger.batch(".g-card", { start: "top 90%", once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out", overwrite: true }) });

        // counters
        gsap.utils.toArray<HTMLElement>(".g-count").forEach((c) => {
          const n = +(c.dataset.n ?? 0), s = c.dataset.s ?? "", o = { v: 0 };
          c.textContent = "0" + s;
          gsap.to(o, { v: n, duration: 1.6, ease: "power2.out", scrollTrigger: { trigger: c, start: "top 92%", once: true }, onUpdate: () => { c.textContent = Math.round(o.v) + s; } });
        });

        // template marquee (pauses on hover) + 3D tilt
        const track = el.querySelector<HTMLElement>(".g-track")!;
        const loop = gsap.to(track, { xPercent: -50, duration: 45, ease: "none", repeat: -1 });
        on(track, "pointerenter", () => gsap.to(loop, { timeScale: 0, duration: 0.6 }));
        on(track, "pointerleave", () => gsap.to(loop, { timeScale: 1, duration: 0.6 }));
        gsap.utils.toArray<HTMLElement>(".g-tilt").forEach((c) => {
          on(c, "pointermove", (e: PointerEvent) => { const r = c.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5; gsap.to(c, { rotationY: px * 16, rotationX: -py * 16, y: -8, transformPerspective: 900, duration: 0.4, ease: "power2.out" }); });
          on(c, "pointerleave", () => gsap.to(c, { rotationY: 0, rotationX: 0, y: 0, duration: 0.6, ease: "power3.out" }));
        });

        // steps: progress line follows scroll
        gsap.fromTo(".g-line", { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "left center", scrollTrigger: { trigger: ".g-steps", start: "top 70%", end: "bottom 65%", scrub: true } });
        gsap.from(".g-step", { y: 40, opacity: 0, duration: 0.8, stagger: 0.18, ease: "power3.out", scrollTrigger: { trigger: ".g-steps", start: "top 80%", once: true } });

        // magnetic CTA
        const mag = el.querySelector<HTMLElement>(".g-mag");
        if (mag) {
          const qx = gsap.quickTo(mag, "x", { duration: 0.6, ease: "power3" }), qy = gsap.quickTo(mag, "y", { duration: 0.6, ease: "power3" });
          on(mag, "pointermove", (e: PointerEvent) => { const r = mag.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * 0.3); qy((e.clientY - r.top - r.height / 2) * 0.4); });
          on(mag, "pointerleave", () => { qx(0); qy(0); });
        }
        return () => cleanups.forEach((f) => f());
      });
    }, el);
    return () => ctx.revert();
  }, []);

  useEffect(() => { const id = setTimeout(() => ScrollTrigger.refresh(), 150); return () => clearTimeout(id); }, [lang]);

  const words = t.hero.h1.split(" ");
  const tplCards = (hidden: boolean) => templateIds.map((id) => (
    <Link key={id + hidden} href={`/builder?template=${id}`} aria-hidden={hidden || undefined} tabIndex={hidden ? -1 : undefined} className="g-tilt group block shrink-0 [transform-style:preserve-3d]">
      <div className="rounded-2xl ring-1 ring-white/10 transition group-hover:shadow-[0_0_60px_-5px_rgba(167,139,250,.7)]"><TemplatePaper id={id} scale={0.44} /></div>
      <p className="mt-4 text-center text-sm font-semibold text-white/90">{t.tpls[id].name}</p>
    </Link>
  ));

  return (
    <div ref={root} className="overflow-x-clip">
      <header className="g-navbar fixed inset-x-0 top-4 z-50 px-4">
        <nav data-scrolled="false" className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/70 bg-white/60 pl-5 pr-2 backdrop-blur-xl transition data-[scrolled=true]:bg-white/90 data-[scrolled=true]:shadow-xl data-[scrolled=true]:shadow-violet-200/60">
          <Logo />
          <div className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">
            {([["features", t.nav.features], ["templates", t.nav.templates], ["about", t.nav.about]] as const).map(([k, l]) => <a key={k} href={`#${k}`} className="transition hover:text-violet-600">{l}</a>)}
          </div>
          <div className="flex items-center gap-2"><LangSwitch /><Link href="/templates" className="rounded-full bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-300/50 transition hover:scale-105">{t.nav.create}</Link></div>
        </nav>
      </header>

      <section className="g-hero relative overflow-hidden pb-28 pt-36">
        <div className="absolute inset-0 [background-image:radial-gradient(#c4b5fd_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
        <div className="g-blob absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-violet-400/30 blur-3xl" />
        <div className="g-blob absolute right-[-120px] top-32 h-[460px] w-[460px] rounded-full bg-pink-400/30 blur-3xl" />
        <div className="g-blob absolute bottom-0 left-1/3 h-[340px] w-[340px] rounded-full bg-teal-300/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="g-badge inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-violet-700 backdrop-blur"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" /><span className="relative h-2 w-2 rounded-full bg-teal-500" /></span>{t.hero.badge}</p>
            <h1 className="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl">
              {words.map((w, i) => (
                <span key={i} className="g-word -mb-[.12em] mr-[.25em] inline-block overflow-hidden pb-[.12em] align-bottom">
                  <span className={`inline-block ${i >= words.length - 3 ? "g-grad bg-gradient-to-r from-violet-600 via-pink-500 to-teal-400 bg-[length:200%_100%] bg-clip-text text-transparent" : ""}`}>{w}</span>
                </span>
              ))}
            </h1>
            <p className="g-hero-in mt-6 max-w-lg text-lg text-slate-600">{t.hero.p}</p>
            <div className="g-hero-in mt-9 flex flex-wrap gap-3">
              <Link href="/templates" className={`${btn} bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-300/60 hover:-translate-y-0.5 hover:shadow-2xl`}>{t.hero.cta} <ArrowRight size={18} /></Link>
              <a href="#templates" className={`${btn} border border-violet-200 bg-white/80 text-violet-700 backdrop-blur hover:-translate-y-0.5 hover:bg-white`}>{t.hero.see}</a>
            </div>
          </div>
          <div className="relative mx-auto h-[520px] w-full max-w-[560px]">
            <div className="g-par absolute left-0 top-20" data-depth="1.4"><div className="g-layer"><div className="g-float"><TemplatePaper id="elegant" scale={0.46} /></div></div></div>
            <div className="g-par absolute right-0 top-28" data-depth="1.8"><div className="g-layer"><div className="g-float"><TemplatePaper id="bold" scale={0.46} /></div></div></div>
            <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center"><div className="g-par pointer-events-auto" data-depth="0.8"><div className="g-layer"><div className="g-float"><TemplatePaper id="modern" scale={0.6} /></div></div></div></div>
            {[{ i: CheckCircle2, c: "text-teal-500", p: "left-0 top-4", d: 2.2 }, { i: FileText, c: "text-violet-600", p: "bottom-10 right-2", d: 2.6 }, { i: Sparkles, c: "text-pink-500", p: "bottom-28 left-[-6px]", d: 2 }].map((x, k) => (
              <div key={k} className={`g-par absolute ${x.p}`} data-depth={x.d}><div className="g-chip"><div className="g-float flex items-center gap-2 rounded-2xl border border-white/80 bg-white/80 px-3.5 py-2 text-sm font-bold shadow-xl shadow-violet-200/60 backdrop-blur"><x.i size={16} className={x.c} />{t.landing.chips[k]}</div></div></div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-5xl px-5">
        <div className="g-reveal grid grid-cols-2 divide-violet-100 overflow-hidden rounded-3xl border border-violet-100 bg-white/90 shadow-xl shadow-violet-100/60 backdrop-blur md:grid-cols-4 md:divide-x">
          {t.landing.stats.map((s, i) => (
            <div key={i} className="px-6 py-7 text-center">
              <div className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-4xl font-extrabold text-transparent"><span className="g-count" data-n={s.n} data-s={s.s} /></div>
              <p className="mt-1 text-sm font-medium text-slate-500">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 py-28">
        <p className={`g-reveal ${kicker}`}>{t.landing.featKicker}</p>
        <h2 className="g-reveal mt-3 max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">{t.feat.title}</h2>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {featureStyle.map(({ icon: I, c, bg, span }, i) => (
            <div key={i} className={`g-card group relative overflow-hidden rounded-3xl border border-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-200/60 ${bg} ${span}`}>
              <div className={`absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${c} opacity-20 blur-2xl transition group-hover:opacity-50`} />
              <span className={`relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c} text-white shadow-lg transition group-hover:rotate-6 group-hover:scale-110`}><I size={22} /></span>
              <h3 className="relative mt-10 text-xl font-bold">{t.feat.items[i].t}</h3><p className="relative mt-1.5 max-w-sm text-slate-600">{t.feat.items[i].d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="templates" className="relative overflow-hidden bg-slate-950 py-28 text-white">
        <div className="g-blob absolute left-[10%] top-0 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="g-blob absolute bottom-0 right-[10%] h-96 w-96 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-5">
          <p className={`g-reveal ${kicker} !text-violet-300`}>{t.landing.tplKicker}</p>
          <h2 className="g-reveal mt-3 max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">{t.tplTitle}</h2>
          <p className="g-reveal mt-3 text-slate-400">{t.landing.tplSub}</p>
        </div>
        <div className="relative mt-14 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <div className="g-track flex w-max gap-8 px-4 py-6">{tplCards(false)}{tplCards(true)}</div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-5 py-28">
        <p className={`g-reveal ${kicker}`}>{t.landing.stepsKicker}</p>
        <h2 className="g-reveal mt-3 max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">{t.steps.title}</h2>
        <ol className="g-steps relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-8 hidden h-0.5 bg-violet-100 md:block"><div className="g-line h-full bg-gradient-to-r from-violet-500 to-pink-500" /></div>
          {t.steps.items.map((s, i) => (
            <li key={i} className="g-step relative flex flex-col items-center rounded-3xl border border-violet-100 bg-white p-7 text-center shadow-sm">
              <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-pink-500 text-2xl font-extrabold text-white shadow-xl shadow-violet-300/60 ring-8 ring-white">{i + 1}</span>
              <h3 className="mt-5 text-xl font-bold">{s.t}</h3><p className="mt-1.5 text-slate-600">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="px-5 pb-24">
        <div className="g-reveal relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-violet-600 via-indigo-600 to-pink-500 px-8 py-20 text-center text-white">
          <div className="g-blob absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
          <div className="g-blob absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-teal-300/30 blur-3xl" />
          <h2 className="relative mx-auto max-w-2xl text-4xl font-extrabold tracking-tight md:text-5xl">{t.ctaTitle}</h2>
          <p className="relative mx-auto mt-4 max-w-md text-violet-100">{t.landing.ctaSub}</p>
          <div className="relative mt-9 inline-block"><Link href="/templates" className={`g-mag ${btn} bg-white text-violet-700 shadow-2xl hover:bg-violet-50`}>{t.hero.cta} <ArrowRight size={18} /></Link></div>
        </div>
      </section>

      <footer className="border-t border-violet-100 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 text-sm text-slate-500"><Logo /><span>{t.foot}</span></div>
      </footer>
    </div>
  );
}
