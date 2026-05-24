"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  Search,
} from "lucide-react";

const LOCATION_GROUPS = [
  {
    label: "Yurt İçi",
    options: [
      "Adana",
      "Adıyaman",
      "Afyonkarahisar",
      "Ağrı",
      "Amasya",
      "Ankara",
      "Antalya",
      "Artvin",
      "Aydın",
      "Balıkesir",
      "Bilecik",
      "Bingöl",
      "Bitlis",
      "Bolu",
      "Burdur",
      "Bursa",
      "Çanakkale",
      "Çankırı",
      "Çorum",
      "Denizli",
      "Diyarbakır",
      "Edirne",
      "Elazığ",
      "Erzincan",
      "Erzurum",
      "Eskişehir",
      "Gaziantep",
      "Giresun",
      "Gümüşhane",
      "Hakkari",
      "Hatay",
      "Isparta",
      "Mersin",
      "İstanbul",
      "İzmir",
      "Kars",
      "Kastamonu",
      "Kayseri",
      "Kırklareli",
      "Kırşehir",
      "Kocaeli",
      "Konya",
      "Kütahya",
      "Malatya",
      "Manisa",
      "Kahramanmaraş",
      "Mardin",
      "Muğla",
      "Muş",
      "Nevşehir",
      "Niğde",
      "Ordu",
      "Rize",
      "Sakarya",
      "Samsun",
      "Siirt",
      "Sinop",
      "Sivas",
      "Tekirdağ",
      "Tokat",
      "Trabzon",
      "Tunceli",
      "Şanlıurfa",
      "Uşak",
      "Van",
      "Yozgat",
      "Zonguldak",
      "Aksaray",
      "Bayburt",
      "Karaman",
      "Kırıkkale",
      "Batman",
      "Şırnak",
      "Bartın",
      "Ardahan",
      "Iğdır",
      "Yalova",
      "Karabük",
      "Kilis",
      "Osmaniye",
      "Düzce",
    ],
  },
  {
    label: "Yurt Dışı",
    options: [
      "Almanya",
      "Amerika",
      "Avusturya",
      "Azerbaycan",
      "Belçika",
      "Danimarka",
      "Fransa",
      "Hollanda",
      "İngiltere",
      "İspanya",
      "İsveç",
      "İsviçre",
      "İtalya",
      "Kanada",
      "Katar",
      "Kıbrıs",
      "Norveç",
      "Rusya",
      "Yunanistan",
      "Diğer",
    ],
  },
];

const INITIAL = { ekleyen: "", sehir: "", icerik: "" };

function CitySelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  function select(city) {
    onChange(city);
    setOpen(false);
    setQuery("");
  }

  const filtered = LOCATION_GROUPS.map((group) => ({
    ...group,
    options: group.options.filter((c) =>
      c.toLowerCase().includes(query.toLowerCase()),
    ),
  })).filter((g) => g.options.length > 0);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border bg-slate-50 text-sm transition focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent ${
          value
            ? "text-slate-900 border-slate-200"
            : "text-slate-400 border-slate-200"
        }`}
      >
        <span>{value || "Şehir / Ülke seçin"}</span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-slate-100">
            <Search className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ara..."
              className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
            />
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-slate-400 text-center">
                Sonuç bulunamadı
              </p>
            ) : (
              filtered.map((group) => (
                <div key={group.label}>
                  <div className="px-3 py-1.5 text-[11px] font-bold text-violet-500 uppercase tracking-widest bg-violet-50/60 sticky top-0">
                    {group.label}
                  </div>
                  {group.options.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => select(city)}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-violet-50 hover:text-violet-700 transition-colors duration-100 ${
                        value === city
                          ? "bg-violet-50 text-violet-700 font-semibold"
                          : "text-slate-700"
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function GorusForm() {
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
      const res = await fetch("/api/gorusler", {
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
        <h3 className="text-xl font-bold text-slate-900">
          Görüşünüz İletildi!
        </h3>
        <p className="text-slate-500 max-w-xs">
          Değerli görüşünüz için teşekkür ederiz.
        </p>
        <button
          onClick={() => setFormStatus("idle")}
          className="mt-2 text-sm text-violet-600 font-semibold underline underline-offset-2 hover:text-violet-800 transition-colors"
        >
          Yeni görüş ekle
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label
            className="text-sm font-semibold text-slate-700"
            htmlFor="ekleyen"
          >
            Ad Soyad <span className="text-violet-500">*</span>
          </label>
          <input
            id="ekleyen"
            name="ekleyen"
            type="text"
            required
            minLength={2}
            placeholder="Adınız ve soyadınız"
            value={form.ekleyen}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">
            Şehir / Ülke <span className="text-violet-500">*</span>
          </label>
          <CitySelect
            value={form.sehir}
            onChange={(val) => setForm((prev) => ({ ...prev, sehir: val }))}
          />
          {/* hidden required-compatible input */}
          <input
            type="text"
            name="sehir"
            value={form.sehir}
            required
            readOnly
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          className="text-sm font-semibold text-slate-700"
          htmlFor="icerik"
        >
          Görüşünüz <span className="text-violet-500">*</span>
        </label>
        <textarea
          id="icerik"
          name="icerik"
          required
          minLength={10}
          maxLength={1500}
          rows={6}
          placeholder="Deneyiminizi bizimle paylaşın..."
          value={form.icerik}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition resize-none"
        />
        <span className="text-xs text-slate-400 text-right">
          {form.icerik.length} karakter
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
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Gönderiliyor...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Görüşümü İlet
          </>
        )}
      </button>
    </form>
  );
}
