"use client";

import { Button } from "@heroui/react";

function ButtonCustom({ children, ...props }) {
  return <Button {...props}>{children}</Button>;
}

export default ButtonCustom;
