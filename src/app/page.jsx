import Hero from "@/components/hero/Hero";
import IntroVideos from "@/components/home/intros/IntroVideos";
import OnlineDiyet from "@/components/home/OnlineDiyet";
import HowWeWork from "@/components/home/HowWeWork";
import Packages from "@/components/home/Packages";
import Testimonials from "@/components/home/Testimonials";
import IntroComments from "@/components/home/intros/IntroComments";
import BlogsSection from "@/components/home/blogs/BlogsSection";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <IntroVideos />
      <OnlineDiyet />
      <HowWeWork />
      <Packages />
      <Testimonials />
      <IntroComments />
      <BlogsSection categorySef="arastirma" />
    </main>
  );
}
