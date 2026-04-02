"use client";

import { HeroUIProvider } from "@heroui/react";
import { MotionConfig } from "framer-motion";

export default function ClientProvider({ children }) {
  return (
    <HeroUIProvider>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </HeroUIProvider>
  );
}
