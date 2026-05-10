import SafeHtml from "@/components/SafeHtml";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Globe, Award, Users } from "lucide-react";
import { Instagram as InstagramIcon } from "react-bootstrap-icons";
import { HakkimdaService } from "@/services/hakkimda.service";
import { INSTAGRAM_URL } from "@/utils/constants";
import Container from "@/components/Container";
import ButtonWhatsapp from "@/components/buttons/ButtonWhatsapp";
import ButtonPrimary from "@/components/buttons/ButtonPrimary";
import { buildMeta, SITE_URL, AUTHOR_NAME } from "@/lib/seo";

export const metadata = {
  ...buildMeta({
    title: "Hakkımda | Diyetisyen Gizem Akbulut Öztürk",
    description:
      "Ondokuz Mayıs Üniversitesi Beslenme ve Diyetetik mezunu, Erasmus+ İtalya stajyeri ve 500+ danışanlı online diyetisyen Gizem Akbulut Öztürk hakkında bilgi edinin.",
    path: "/hakkimda",
  }),
  keywords: [
    "Gizem Akbulut diyetisyen",
    "diyetisyen hakkımda",
    "Ondokuz Mayıs Üniversitesi beslenme",
    "online diyetisyen Türkiye",
    "beslenme ve diyetetik uzmanı",
    "Gizem Akbulut Öztürk diyetisyen",
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/hakkimda#person`,
  name: AUTHOR_NAME,
  jobTitle: "Diyetisyen",
  url: `${SITE_URL}/hakkimda`,
  image: `${SITE_URL}/profile.png`,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Ondokuz Mayıs Üniversitesi",
    department: "Beslenme ve Diyetetik",
  },
  sameAs: ["https://www.instagram.com/dyt.gizemakbulut/"],
  worksFor: { "@id": `${SITE_URL}/#organization` },
};

const highlights = [
  {
    icon: GraduationCap,
    label: "Ondokuz Mayıs Üniversitesi",
    sub: "Beslenme ve Diyetetik",
  },
  {
    icon: Globe,
    label: "Erasmus+ Staj",
    sub: "Brescia Üniversitesi, İtalya",
  },
  {
    icon: Users,
    label: "500+ Danışan",
    sub: "Online Beslenme Danışmanlığı",
  },
  {
    icon: InstagramIcon,
    label: "110K+ Takipçi",
    sub: "@dyt.gizemakbulut",
  },
];

function parseCertificates(html) {
  return html
    .split(/<br\s*\/?>/gi)
    .map((line) => {
      const text = line
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&ccedil;/g, "ç")
        .replace(/&ouml;/g, "ö")
        .replace(/&uuml;/g, "ü")
        .replace(/&iacute;/g, "ı")
        .replace(/&Uuml;/g, "Ü")
        .replace(/&Ccedil;/g, "Ç")
        .replace(/&rsquo;/g, "'")
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"')
        .replace(/&amp;/g, "&")
        .replace(/&#[0-9]+;/g, "")
        .trim();
      return text;
    })
    .filter((t) => t.length > 2);
}

export default async function HakkimdaPage() {
  const { bio, sertifikalar } = await HakkimdaService.getAll();

  const certificates = parseCertificates(sertifikalar.icerik);

  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-slate-50 border-b border-slate-100">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-3xl bg-violet-200/40 z-10" />
        <div className="pointer-events-none absolute -bottom-24 right-0 w-96 h-96 rounded-full blur-3xl bg-violet-100/60 z-10" />

        <Container className="!pb-20 !pt-40 relative z-20">
          <div className="relative flex flex-col md:flex-row items-center gap-10">
            <div className="flex-shrink-0">
              <div className="relative w-44 h-44 md:w-56 md:h-56">
                <div className="relative w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden bg-violet-100">
                  <Image
                    src="/profile.png"
                    alt="Diyetisyen Gizem Akbulut Öztürk"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
              <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
                Diyetisyen
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                Gizem Akbulut Öztürk
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
                <ButtonWhatsapp>Hemen Başlayalım</ButtonWhatsapp>

                <ButtonPrimary
                  as={Link}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  aria-label="Instagram"
                >
                  Takip Edin
                  <InstagramIcon />
                </ButtonPrimary>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="!pt-10 !pb-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-violet-50">
                <Icon className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <p className="font-semibold text-slate-800 text-sm leading-snug">
                  {label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <Container className="xl:!px-4 !px-0">
        <div className="bg-white xl:rounded-2xl border border-slate-100 shadow-sm sm:p-8 md:p-12 py-6 px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            <span className="bg-gradient-to-br from-violet-700 via-violet-400 to-violet-700 bg-clip-text text-transparent">
              {bio.baslik}
            </span>
          </h2>
          <SafeHtml
            html={bio.icerik}
            className="hakkimda-bio text-slate-600 text-base md:text-lg leading-relaxed [&_h2]:text-slate-800 [&_h2]:font-semibold [&_h2]:text-xl [&_h2]:mt-6 [&_p]:mb-4"
          />
        </div>
      </Container>

      <Container className="!pt-0 xl:!px-4 !px-0">
        <div className="bg-white xl:rounded-2xl border border-slate-100 shadow-sm sm:p-8 md:p-12 py-6 px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            <span className="bg-gradient-to-br from-violet-700 via-violet-400 to-violet-700 bg-clip-text text-transparent">
              {sertifikalar.baslik}
            </span>
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certificates.map((cert, i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-violet-50/60 border border-violet-100 hover:bg-violet-50 hover:border-violet-200 transition-colors duration-150"
              >
                <span className="text-base mt-0.5 flex-shrink-0">
                  <Award className="text-indigo-500" width={24} height={24} />
                </span>
                <span className="text-base text-slate-700 font-medium leading-snug">
                  {cert.replace(/^📑\s*/, "")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </main>
  );
}
