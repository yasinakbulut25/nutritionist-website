import "./../styles/globals.css";
import { Outfit } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ClientProvider from "./ClientProvider";
import { defaultMetadata, SITE_NAME, SITE_URL, AUTHOR_NAME } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#7c3aed",
};

export const metadata = {
  ...defaultMetadata,
  title: {
    default: `${SITE_NAME} | Online Beslenme Danışmanlığı`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Kişiye özel online diyet danışmanlığı. Diyetisyen Gizem Akbulut Öztürk ile sağlıklı, sürdürülebilir beslenme programları ve WhatsApp desteği.",
  keywords: [
    "Gizem Akbulut",
    "diyetisyen",
    "online diyet",
    "beslenme danışmanlığı",
    "kişiye özel diyet",
    "Küçükçekmece diyetisyen",
    "Florya diyetisyen",
    "online beslenme",
    "Gizem Akbulut Öztürk",
    "diyetisyen Gizem",
  ],
  openGraph: {
    ...defaultMetadata.openGraph,
    title: `${SITE_NAME} | Online Beslenme Danışmanlığı`,
    description:
      "Kişiye özel online diyet danışmanlığı. Sağlıklı, sürdürülebilir beslenme programları ve WhatsApp desteği.",
    url: SITE_URL,
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: `${SITE_NAME} | Online Beslenme Danışmanlığı`,
    description:
      "Kişiye özel online diyet danışmanlığı. Sağlıklı, sürdürülebilir beslenme programları.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "MedicalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/main.png`,
  description:
    "Kişiye özel online diyet danışmanlığı ve beslenme programları. Diyetisyen Gizem Akbulut Öztürk.",
  founder: {
    "@type": "Person",
    name: AUTHOR_NAME,
    jobTitle: "Diyetisyen",
    url: `${SITE_URL}/hakkimda`,
    sameAs: ["https://www.instagram.com/dyt.gizemakbulut/"],
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+90-542-623-39-96",
    contactType: "customer service",
    availableLanguage: "Turkish",
  },
  sameAs: ["https://www.instagram.com/dyt.gizemakbulut/"],
  areaServed: "TR",
  priceRange: "$$",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/yazilarim/{search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className={`${outfit.className} antialiased min-h-dvh bg-slate-50`}
        suppressHydrationWarning
      >
        <ClientProvider>
          <Header />
          {children}
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
