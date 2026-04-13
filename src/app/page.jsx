import Container from "@/components/Container";
import Hero from "@/components/hero/Hero";
import OnlineDiyet from "@/components/home/OnlineDiyet";
import IntroBox from "@/components/intro/IntroBox";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Container>
        <IntroBox
          title="☆ Bilinçli Beslenmeyle Yepyeni Bir Siz!"
          desc="Sağlıklı bir yaşamın kapılarını açmak için bilinçli beslenmenin gücünü keşfedin! Yepyeni bir siz olmak için bu keyifli yolculuğa bugün başlayın."
          buttonProps={{
            text: "Video İçerikli Eğitimler",
            as: Link,
            href: "https://egitim.diyetisyengizemakbulut.com/",
          }}
        />
      </Container>
      <OnlineDiyet />
    </main>
  );
}
