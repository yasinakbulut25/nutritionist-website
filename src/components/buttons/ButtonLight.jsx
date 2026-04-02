"use client";

import { Button } from "@heroui/react";

function ButtonLight({ children, className, ...props }) {
  return (
    <Button
      size="md"
      className={`bg-gradient-to-tr from-violet-200/70 via-slate-50 to-violet-100 border border-violet-100 text-black shadow-md shadow-violet-50 dark:shadow-none hover:scale-105 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

export default ButtonLight;
