import IntroBox from "@/components/intro/IntroBox";
import Link from "next/link";

function IntroVideos() {
  return (
    <IntroBox
      title="☆ Bilinçli Beslenmeyle Yepyeni Bir Siz!"
      desc="Sağlıklı bir yaşamın kapılarını açmak için bilinçli beslenmenin gücünü keşfedin! Yepyeni bir siz olmak için bu keyifli yolculuğa bugün başlayın."
      buttonProps={{
        text: "Video İçerikli Eğitimler",
        as: Link,
        href: "https://egitim.diyetisyengizemakbulut.com/",
      }}
    />
  );
}

export default IntroVideos;
