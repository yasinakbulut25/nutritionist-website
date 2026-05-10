import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { routes } from "@/routes";
import { WHATSAPP_URL, INSTAGRAM_URL } from "@/utils/constants";
import { Instagram, Whatsapp } from "react-bootstrap-icons";

const quickLinks = routes.flatMap((route) => {
  if (route.type === "dropdown" && route.submenu) {
    return route.submenu.map((item) => ({ text: item.text, href: item.href }));
  }
  return [{ text: route.text, href: route.href }];
});

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-violet-950 via-violet-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5 w-fit">
              <div className="bg-white p-2 rounded-xl ">
                <Image
                  width={36}
                  height={36}
                  src="/logo.svg"
                  alt="Dyt. Gizem Akbulut Öztürk"
                />
              </div>
              <span className="text-xl font-semibold text-white">
                Dyt. Gizem Akbulut Öztürk
              </span>
            </Link>
            <p className="text-violet-200 text-sm leading-relaxed mb-6 max-w-sm">
              Kişiye özel online beslenme danışmanlığı ile sağlıklı ve
              sürdürülebilir bir yaşam tarzı edinmenize yardımcı oluyorum.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 hover:bg-violet-500 hover:border-violet-400 transition-all duration-200 hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 hover:bg-green-500 hover:border-green-400 transition-all duration-200 hover:scale-110"
              >
                <Whatsapp className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 pb-2 border-b border-violet-700/50">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-violet-200 hover:text-white text-sm transition-colors duration-150 hover:translate-x-1 inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-400 group-hover:bg-violet-300 transition-colors" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-5 pb-2 border-b border-violet-700/50">
              İletişim
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="tel:+905426233996"
                  className="flex items-center gap-3 text-violet-200 hover:text-white text-sm transition-colors duration-150 group"
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 border border-white/10 group-hover:bg-violet-500/30 transition-colors mt-0.5">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span>+90 542 623 39 96</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="flex items-center gap-3 text-violet-200 hover:text-white text-sm transition-colors duration-150 group"
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 border border-white/10 group-hover:bg-violet-500/30 transition-colors mt-0.5">
                    <Mail className="w-4 h-4" />
                  </span>
                  <span>İletişim Formu</span>
                </Link>
              </li>
              <li>
                <div className="flex items-center gap-3 text-violet-200 text-sm">
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 border border-white/10 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span>Küçükçekmece / Florya, İstanbul</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-violet-800/50 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-violet-400">
          <p>
            &copy; {currentYear} Dyt. Gizem Akbulut Öztürk. Tüm hakları
            saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <p>
              Geliştirici:{" "}
              <Link
                href="https://yasinakbulut.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-violet-300 hover:text-white transition-colors duration-150"
              >
                Yasin Akbulut
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
