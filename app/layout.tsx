import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google";
import { LangProvider } from "@/lib/lang";
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
export const metadata = { title: "Kerja CV — Modern CV Builder", description: "Build a clean, ATS-ready CV in minutes." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${sans.variable} font-sans antialiased`}><LangProvider>{children}</LangProvider></body></html>;
}
