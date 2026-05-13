import { buildMeta } from "@/lib/seo";
import JotFormEmbed from "./JotFormEmbed";

export const metadata = {
  ...buildMeta({
    title: "Online Diyet Başvuru Formu | Diyetisyen Gizem Akbulut Öztürk",
    description:
      "Online diyet programına başvurun. Kişisel bilgilerinizi ve hedeflerinizi paylaşın, size özel beslenme programı oluşturalım.",
    path: "/online-diyet-form",
  }),
  keywords: [
    "online diyet başvuru",
    "diyet formu",
    "beslenme danışmanlığı başvur",
    "online diyetisyen kayıt",
  ],
};

export default function OnlineDiyetFormPage() {
  return (
    <main className="bg-white min-h-screen">
      <JotFormEmbed />
    </main>
  );
}
