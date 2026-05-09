import { buildMeta } from "@/lib/seo";
import Hero from "@/components/hero/Hero";
import IntroVideos from "@/components/home/intros/IntroVideos";
import OnlineDiyet from "@/components/home/OnlineDiyet";
import HowWeWork from "@/components/home/HowWeWork";
import Packages from "@/components/home/Packages";
import Testimonials from "@/components/home/Testimonials";
import IntroComments from "@/components/home/intros/IntroComments";
import BlogsSection from "@/components/home/blogs/BlogsSection";
import Instagram from "@/components/Instagram";

export const metadata = buildMeta({
  title: "Diyetisyen Gizem Akbulut Öztürk | Online Diyet & Beslenme Danışmanlığı",
  description:
    "Kişiye özel online diyet programları, beslenme yazıları ve tarifler. 500+ danışan ve 110K+ Instagram takipçisiyle Gizem Akbulut Öztürk ile sağlıklı yaşama başlayın.",
  path: "/",
  keywords: [
    "online diyet danışmanlığı",
    "diyetisyen",
    "beslenme programı",
    "kilo verme",
    "sağlıklı beslenme",
    "Gizem Akbulut",
    "Gizem Akbulut Öztürk",
    "WhatsApp diyet",
  ],
});

export default function Home() {
  return (
    <main className="z-[50]">
      <Hero />
      <IntroVideos />
      <OnlineDiyet />
      <HowWeWork />
      <Packages />
      <Testimonials />
      <IntroComments />
      <BlogsSection categorySef="tarifler" />
      <BlogsSection categorySef="beslenme" />
      <Instagram />
      <BlogsSection categorySef="arastirma" />
      <BlogsSection categorySef="nedir" />
    </main>
  );
}
