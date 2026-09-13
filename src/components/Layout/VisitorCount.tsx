"use client";

import { useEffect, useState } from "react";
import { IconEye } from "@tabler/icons-react";

const NAMESPACE = "ashishnanda19-portfolio";
const KEY = "visits";
const SESSION_FLAG = "vc_counted";

const VisitorCount = () => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem(SESSION_FLAG) === "1";
    const endpoint = alreadyCounted
      ? `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/`
      : `https://api.counterapi.dev/v1/${NAMESPACE}/${KEY}/up`;

    fetch(endpoint)
      .then((r) => r.json())
      .then((data: { count?: number }) => {
        if (typeof data?.count === "number") {
          setCount(data.count);
          sessionStorage.setItem(SESSION_FLAG, "1");
        }
      })
      .catch(() => {});
  }, []);

  return (
    <span className="smalll text-base md:text-lg text-black/70 dark:text-white/70 inline-flex items-center gap-2 mt-1">
      <IconEye size={20} stroke={1.75} />
      {count === null ? "—" : count.toLocaleString()}
    </span>
  );
};

export default VisitorCount;
