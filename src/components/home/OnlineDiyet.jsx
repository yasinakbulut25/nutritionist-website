import { OnlineDiyetService } from "@/services/onlineDiyet.service";
import DOMPurify from "isomorphic-dompurify";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import Title from "../Title";
import ButtonPrimary from "../buttons/ButtonPrimary";

async function OnlineDiyet() {
  const data = await OnlineDiyetService.getShortData();

  if (!data) return;

  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <Title>Online Diyet</Title>
          <div
            className="online-diet-desc flex flex-col gap-2 mb-4"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.icerik),
            }}
          />
          <ButtonPrimary
            as={Link}
            href="/online-diyet"
            endContent={<ArrowRight width={16} height={16} />}
          >
            Detaylı İncele
          </ButtonPrimary>
        </div>
        <div className="bg-white relative p-0 m-auto rounded-xl max-w-full overflow-hidden">
          <Image
            className="sm:max-w-[400px] max-w-full h-auto mx-auto"
            src="/images/online-diyet.svg"
            alt="Online Diyet"
            width={400}
            height={400}
          />
        </div>
      </div>
    </Container>
  );
}

export default OnlineDiyet;
