"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

const INITIAL = { ad: "", email: "", mesaj: "" };

export default function IletisimForm() {
  const [form, setForm] = useState(INITIAL);
  const [formStatus, setFormStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/iletisim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok) {
        setErrorMsg(json.message || "Bir hata oluştu.");
        setFormStatus("error");
        return;
      }

      setFormStatus("success");
      setForm(INITIAL);
    } catch {
      setErrorMsg("Sunucuya ulaşılamadı. Lütfen tekrar deneyin.");
      setFormStatus("error");
    }
  }

  if (formStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Mesajınız İletildi!</h3>
        <p className="text-slate-500 max-w-xs">
          En kısa sürede size dönüş sağlayacağım. Teşekkür ederim.
        </p>
        <button
          onClick={() => setFormStatus("idle")}
          className="mt-2 text-sm text-violet-600 font-semibold underline underline-offset-2 hover:text-violet-800 transition-colors"
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700" htmlFor="ad">
            Ad Soyad <span className="text-violet-500">*</span>
          </label>
          <input
            id="ad"
            name="ad"
            type="text"
            required
            minLength={2}
            placeholder="Adınız ve soyadınız"
            value={form.ad}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700" htmlFor="email">
            E-posta <span className="text-violet-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="ornek@email.com"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-slate-700" htmlFor="mesaj">
          Mesajınız <span className="text-violet-500">*</span>
        </label>
        <textarea
          id="mesaj"
          name="mesaj"
          required
          minLength={10}
          rows={6}
          placeholder="Mesajınızı buraya yazın..."
          value={form.mesaj}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
        />
        <span className="text-xs text-slate-400 text-right">
          {form.mesaj.length} karakter
        </span>
      </div>

      {formStatus === "error" && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={formStatus === "loading"}
        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-tr from-violet-700 via-violet-500 to-violet-400 text-white font-semibold text-sm shadow-md shadow-violet-200 hover:scale-[1.02] hover:shadow-violet-300 disabled:opacity-60 disabled:scale-100 transition-all duration-200"
      >
        {formStatus === "loading" ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Gönderiliyor...</>
        ) : (
          <><Send className="w-4 h-4" />Mesaj Gönder</>
        )}
      </button>
    </form>
  );
}
