export const SITE_URL = "https://diyetisyengizemakbulut.com";
export const SITE_NAME = "Diyetisyen Gizem Akbulut Öztürk";
export const AUTHOR_NAME = "Gizem Akbulut Öztürk";

export const defaultMetadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
  creator: AUTHOR_NAME,
  publisher: AUTHOR_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: SITE_NAME,
    images: [
      {
        url: "/main.png",
        width: 800,
        height: 800,
        alt: "Diyetisyen Gizem Akbulut Öztürk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@dyt.gizemakbulut",
    creator: "@dyt.gizemakbulut",
    images: ["/main.png"],
  },
};

export function buildMeta({ title, description, path = "", ogImage } = {}) {
  const url = `${SITE_URL}${path}`;
  const image = ogImage ?? "/main.png";

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, alt: title }],
    },
    twitter: { title, description, images: [image] },
  };
}

export async function resolveBlogImageUrl(resim) {
  if (!resim) return null;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const IMAGES_BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;
  const primary = `${BASE_URL}${resim}`;
  try {
    const res = await fetch(primary, { method: "HEAD", signal: AbortSignal.timeout(3000) });
    if (res.ok) return primary;
  } catch {}
  return `${IMAGES_BASE_URL}${resim}`;
}
