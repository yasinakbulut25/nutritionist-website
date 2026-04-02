"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-dvh lg:-mt-32 -mt-24 px-4 bg-slate-50 dark:bg-slate-950 md:pt-48 pt-32 flex flex-col items-center justify-center dark:text-white text-black overflow-hidden">
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
      hero
    </section>
  );
}
