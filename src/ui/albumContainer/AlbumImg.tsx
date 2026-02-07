"use client";

import Image from "next/image";
import { useContext, useRef } from "react";
import { ContextAlbum } from "./AlbumUpperBackground";
import IconWrapper from "../general/IconWrapper";
import { Folder } from "lucide-react";
import useGetDominantColor from "@/lib/CustomHooks/useGetDominantColor";
import type { listSongsSection } from "../../../database.types-fest";

function AlbumImg({
  cover_url,
  type,
}: {
  cover_url: string | null;
  type: listSongsSection["type"];
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const { setBgValue } = useContext(ContextAlbum);
  useGetDominantColor({ setBgValue, imgRef, cover_url });
  return (
    <div
      className=" lg:w-[250px] rounded overflow-hidden md:w-[200px] shrink-0 w-[180px]  aspect-square  object-cover relative bg-placeholder
    "
    >
      {cover_url ? (
        <Image
          ref={imgRef}
          src={cover_url}
          priority={true}
          sizes="(min-width: 1024px) 250px, (min-width: 768px) 200px, 180px"
          fill
          alt="singer song"
        />
      ) : (
        <div className=" absolute inset-0 flex items-center justify-center">
          <IconWrapper
            Icon={Folder}
            className="hover:scale-100   active:scale-100 size-[100px]"
          />
        </div>
      )}
    </div>
  );
}

export default AlbumImg;
