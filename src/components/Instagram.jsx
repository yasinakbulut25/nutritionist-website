import Link from "next/link";
import ButtonPrimary from "./buttons/ButtonPrimary";
import { ArrowUpRight, ImageIcon, Users } from "lucide-react";
import Container from "./Container";
import { IntrosService } from "@/services/intros.service";
import { INSTAGRAM_URL } from "@/utils/constants";
import Title from "./Title";

const stats = [
  {
    value: "110k+",
    label: "Takipçi",
    icon: Users,
  },
  {
    value: "700+",
    label: "Gönderi",
    icon: ImageIcon,
  },
];

async function Instagram() {
  const data = await IntrosService.getInstagramIntro();

  return (
    <Container>
      <div className="relative overflow-hidden w-full px-4 py-12 rounded-xl border border-slate-200 bg-white">
        <div className="z-20 relative flex flex-col gap-2 items-center">
          <Title className="!w-full text-center">{data.baslik}</Title>
          <h3 className="lg:text-2xl md:text-xl text-lg max-w-2xl font-semibold text-black text-center text-balance tracking-wide">
            {data.icerik}
          </h3>
          <div className="relative overflow-hidden">
            <div className="flex flex-wrap justify-center gap-4 mt-8 w-full">
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="group relative flex flex-col items-center gap-2 px-10 hover:-translate-y-1 transition-all min-w-[160px]"
                >
                  <Icon width={50} height={50} className="text-violet-500" />

                  <span className="relative text-4xl font-extrabold text-black">
                    {value}
                  </span>

                  <span className="relative text-sm font-medium text-slate-600 tracking-wide uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <ButtonPrimary
          className="relative z-50 flex mt-12 mx-auto w-max"
          endContent={<ArrowUpRight width={14} />}
          target="_blank"
          as={Link}
          href={INSTAGRAM_URL}
        >
          {data.link_adi}
        </ButtonPrimary>
        <div className="absolute z-10 w-full h-[350px] -bottom-40 left-1/2 transform -translate-x-1/2 rounded-full blur-2xl bg-gradient-to-b from-violet-50 via-violet-200/80 to-violet-300"></div>
      </div>
    </Container>
  );
}

export default Instagram;
