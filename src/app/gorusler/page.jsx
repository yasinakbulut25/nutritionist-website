import Container from "@/components/Container";
import GoruslerGrid from "@/components/gorusler/GoruslerGrid";

export const metadata = {
  title: "Görüşler | Diyetisyen Gizem Akbulut",
  description:
    "Danışanlarımın deneyimleri ve başarı hikayeleri. Gerçek kişilerden gerçek sonuçlar.",
};

export default function GoruslerPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-slate-50 border-b border-slate-100">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-3xl bg-violet-200/35 z-10" />
        <div className="pointer-events-none absolute -bottom-20 right-0 w-80 h-80 rounded-full blur-3xl bg-violet-100/50 z-10" />

        <Container className="!pt-36 !pb-14 relative z-20">
          <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
            <span className="text-violet-600 font-semibold text-sm uppercase tracking-widest">
              Başarı Hikayeleri
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              Danışan{" "}
              <span className="bg-gradient-to-b from-violet-400 to-violet-800 bg-clip-text text-transparent">
                Görüşleri
              </span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Gerçek kişilerden, gerçek deneyimler. Danışanlarımın kendi
              sözleriyle anlattığı değişim hikayeleri.
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <GoruslerGrid />
      </Container>
    </main>
  );
}
