"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import IntroBox from "@/components/intro/IntroBox";
import { api } from "@/lib/api/api";
import { endpoints } from "@/lib/api/endpoints";

function IntroComments() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api(endpoints.commentsIntro).then((res) => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <IntroBox
      title={data.baslik}
      desc={data.icerik}
      buttonProps={{
        text: data.link_adi,
        as: Link,
        href: "/gorusler",
      }}
    />
  );
}

export default IntroComments;
