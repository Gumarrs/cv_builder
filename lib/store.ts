"use client";
import { useEffect, useState } from "react";
import type { CV, TemplateId } from "./types";
import { emptyCV, getSample, templateIds } from "./data";
import { readLang } from "./i18n";
const KEY = "cvb:v1";
const isTpl = (x: unknown): x is TemplateId => templateIds.includes(x as TemplateId);
export function useCVStore() {
  const [cv, setCv] = useState<CV>(emptyCV);
  const [template, setTemplate] = useState<TemplateId>("modern");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let c: CV | null = null; let t: unknown = null;
    try { const raw = localStorage.getItem(KEY); if (raw) { const d = JSON.parse(raw); if (d?.cv) c = { ...emptyCV, ...d.cv }; t = d?.template; } } catch {}
    const q = new URLSearchParams(window.location.search).get("template");
    if (isTpl(q)) t = q;
    setCv(c ?? getSample(readLang()));
    if (isTpl(t)) setTemplate(t);
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ cv, template })); } catch {}
  }, [cv, template, ready]);
  return { cv, setCv, template, setTemplate, ready, reset: () => setCv(emptyCV) };
}
