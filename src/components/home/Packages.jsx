import DOMPurify from "isomorphic-dompurify";
import { Sparkles, Zap, Crown } from "lucide-react";
import Link from "next/link";
import Container from "../Container";
import TitleWithDesc from "../TitleWithDesc";
import ButtonCustom from "../buttons/ButtonCustom";
import { WHATSAPP_URL } from "@/utils/constants";
import { PackagesService } from "@/services/packages.service";

const packagesStyles = {
  1: {
    icon: Sparkles,
    iconStyles: {
      bg: "bg-white shadow",
      color: "text-teal-500",
    },
    buttonStyles:
      "bg-teal-100/50 text-teal-500 hover:bg-teal-100 border-2 border-teal-200",
    bgGradient: "from-teal-100 to-white",
    borderColor: "border-teal-200",
  },
  2: {
    icon: Zap,
    iconStyles: {
      bg: "bg-white shadow",
      color: "text-violet-500",
    },
    buttonStyles:
      "bg-violet-50 text-violet-600 hover:bg-violet-100 border-2 border-violet-200",
    bgGradient: "from-violet-400 to-white",
    borderColor: "border-violet-400",
  },
  3: {
    icon: Crown,
    iconStyles: {
      bg: "bg-white shadow",
      color: "text-amber-500",
    },
    buttonStyles:
      "bg-amber-50 text-amber-500 hover:bg-amber-100 border-2 border-amber-200",
    bgGradient: "from-amber-100 to-white",
    borderColor: "border-amber-300",
  },
};

async function Packages() {
  const data = await PackagesService.getAll();

  if (!data) return;

  return (
    <div className="py-8 bg-white">
      <Container>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TitleWithDesc
            title="Size Uygun Paketi Seçin"
            subTitle="Paketlerimiz"
            desc="İhtiyaçlarınıza göre tasarlanmış esnek paketlerimizle sağlıklı yaşam yolculuğunuza bugün başlayın"
          />
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 lg:gap-6">
            {data.map((pkg) => {
              const packageStyle = packagesStyles[pkg.id];
              const Icon = packageStyle.icon;
              const IconStyles = packageStyle.iconStyles;

              return (
                <div
                  key={pkg.id}
                  className={`relative max-w-[400px] mx-auto rounded-2xl border-2 ${packageStyle.borderColor} overflow-hidden transition-all duration-300 hover:shadow-sm hover:-translate-y-2`}
                >
                  <div
                    className={`bg-gradient-to-b ${packageStyle.bgGradient} p-8`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full flex flex-shrink-0 items-center justify-center ${IconStyles.bg}`}
                      >
                        <Icon
                          width={24}
                          height={24}
                          className={IconStyles.color}
                        />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 capitalize">
                        {pkg.baslik}
                      </h3>
                    </div>
                  </div>

                  <div className="p-8 bg-white">
                    <div
                      className="online-diet-desc flex flex-col gap-2 mb-6"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(pkg.icerik),
                      }}
                    />

                    <ButtonCustom
                      as={Link}
                      href={WHATSAPP_URL}
                      className={`w-full py-4 px-6 h-auto rounded-xl font-medium text-base transition-all duration-300 ${packageStyle.buttonStyles}`}
                    >
                      {pkg.link_adi}
                    </ButtonCustom>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 text-sm">
              Tüm paketlerimizde{" "}
              <span className="font-semibold text-violet-600">
                ilk görüşme ücretsizdir
              </span>
              . Sorularınız için bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Packages;
