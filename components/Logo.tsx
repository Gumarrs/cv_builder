import Link from "next/link";
import { FileText } from "lucide-react";
export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-lg font-extrabold tracking-tight">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-violet-600 to-pink-500 text-white"><FileText size={18} /></span>Kerja CV
    </Link>
  );
}
