"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import "moment/locale/tr";
import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";
import Loader from "@/components/Loader";

moment.locale("tr");

const PAGE_SIZE = 12;

export default function GoruslerGrid() {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    api(endpoints.comments).then((res) => setData(res.data));
  }, []);

  if (!data) return <Loader />;

  const shown = data.slice(0, visible);
  const hasMore = visible < data.length;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
        {shown.map((item) => (
          <div
            key={item.id}
            className="break-inside-avoid bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
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

            <p className="text-base text-slate-600 leading-relaxed">
              {item.icerik}
            </p>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex flex-col items-center gap-2 mt-10">
          <p className="text-sm text-slate-400">
            {shown.length} / {data.length} görüş gösteriliyor
          </p>
          <button
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm shadow-sm hover:border-violet-300 hover:text-violet-700 hover:shadow-md transition-all duration-200"
          >
            Daha Fazla Göster
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {!hasMore && data.length > PAGE_SIZE && (
        <p className="text-center text-sm text-slate-400 mt-10">
          Tüm {data.length} görüş gösterildi.
        </p>
      )}
    </>
  );
}
