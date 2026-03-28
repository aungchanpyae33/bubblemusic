"use client";
// nextjs Link component can not top-0 when using div wrapper as div scroll
import { usePathname } from "next/navigation";
import { useEffect } from "react";

function PlaceHolderScrollToTop() {
  const pathName = usePathname();
  useEffect(() => {
    const mainElement = document.querySelector("#main-id-scroll");
    mainElement?.scrollTo({ top: 0, behavior: "instant" });
  }, [pathName]);
  return null;
}

export default PlaceHolderScrollToTop;
