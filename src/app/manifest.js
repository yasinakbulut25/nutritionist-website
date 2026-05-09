import { SITE_NAME, SITE_URL } from "@/lib/seo";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: "Dyt. Gizem",
    description:
      "Kişiye özel online diyet danışmanlığı ve beslenme programları.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#7c3aed",
    icons: [
      { src: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
    related_applications: [],
    prefer_related_applications: false,
    lang: "tr",
    dir: "ltr",
    scope: SITE_URL,
  };
}
