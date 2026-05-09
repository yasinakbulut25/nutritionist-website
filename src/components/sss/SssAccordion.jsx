"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";

export default function SssAccordion({ items }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? "border-violet-200 shadow-md shadow-violet-100"
                : "border-slate-100 hover:border-violet-200 hover:shadow-sm"
            } bg-white`}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-xs font-bold text-violet-500">
                  {i + 1}
                </span>
                <span
                  className={`text-base font-semibold leading-snug ${isOpen ? "text-violet-700" : "text-slate-800"}`}
                >
                  {item.soru}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-violet-500" : "text-slate-400"
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  className="px-6 pb-5 pl-[4.5rem] text-slate-600 text-sm leading-relaxed
                    [&_br]:block [&_br]:mb-1.5
                    [&_strong]:font-semibold [&_strong]:text-slate-800
                    [&_a]:text-violet-600 [&_a]:underline [&_a]:underline-offset-2"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.cevap),
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
