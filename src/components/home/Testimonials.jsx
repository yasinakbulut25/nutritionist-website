"use client";

import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import moment from "moment";
import "moment/locale/tr";
import Container from "../Container";
import TitleWithDesc from "../TitleWithDesc";
import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";

moment.locale("tr");

function TestimonialCard({ item }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-full flex flex-col gap-3 select-none">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold text-violet-500 bg-violet-50 px-2.5 py-1 rounded-full">
          {item.sehir}
        </span>
        <span className="text-xs text-slate-400 whitespace-nowrap">
          {moment(item.tarih).fromNow()}
        </span>
      </div>
      <p className="text-base text-slate-900 font-semibold leading-snug">
        {item.ekleyen}
      </p>
      <p className="text-sm text-slate-600 leading-relaxed line-clamp-6">
        {item.icerik}
      </p>
    </div>
  );
}

export default function Testimonials() {
  const [data, setData] = useState(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const autoplay = Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      dragFree: false,
      slidesToScroll: 1,
    },
    [autoplay],
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    updateButtons();
    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
    };
  }, [emblaApi, updateButtons]);

  useEffect(() => {
    api(endpoints.comments).then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  const count = data.length - (data.length % 10);

  return (
    <Container>
      <TitleWithDesc
        title="Başarı Hikayeleri"
        subTitle={`${count}+ Danışan Görüşleri`}
        desc="Danışanlarımın kendi sözleriyle anlattığı değişim hikayelerini okuyun."
      />

      <div className="relative">
        {/* Viewport — Embla masks overflow here */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex gap-4 py-3">
            {data.map((item) => (
              <div
                key={item.id}
                className="flex-none w-[85%] sm:w-[60%] md:w-[45%] lg:w-[32%]"
              >
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={scrollPrev}
            aria-label="Önceki"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!canPrev}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Sonraki"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 hover:border-violet-300 hover:text-violet-600 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={!canNext}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Container>
  );
}
