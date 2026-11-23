import type { Config } from 'tailwindcss';
const config: Config = { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { ink: '#1E293B', accent: '#2563EB', paper: '#F8FAFC' }, boxShadow: { soft: '0 12px 40px rgba(15,23,42,.07)' } } }, plugins: [] };
export default config;
