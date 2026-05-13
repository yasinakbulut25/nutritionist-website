"use client";

import Image from "next/image";
import { useState } from "react";
import { BASE_URL, IMAGES_BASE_URL } from "@/utils/constants";

export default function BlogImage({ resim, alt, ...props }) {
  const [src, setSrc] = useState(`${BASE_URL}${resim}`);
  const [tried, setTried] = useState(false);

  function handleError() {
    if (!tried) {
      setTried(true);
      setSrc(`${IMAGES_BASE_URL}${resim}`);
    }
  }

  return <Image src={src} alt={alt} onError={handleError} {...props} />;
}
