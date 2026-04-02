export const routes = [
  {
    text: "Ana Sayfa",
    href: "/",
    type: "link",
  },
  {
    text: "Hakkımda",
    href: "/hakkimda",
    type: "link",
  },
  {
    text: "Hizmetler",
    href: "/hizmetler",
    type: "dropdown",
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
  },
  {
    text: "Tarifler",
    href: "/tarifler",
    type: "dropdown",
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
  },
];
