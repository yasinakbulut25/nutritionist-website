import Container from "@/components/Container";
import Hero from "@/components/hero/Hero";
import HowWeWork from "@/components/home/HowWeWork";
import IntroComments from "@/components/home/intros/IntroComments";
import IntroVideos from "@/components/home/intros/IntroVideos";
import OnlineDiyet from "@/components/home/OnlineDiyet";
import Packages from "@/components/home/Packages";
import Testimonials from "@/components/home/Testimonials";

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
    </main>
  );
}
