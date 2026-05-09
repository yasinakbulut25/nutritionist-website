import {
  User,
  Briefcase,
  Mail,
  Video,
  Salad,
  ScanHeart,
  UtensilsCrossed,
  Search,
  CircleQuestionMark,
  MessageCircleMore,
} from "lucide-react";

export const routes = [
  {
    text: "Hakkımda",
    href: "/hakkimda",
    type: "link",
    icon: User,
  },
  {
    text: "Eğitim Videoları",
    href: "https://egitim.diyetisyengizemakbulut.com/",
    type: "link",
    icon: Video,
  },
  {
    text: "Online Diyet",
    href: "/online-diyet",
    type: "link",
    icon: ScanHeart,
  },
  {
    text: "Yazılarım",
    href: "/yazilarim",
    type: "dropdown",
    icon: Briefcase,
    submenu: [
      {
        text: "Beslenme",
        href: "/kategoriler/beslenme",
        icon: Salad,
      },
      {
        text: "Tarifler",
        href: "/kategoriler/tarifler",
        icon: UtensilsCrossed,
      },
      {
        text: "Araştırma",
        href: "/kategoriler/arastirma",
        icon: Search,
      },
      {
        text: "Nedir",
        href: "/kategoriler/nedir",
        icon: CircleQuestionMark,
      },
    ],
  },
  // {
  //   text: "Hizmetler",
  //   href: "/hizmetler",
  //   type: "dropdown",
  //   icon: Briefcase,
  //   submenu: [
  //     {
  //       text: "Beslenme Danışmanlığı",
  //       href: "/hizmetler/beslenme-danismanligi",
  //       description: "Kişiye özel beslenme programları",
  //     },
  //     {
  //       text: "Diyet Programları",
  //       href: "/hizmetler/diyet-programlari",
  //       description: "Hedef odaklı diyet planları",
  //     },
  //     {
  //       text: "Spor Beslenmesi",
  //       href: "/hizmetler/spor-beslenmesi",
  //       description: "Sporcular için özel programlar",
  //     },
  //     {
  //       text: "Online Danışmanlık",
  //       href: "/hizmetler/online-danismanlik",
  //       description: "Uzaktan beslenme takibi",
  //     },
  //   ],
  // },
  {
    text: "Görüşler",
    href: "/gorusler",
    type: "link",
    icon: MessageCircleMore,
  },
  {
    text: "S.S.S",
    href: "/sikca-sorulan-sorular",
    type: "link",
    icon: Mail,
  },
  {
    text: "İletişim",
    href: "/iletisim",
    type: "link",
    icon: Mail,
  },
];
