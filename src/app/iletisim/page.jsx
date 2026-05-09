import Image from "next/image";
import Link from "next/link";
import { Instagram as InstagramIcon } from "react-bootstrap-icons";
import { Whatsapp } from "react-bootstrap-icons";
import Container from "@/components/Container";
import IletisimForm from "@/components/iletisim/IletisimForm";
import { INSTAGRAM_URL, WHATSAPP_URL } from "@/utils/constants";
import SssAccordion from "@/components/sss/SssAccordion";

import { buildMeta } from "@/lib/seo";

export const metadata = {
  ...buildMeta({
    title: "İletişim | Diyetisyen Gizem Akbulut Öztürk",
    description:
      "Online diyet danışmanlığı için WhatsApp veya iletişim formu aracılığıyla ulaşın. En kısa sürede yanıt verilir.",
    path: "/iletisim",
  }),
  keywords: [
    "diyetisyen iletişim",
    "online diyet randevu",
    "beslenme danışmanlığı WhatsApp",
    "diyetisyen Gizem Akbulut iletişim",
    "diyetisyen Gizem Akbulut Öztürk iletişim",
  ],
};

const contacts = [
  {
    icon: Whatsapp,
    label: "WhatsApp",
    value: "+90 542 623 39 96",
    href: WHATSAPP_URL,
    color: "bg-green-50 text-green-600",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: "@dyt.gizemakbulut",
    href: INSTAGRAM_URL,
    color: "bg-pink-50 text-pink-500",
  },
];

export default function IletisimPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-slate-50 border-b border-slate-100">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl bg-violet-200/35" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-80 h-80 rounded-full blur-3xl bg-violet-100/50" />

        <Container className="!pt-36 !pb-14 relative">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
              Bize Ulaşın
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              İletişime{" "}
              <span className="bg-gradient-to-b from-violet-400 to-violet-800 bg-clip-text text-transparent">
                Geçin
              </span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Sorularınız, randevu talepleriniz veya herhangi bir konuda benimle
              iletişime geçebilirsiniz.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col items-center gap-8">
            <Image
              src="/images/mail.svg"
              alt="İletişim"
              width={420}
              height={420}
              className="w-full max-w-xs md:max-w-sm h-auto"
              priority
            />

            <div className="flex flex-col gap-3 w-full max-w-sm">
              {contacts.map(({ icon: Icon, label, value, href, color }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      {label}
                    </p>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-violet-700 transition-colors">
                      {value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Mesaj Gönderin
              </h2>
              <p className="text-slate-500 text-sm">
                En kısa sürede size dönüş sağlayacağım.
              </p>
            </div>
            <IletisimForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
