import "./globals.css";
import { Plus_Jakarta_Sans, Poppins, Inter } from "next/font/google";
import { LangProvider } from "@/lib/lang";
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-poppins" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const metadata = { title: "Kerja CV — Modern CV Builder", description: "Build a clean, ATS-ready CV in minutes." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${sans.variable} ${poppins.variable} ${inter.variable} font-sans antialiased`}><LangProvider>{children}</LangProvider></body></html>;
}
