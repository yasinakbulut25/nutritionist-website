import Link from "next/link";
import { Home, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "@/utils/constants";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "404 — Sayfa Bulunamadı",
};

export default function NotFound() {
  return (
    <main className="relative min-h-dvh bg-slate-50 flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-violet-200 rounded-full blur-3xl opacity-40" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-violet-300 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-100 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        <div className="relative mb-6 select-none">
          <span className="text-[10rem] sm:text-[14rem] font-black leading-none bg-gradient-to-br from-violet-900 via-violet-400 to-violet-900 bg-clip-text text-transparent">
            404
          </span>
          <span className="absolute top-4 -right-4 sm:-right-8 bg-gradient-to-tr from-violet-700 via-violet-400 to-violet-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg rotate-12">
            Kayıp!
          </span>
        </div>

        <div className="flex items-center gap-3 w-full mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-700 to-violet-400 flex items-center justify-center shadow-md shadow-violet-200">
            <span className="text-white text-sm">🥗</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-300 to-transparent" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
          Bu sayfa bulunamadı
        </h1>

        <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-10 max-w-sm">
          Aradığınız sayfa taşınmış, silinmiş ya da hiç var olmamış olabilir.
          Ana sayfaya dönerek devam edebilirsiniz.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-tr from-violet-700 via-violet-400 to-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-200 hover:scale-105 transition-transform duration-200"
          >
            <Home className="w-4 h-4" />
            Ana Sayfaya Dön
          </Link>

          <Link
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-tr from-green-700 via-green-500 to-green-400 text-white text-sm font-semibold shadow-lg shadow-green-100 hover:scale-105 transition-transform duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp&apos;tan Ulaşın
          </Link>
        </div>

        <BackButton />
      </div>
    </main>
  );
}
