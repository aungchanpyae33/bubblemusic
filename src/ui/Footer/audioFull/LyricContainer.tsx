import { useRef } from "react";
import Lyric from "./Lyric";
import clsx from "clsx";
import { motion } from "motion/react";
function LyricContainer({ type }: { type: "lyric" | "queue" | undefined }) {
  const lyricRef = useRef<HTMLDivElement>(null);
  const dynamic = type === "lyric";
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      ref={lyricRef}
      className={clsx(
        "flex-1 relative md:px-5 px-2  overflow-auto no-scrollbar will-change-scroll my-2 ",
      )}
    >
      <Lyric lyricRef={lyricRef} lyricShow={dynamic} />
    </motion.div>
  );
}

export default LyricContainer;
