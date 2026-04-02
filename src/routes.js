import { Home, User, Briefcase, BookOpen, Utensils, Mail } from "lucide-react";

export const routes = [
  {
    text: "Ana Sayfa",
    href: "/",
    type: "link",
    icon: Home,
  },
  {
    text: "Hakkımda",
    href: "/hakkimda",
    type: "link",
    icon: User,
  },
  {
    text: "Hizmetler",
    href: "/hizmetler",
    type: "dropdown",
    icon: Briefcase,
    submenu: [
      {
        text: "Beslenme Danışmanlığı",
        href: "/hizmetler/beslenme-danismanligi",
        description: "Kişiye özel beslenme programları",
      },
      {
        text: "Diyet Programları",
        href: "/hizmetler/diyet-programlari",
        description: "Hedef odaklı diyet planları",
      },
      {
        text: "Spor Beslenmesi",
        href: "/hizmetler/spor-beslenmesi",
        description: "Sporcular için özel programlar",
      },
      {
        text: "Online Danışmanlık",
        href: "/hizmetler/online-danismanlik",
        description: "Uzaktan beslenme takibi",
      },
    ],
  },
  {
    text: "Blog",
    href: "/blog",
    type: "link",
    icon: BookOpen,
  },
  {
    text: "Tarifler",
    href: "/tarifler",
    type: "dropdown",
    icon: Utensils,
    submenu: [
      {
        text: "Kahvaltı Tarifleri",
        href: "/tarifler/kahvalti",
        description: "Sağlıklı kahvaltı fikirleri",
      },
      {
        text: "Ana Yemek",
        href: "/tarifler/ana-yemek",
        description: "Fit ana yemek tarifleri",
      },
      {
        text: "Tatlılar",
        href: "/tarifler/tatlilar",
        description: "Şekersiz ve sağlıklı tatlılar",
      },
      {
        text: "Atıştırmalıklar",
        href: "/tarifler/atistirmaliklar",
        description: "Pratik atıştırmalık önerileri",
      },
    ],
  },
  {
    text: "İletişim",
    href: "/iletisim",
    type: "link",
    icon: Mail,
  },
];
