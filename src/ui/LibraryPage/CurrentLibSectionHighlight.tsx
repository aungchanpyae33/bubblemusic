"use client";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

function CurrentLibSectionHighlight({ route }: { route: string }) {
  const pathName = usePathname();

  if (pathName !== route) return;
  return (
    <motion.div layoutId="indicator" className=" absolute bg-brand  inset-0" />
  );
}

export default CurrentLibSectionHighlight;
