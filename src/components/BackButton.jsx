"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="mt-6 flex items-center gap-1.5 text-violet-500 hover:text-violet-700 text-sm transition-colors duration-150"
    >
      <ArrowLeft className="w-4 h-4" />
      Önceki sayfaya geri dön
    </button>
  );
}
