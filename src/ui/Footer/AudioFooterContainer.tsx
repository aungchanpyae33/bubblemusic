import { Context } from "@/lib/MediaSource/ContextMediaAudioFull";
import clsx from "clsx";
import { RefObject, useContext, useRef } from "react";

function AudioFooterContainer({
  children,
  footerRef,
}: {
  children: React.ReactNode;
  footerRef: RefObject<HTMLDivElement | null>;
}) {
  const initialRef = useRef<HTMLElement | null>(null);
  const { open, setOpen } = useContext(Context);
  return (
    // <div className="cursor-not-allowed">
    // in chrome , when use top-0 and -translate-x- that is close and bigger the parent height make a little edge between , not found in firefox , use -top parent height
    <div
      className={clsx("w-full h-full  border-t border-divided ")}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          footerRef.current?.classList.add("z-50");
          setOpen(!open);
        }
      }}
      // to track initial click elemet , without this  check , if user click the button then hold and release the container that does not have e.stopP will trigger the parent onClick ,
      onPointerDown={(e) => {
        initialRef.current = e.target as HTMLElement;
      }}
      onClick={(e) => {
        if (e.target === initialRef.current) {
          footerRef.current?.classList.add("z-50");
          setOpen(!open);
        }
      }}
    >
      <div
        className={clsx(
          " w-full h-full flex gap-4 sm:gap-5 md:gap-6 bg-[#0A0A0A]  lg:gap-10 justify-between",
          {},
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default AudioFooterContainer;
