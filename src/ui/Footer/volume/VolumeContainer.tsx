import clsx from "clsx";
import { useContext, useEffect, useRef } from "react";
import { volumeContext } from "./ContextVolume";

function VolumeContainer({
  children,
  isDragging,
}: {
  children: React.ReactNode;
  isDragging: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { open, setOpen } = useContext(volumeContext);
  useEffect(() => {
    if (!isDragging) {
      setOpen(false);
    }
  }, [isDragging, setOpen]);
  useEffect(() => {
    if (open) {
      containerRef.current?.focus();
    }
  }, [open]);
  return (
    <div
      className={clsx(
        "absolute group-hover:lg:bg-inherit  h-full    lg:static lg:w-full lg:flex right-0  w-full",
        {
          "flex bg-surface-2 lg:bg-inherit": isDragging,
          "flex   bg-surface-2": open,
          hidden: !open,
        },
      )}
      tabIndex={0}
      ref={containerRef}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setOpen(false);
        }
      }}
    >
      {children}
    </div>
  );
}

export default VolumeContainer;
