import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'CVForge — Build your professional CV', description: 'Create a professional CV in minutes. No registration required.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
