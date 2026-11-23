'use client';
import { create } from 'zustand';
import { CVData, emptyCV } from '@/types/cv';
type Store = { cv: CVData; hydrated: boolean; setCV: (cv: CVData) => void; update: (patch: Partial<CVData>) => void; setHydrated: (v: boolean) => void; reset: () => void };
export const useCVStore = create<Store>((set) => ({
  cv: emptyCV, hydrated: false,
  setCV: (cv) => set({ cv }),
  update: (patch) => set((s) => ({ cv: { ...s.cv, ...patch } })),
  setHydrated: (hydrated) => set({ hydrated }),
  reset: () => set({ cv: emptyCV })
}));
