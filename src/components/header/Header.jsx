"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { BASE_URL } from "@/utils/constants";
import { routes } from "@/routes";
import MobileMenu from "./MobileMenu";
import ButtonPrimary from "../buttons/ButtonPrimary";

function Header() {
  const [hoveredDropdown, setHoveredDropdown] = useState(null);

  return (
    <header className="z-50 fixed sm:top-4 top-2 left-0 w-full sm:px-4 px-2">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative max-w-6xl w-full flex items-center justify-between mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-md sm:px-6 px-2 pr-3 py-4 rounded-2xl shadow-lg">
          <div className="flex items-center sm:gap-4 gap-2">
            <MobileMenu />
            <Link href={BASE_URL} className="font-allura flex items-center gap-2 md:text-2xl text-xl">
              <Image
                width={35}
                height={35}
                src={"./logo.svg"}
                alt="Dyt. Gizem Akbulut"
              />
              Dyt. Gizem Akbulut
            </Link>
          </div>

          <div className="lg:flex hidden items-center gap-1">
            {routes.map((route, index) => {
              if (route.type === "dropdown") {
                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredDropdown(index)}
                    onMouseLeave={() => setHoveredDropdown(null)}
                  >
                    <button className="flex items-center gap-1 px-3 py-2 text-sm text-black hover:text-violet-500 dark:text-white dark:hover:text-violet-300 duration-200 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20">
                      {route.text}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          hoveredDropdown === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {hoveredDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden"
                        >
                          <div className="py-2">
                            {route.submenu.map((item, subIndex) => (
                              <Link
                                key={subIndex}
                                href={item.href}
                                className="flex flex-col px-4 py-3 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors duration-150 group"
                              >
                                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400">
                                  {item.text}
                                </span>
                                {item.description && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {item.description}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={route.href}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-black hover:text-violet-500 dark:text-white dark:hover:text-violet-300 duration-200 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20"
                >
                  {route.text}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <ButtonPrimary endContent={<ChevronRight width={14} />}>
              Ücretsiz Kayıt Ol
            </ButtonPrimary>
          </div>
        </div>
      </motion.div>
    </header>
  );
}

export default Header;
