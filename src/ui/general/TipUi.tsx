import type { DragControls } from "motion/react";

function TipUi({ controls }: { controls: DragControls }) {
  return (
    <button
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => {
        controls.start(e);
      }}
      className="h-5 cursor-default  w-full flex items-center justify-center "
    >
      <div className=" h-[6px] w-20 cursor-grab touch-none rounded-full bg-neutral-700 active:cursor-grabbing"></div>
    </button>
  );
}

export default TipUi;
