"use client";
import { motion } from "motion/react";
import { ReactNode } from "react";
function QueueFull({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className=" relative  h-full overflow-hidden flex-1 flex"
    >
      {children}
    </motion.div>
  );
}

export default QueueFull;
