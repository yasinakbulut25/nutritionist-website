import Image from "next/image";
import Container from "@/components/Container";
import GorusForm from "@/components/goruslerinizi-iletin/GorusForm";
import Testimonials from "@/components/home/Testimonials";
import { buildMeta } from "@/lib/seo";

export const metadata = {
  ...buildMeta({
    title: "Görüşünüzü İletin | Diyetisyen Gizem Akbulut Öztürk",
    description:
      "Beslenme danışmanlığı sürecindeki deneyiminizi paylaşın. Görüşleriniz diğer danışanlara ilham olacak.",
    path: "/goruslerinizi-iletin",
  }),
  keywords: [
    "diyet deneyimi paylaş",
    "beslenme danışmanlığı yorum",
    "diyetisyen görüş bırak",
  ],
  robots: { index: false, follow: true },
};

export default function GoruslerinizIletinPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-slate-50 border-b border-slate-100">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl bg-violet-200/35" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-80 h-80 rounded-full blur-3xl bg-violet-100/50" />

        <Container className="!pt-36 !pb-14 relative">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
              Deneyiminizi Paylaşın
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Görüşünüzü{" "}
              <span className="bg-gradient-to-b from-violet-400 to-violet-800 bg-clip-text text-transparent">
                İletin
              </span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed text-balance">
              Danışmanlık sürecindeki deneyiminizi benimle ve diğer
              danışanlarımla paylaşın. Görüşleriniz çok değerli.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 md:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Deneyiminizi Yazın
              </h2>
              <p className="text-slate-500 text-sm">
                Görüşünüz onaylandıktan sonra site üzerinde yayınlanacaktır.
              </p>
            </div>
            <GorusForm />
          </div>

          <div className="flex flex-col items-center justify-center gap-6 lg:py-4">
            <Image
              src="/images/mesaj.svg"
              alt="Görüş İlet"
              width={420}
              height={420}
              className="w-full max-w-xs md:max-w-sm h-auto"
              priority
            />
            <div className="flex flex-col gap-3 w-full max-w-sm">
              {[
                "Gerçek kişilerden gerçek deneyimler",
                "Her görüş benim için değerli",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-100 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-gradient-to-br from-violet-500 to-violet-400 flex-shrink-0" />
                  <span className="text-sm text-slate-600 font-medium">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      <Testimonials />
    </main>
  );
}
