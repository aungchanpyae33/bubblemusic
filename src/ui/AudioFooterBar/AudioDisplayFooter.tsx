import Image from "next/image";

function AudioDisplayFooter({ song_cover }: { song_cover: string }) {
  return (
    <div className="  flex-shrink-0 bg-placeholder  w-[70px] h-[70px]      flex items-center justify-center shadow-md ">
      <div className=" size-[62px] rounded overflow-hidden relative">
        <Image
          src={song_cover}
          fill
          sizes="62px"
          alt="test image"
          className="w-full h-full"
          priority={false}
        />
      </div>
    </div>
  );
}

export default AudioDisplayFooter;
