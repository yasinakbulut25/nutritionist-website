import IntroBox from "@/components/intro/IntroBox";
import { IntrosService } from "@/services/intros.service";
import Link from "next/link";

async function IntroComments() {
  const data = await IntrosService.getCommentsIntro();

  return (
    <IntroBox
      title={data.baslik}
      desc={data.icerik}
      buttonProps={{
        text: data.link_adi,
        as: Link,
        href: "/gorusler",
      }}
    />
  );
}

export default IntroComments;
