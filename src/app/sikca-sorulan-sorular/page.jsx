import { MessageCircleMore } from "lucide-react";
import { SssService } from "@/services/sss.service";
import Container from "@/components/Container";
import SssAccordion from "@/components/sss/SssAccordion";
import ButtonWhatsapp from "@/components/buttons/ButtonWhatsapp";

export const metadata = {
  title: "Sıkça Sorulan Sorular | Diyetisyen Gizem Akbulut",
  description:
    "Online diyet danışmanlığı hakkında merak ettiğiniz soruların cevapları.",
};

export default async function SikcaSorulanSorularPage() {
  const items = await SssService.getAll();

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-slate-50 border-b border-slate-100">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl bg-violet-200/35" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-80 h-80 rounded-full blur-3xl bg-violet-100/50" />

        <Container className="!pt-36 !pb-14 relative">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
              Merak Ettikleriniz
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Sıkça Sorulan{" "}
              <span className="bg-gradient-to-b from-violet-400 to-violet-800 bg-clip-text text-transparent">
                Sorular
              </span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Online diyet danışmanlığı hakkında en çok merak edilen soruları ve
              cevaplarını burada bulabilirsiniz.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="max-w-3xl mx-auto">
          <SssAccordion items={items} />
        </div>
      </Container>

      <Container className="!pt-0">
        <div className="max-w-3xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-violet-800 p-8 md:p-10 text-center">
            <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />

            <div className="relative flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <MessageCircleMore className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Sorunuzun Cevabını Bulamadınız mı?
              </h2>
              <p className="text-violet-200 max-w-md text-balance">
                Aklınızdaki soruyu doğrudan iletebilirsiniz. En kısa sürede
                yanıt vereceğim.
              </p>
              <ButtonWhatsapp className="mt-2">
                Soru Sormak İstiyorum
              </ButtonWhatsapp>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
