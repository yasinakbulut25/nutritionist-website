"use client";

import { Whatsapp } from "react-bootstrap-icons";
import { WHATSAPP_URL } from "@/utils/constants";
import { Button } from "@heroui/react";
import Link from "next/link";

function ButtonWhatsapp({ children, className, ...props }) {
  return (
    <Button
      size="md"
      className={`bg-gradient-to-tr from-green-700 via-green-500 to-green-400 dark:from-green-600 dark:via-green-400 dark:to-green-500 text-white hover:scale-105 min-w-max ${className}`}
      startContent={<Whatsapp width={18} height={18} />}
      as={Link}
      href={WHATSAPP_URL}
      {...props}
    >
      {children}
    </Button>
  );
}

export default ButtonWhatsapp;
