import { useRef } from "react";
import AudioInfoOverFlow from "./AudioInfoOverFlow";

function AudioInfo({ el }: { el: React.ReactNode }) {
  const ofcheckDiv = useRef(null);
  return (
    <div
      ref={ofcheckDiv}
      className=" flex-1 
  overflow-hidden will-change-transform"
    >
      {/* <div className=" w-full whitespace-nowrap showtextoverflow">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit
        expedita consectetur quam, aut consequatur harum!
      </div> */}
      <AudioInfoOverFlow ofcheckDiv={ofcheckDiv} el={el} />
    </div>
  );
}

export default AudioInfo;
