import { OnlineDiyetService } from "@/services/onlineDiyet.service";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Container from "../Container";

async function OnlineDiyet() {
  const data = await OnlineDiyetService.getShortData();

  if (!data) return;

  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="lg:text-5xl md:text-4xl text-2xl font-semibold text-black dark:text-white text-left text-pretty mb-4">
            Online Diyet
          </h2>
          <div
            className="mt-4 flex flex-col gap-2"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(data.icerik),
            }}
          />
        </div>
        <div className="bg-wnpm install dompurifyhite dark:bg-slate-900 relative p-0 m-auto rounded-xl border border-slate-200 dark:border-slate-700 max-w-full">
          <Image
            className="sm:max-w-[500px] max-w-full h-auto mx-auto"
            src="/profile.png"
            alt="Online Diyet"
            width={500}
            height={500}
          />
        </div>
      </div>
    </Container>
  );
}

export default OnlineDiyet;
