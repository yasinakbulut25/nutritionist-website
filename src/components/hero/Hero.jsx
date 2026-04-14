"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Leaf } from "lucide-react";
import Image from "next/image";
import ButtonWhatsapp from "@/components/buttons/ButtonWhatsapp";

const floatingBadges = [
  {
    text: "500+ Mutlu Danışan",
    icon: "😊",
    delay: 0.8,
    position: "sm:-top-4 sm:left-1/2",
  },
  {
    text: "%100 Online",
    icon: "💻",
    delay: 1.0,
    position: "sm:top-24 sm:-left-8",
  },
  {
    text: "Aç Kalmadan",
    icon: "🥗",
    delay: 1.2,
    position: "sm:bottom-16 sm:-left-6",
  },
  {
    text: "Kişiye Özel Program",
    icon: "📋",
    delay: 1.6,
    position: "sm:top-40 sm:-right-12",
  },
  {
    text: "Hızlı Sonuç",
    icon: "⚡",
    delay: 1.8,
    position: "sm:bottom-8 sm:-right-12",
  },
];

const checkItems = [
  "Kişiye özel haftalık program",
  "Hastalıklara özel beslenme",
  "Hafta boyu WhatsApp desteği",
  "Kalıcı alışkanlık kazandırma",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen hero-gradient overflow-hidden flex items-center mb-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="z-0 h-[300px] w-full absolute top-0 left-0 blur-3xl bg-gradient-to-b from-violet-300 via-violet-200 to-slate-50 dark:from-violet-700 dark:via-violet-600 dark:to-violet-900"
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-0 h-[50px] w-full absolute bottom-0 left-0 blur-3xl bg-gradient-to-t from-violet-300 via-violet-200 to-slate-50 dark:from-violet-900 dark:via-violet-800 dark:to-violet-900"
      />

      <div className="relative max-w-7xl mx-auto px-4 pt-28 pb-16 lg:grid flex flex-col lg:grid-cols-2 gap-12 lg:gap-6 items-center w-full z-20">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/70 border border-violet-300 text-slate-900 text-sm font-medium px-4 py-2 rounded-full mb-6"
          >
            <Leaf className="w-3.5 h-3.5 text-violet-600" />
            Online Beslenme Danışmanlığı
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
          >
            Bilinçli
            <br />
            Beslenme ile
            <br />
            <span className="bg-gradient-to-b from-violet-300 to-violet-800 bg-clip-text text-transparent">
              Yeni Sen
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base leading-relaxed mb-8 max-w-lg text-slate-900"
          >
            Aç kalmadan, sürdürülebilir bir şekilde kilo verin. Kişiye özel
            online beslenme danışmanlığı ile yaşamınıza uygun, kalıcı sonuçlar
            kazanın.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-10"
          >
            {checkItems.map((item, i) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-2 text-sm text-charcoal-mid"
              >
                <CheckCircle2 className="w-5 h-5 text-violet-600 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ButtonWhatsapp>Hemen Başlayalım</ButtonWhatsapp>
          </motion.div>
        </div>

        <div className="relative flex justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-white w-[400px] h-[400px] flex items-center justify-center pt-5 border-5 border-violet-300 rounded-full overflow-hidden">
              <Image
                src="/profile.png"
                width={300}
                height={400}
                alt="Diyetisyen Gizem"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center justify-center sm:mt-0 mt-5">
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: badge.delay,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`sm:absolute ${badge.position} bg-white rounded-2xl shadow-md px-4 py-2.5 flex items-center gap-2 z-20 w-max`}
                >
                  <span className="text-lg">{badge.icon}</span>
                  <span className="text-xs font-semibold text-slate-900 whitespace-nowrap">
                    {badge.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
