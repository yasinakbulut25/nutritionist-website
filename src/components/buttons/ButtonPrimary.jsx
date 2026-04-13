"use client";

import { Button } from "@heroui/react";

function ButtonPrimary({ children, className, ...props }) {
  return (
    <Button
      size="md"
      className={`bg-gradient-to-tr from-violet-700 via-violet-400 to-violet-500 dark:from-violet-600 dark:via-violet-400 dark:to-violet-500 text-white hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default ButtonPrimary;
