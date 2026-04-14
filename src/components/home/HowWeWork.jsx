import Container from "../Container";
import { MessageSquare, ClipboardList, TrendingUp, Target } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "İlk İletişim",
    description:
      "WhatsApp veya e-posta üzerinden ulaşın. Sağlık durumunuzu, hedeflerinizi ve alışkanlıklarınızı konuşalım.",
    icon: MessageSquare,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 2,
    title: "Kişisel Analiz",
    description:
      "Yaşam tarzınıza, hastalıklarınıza ve tercihlerinize göre size özel bir beslenme programı oluşturayım.",
    icon: ClipboardList,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    id: 3,
    title: "Haftalık Takip",
    description:
      "Her hafta programınız güncellenir. WhatsApp üzerinden sürekli iletişimde kalarak sizi destekliyorum.",
    icon: TrendingUp,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    id: 4,
    title: "Kalıcı Sonuç",
    description:
      "Sadece kilo vermekle kalmayın, doğru beslenmeyi öğrenerek bu süreci alışkanlığa dönüştürün.",
    icon: Target,
    bgColor: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];

function HowWeWork() {
  return (
    <Container>
      {/* Section Header */}
      <div className="text-center mb-12 md:mb-16">
        <span className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-4 block">
          Nasıl Çalışıyoruz?
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
          4 Adımda Hedefinize Ulaşın
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Basit ve etkili sürecimizle sağlıklı yaşam yolculuğunuza başlayın
        </p>
      </div>

      <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 lg:gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.id} className="flex flex-col gap-6">
              <div className="relative w-full border-t border-dashed border-slate-300">
                <div className="w-10 bg-slate-50 h-8 absolute top-1/2 left-0 transform -translate-y-1/2">
                  <span className="bg-violet-100 text-violet-600 w-8 h-8 text-base flex items-center justify-center rounded-full">
                    {String(step.id)}
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 w-full rounded-xl overflow-hidden flex flex-col gap-3 transition-all duration-300 border border-slate-100 group">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${step.bgColor} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon width={22} height={22} className={step.iconColor} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}

export default HowWeWork;
