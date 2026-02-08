import clsx from "clsx";
import Image from "next/image";
import { useContext } from "react";
import { DataContext } from "@/lib/MediaSource/ContextMedia";

function AudioCurImg() {
  const { cover_url } = useContext(DataContext);

  return (
    <div
      className={clsx(
        " w-full pb-[100%] aspect-square shrink-0 grow-0  bg-placeholder  overflow-hidden relative",
      )}
    >
      {cover_url && (
        <Image
          priority={true}
          src={cover_url}
          sizes="300px"
          alt="this is image element"
          fill
        />
      )}
    </div>
  );
}

export default AudioCurImg;
