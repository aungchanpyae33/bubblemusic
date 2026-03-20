import Image from "next/image";
import { useDataContext } from "@/lib/MediaSource/ContextMedia";

function AudioFullImg() {
  const { cover_url, name } = useDataContext();

  return (
    <Image
      priority={true}
      src={cover_url}
      sizes="384px"
      fill
      alt={`cover art image of song called ${name}`}
      className=" object-scale-down"
    />
  );
}

export default AudioFullImg;
