"use client";

import { Button } from "@heroui/react";
import { Whatsapp } from "react-bootstrap-icons";

function ButtonWhatsapp({ children, className, ...props }) {
  return (
    <Button
      size="md"
      className={`bg-gradient-to-tr from-green-600 via-green-400 to-green-300 dark:from-green-600 dark:via-green-400 dark:to-green-500 text-white hover:scale-105 min-w-max ${className}`}
      startContent={<Whatsapp width={18} height={18} />}
      {...props}
    >
      {children}
    </Button>
  );
}

export default ButtonWhatsapp;
