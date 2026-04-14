"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "../Container";
import TitleWithDesc from "../TitleWithDesc";
import ButtonCustom from "../buttons/ButtonCustom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import Loader from "../Loader";

import moment from "moment";
import "moment/locale/tr";
moment.locale("tr");

function Testimonials() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api(endpoints.comments).then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) return <Loader />;

  const count = data.length - (data.length % 10);

  return (
    <Container>
      <TitleWithDesc
        title="Başarı Hikayeleri"
        subTitle={`${count}+ Danışan Görüşleri`}
        desc="Danışanlarımın kendi sözleriyle anlattığı değişim hikayelerini okuyun."
      />

      <div className="relative w-full py-1">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          loop={true}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            500: { slidesPerView: 1.5 },
            768: { slidesPerView: 2 },
            860: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          className="!py-3"
        >
          {data.map((item) => (
            <SwiperSlide key={item.id} className="!h-auto">
              <div className="bg-white rounded-2xl shadow p-6 h-full flex flex-col gap-3">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs text-violet-500 font-medium">
                    {item.sehir}
                  </span>
                  <span className="text-xs text-slate-400 whitespace-nowrap">
                    {moment(item.tarih).fromNow()}
                  </span>
                </div>

                <p className="text-base text-slate-900 font-medium">
                  {item.ekleyen}
                </p>

                <p className="text-sm text-slate-600 line-clamp-[7]">
                  {item.icerik}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="w-full flex items-center justify-center gap-6 mt-2">
          <ButtonCustom
            className="prev-btn bg-white shadow"
            isIconOnly
            startContent={
              <ArrowLeft width={16} height={16} className="text-black" />
            }
          />

          <ButtonCustom
            className="next-btn bg-white shadow"
            isIconOnly
            startContent={
              <ArrowRight width={16} height={16} className="text-black" />
            }
          />
        </div>
      </div>
    </Container>
  );
}

export default Testimonials;
