import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Home,
  Heart,
  Baby,
  Apple,
  Users,
  ArrowRight,
} from "lucide-react";
import { OnlineDiyetService } from "@/services/onlineDiyet.service";
import Container from "@/components/Container";
import Packages from "@/components/home/Packages";
import Testimonials from "@/components/home/Testimonials";
import ButtonWhatsapp from "@/components/buttons/ButtonWhatsapp";

import { buildMeta } from "@/lib/seo";

export const metadata = {
  ...buildMeta({
    title: "Online Diyet Danışmanlığı | Kişiye Özel Program",
    description:
      "Aç kalmadan, kişiye özel online beslenme programı. Haftalık WhatsApp takibi ile sürdürülebilir diyet. Paketleri inceleyin ve hemen başlayın.",
    path: "/online-diyet",
  }),
  keywords: [
    "online diyet",
    "online beslenme danışmanlığı",
    "kişiye özel diyet programı",
    "WhatsApp diyet takibi",
    "uzaktan beslenme danışmanlığı",
    "sürdürülebilir diyet",
  ],
};

const targetIcons = [Briefcase, Home, Users, Heart, Baby, Apple];

function decodeHtmlEntities(str) {
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&ccedil;/g, "ç")
    .replace(/&Ccedil;/g, "Ç")
    .replace(/&ouml;/g, "ö")
    .replace(/&Ouml;/g, "Ö")
    .replace(/&uuml;/g, "ü")
    .replace(/&Uuml;/g, "Ü")
    .replace(/&iacute;/g, "ı")
    .replace(/&ğ;/g, "ğ")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&#[0-9]+;/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function parseListItems(html) {
  const matches = html.match(/<li>([\s\S]*?)<\/li>/gi) || [];
  return matches.map((li) => decodeHtmlEntities(li)).filter(Boolean);
}

export default async function OnlineDiyetPage() {
  const [shortData, longData] = await Promise.all([
    OnlineDiyetService.getShortData(),
    OnlineDiyetService.getLongData(),
  ]);

  const targetItems = parseListItems(shortData.icerik);

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-slate-50 border-b border-slate-100">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl bg-violet-200/35 z-10" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-80 h-80 rounded-full blur-3xl bg-violet-100/50 z-10" />

        <Container className="!pt-36 !pb-16 relative z-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-5">
              <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
                Beslenme Danışmanlığı
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Online{" "}
                <span className="bg-gradient-to-b from-violet-400 to-violet-800 bg-clip-text text-transparent">
                  Diyet
                </span>{" "}
                Danışmanlığı
              </h1>
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg">
                Aç kalmadan, sürdürülebilir bir şekilde sağlıklı beslenin.
                Kişiye özel program ve haftalık WhatsApp desteği ile
                yanınızdayım.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <ButtonWhatsapp>Hemen Başlayalım</ButtonWhatsapp>
                <Link
                  href="#paketler"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-violet-300 bg-white text-violet-700 text-sm font-semibold hover:bg-violet-50 transition-colors duration-200"
                >
                  Paketleri Gör
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="md:flex hidden justify-center lg:justify-end">
              <Image
                src="/images/online-diyet.svg"
                alt="Online Diyet"
                width={420}
                height={420}
                className="w-full max-w-sm lg:max-w-md h-auto"
                priority
              />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="text-center mb-10">
          <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest block mb-3">
            Kimler İçin?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Online Danışmanlık Kime Uygun?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {targetItems.map((item, i) => {
            const Icon = targetIcons[i % targetIcons.length];
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-violet-600" />
                </div>
                <p className="text-slate-700 font-medium text-sm leading-snug pt-2">
                  {item}
                </p>
              </div>
            );
          })}
        </div>
      </Container>

      <Container>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            <span className="bg-gradient-to-br from-violet-700 via-violet-400 to-violet-700 bg-clip-text text-transparent">
              Online Beslenme Danışmanlığı Hakkında
            </span>
          </h2>
          <div
            className="online-diet-desc text-slate-600 text-base leading-relaxed
              [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:my-4 [&_ul]:pl-1
              [&_li]:flex [&_li]:items-start [&_li]:gap-2 [&_li]:text-slate-600
              [&_li]:before:content-['✓'] [&_li]:before:text-violet-500 [&_li]:before:font-bold [&_li]:before:mt-0.5 [&_li]:before:flex-shrink-0
              [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-800 [&_h2]:mt-8 [&_h2]:mb-4
              [&_strong]:font-semibold [&_strong]:text-slate-800
              [&_a]:text-violet-600 [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(longData.icerik),
            }}
          />
        </div>
      </Container>

      <Packages />
      <Testimonials />
    </main>
  );
}
