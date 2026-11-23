'use client';
import dynamic from 'next/dynamic';
import { CVData } from '@/types/cv';
const PDFButton = dynamic(() => import('./PDFRenderer'), { ssr: false, loading: () => <button className="btn-primary" disabled>Preparing PDF…</button> });
export default function PDFDownload({ cv }: { cv: CVData }) { return <PDFButton cv={cv}/>; }
