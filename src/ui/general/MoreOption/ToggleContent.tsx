import { RefObject, useRef } from "react";
import clsx from "clsx";
import {
  motion,
  useAnimate,
  useDragControls,
  useMotionValue,
} from "motion/react";
import { useToggleContentPosition } from "@/lib/CustomHooks/useToggleContentPosition";
import useOutterClick from "@/lib/CustomHooks/useOutterClick";
import useCloseFunctoion from "@/lib/CustomHooks/useCloseFunction";
import { useEnableScroll } from "@/lib/CustomHooks/useEnableScroll";
import { useMoreOptionContext } from "@/Context/ContextMoreOption";
import { useMoreOptionStackContext } from "@/Context/ContextMoreOptionStack";
import { useMoreOptionUniqueContext } from "@/Context/ContextMoreOptionUnique";
import { useDeviceContext } from "@/Context/ContextDeviceCheck";
import TipUi from "../TipUi";
import { FocusTrap } from "focus-trap-react";

interface ToggleContentProps extends React.ComponentProps<"div"> {
  parentRef: RefObject<HTMLButtonElement | null>;
  children: React.ReactNode;
  staticDrop?: boolean;
  staticUp?: boolean;
}

function ToggleContentFloat({
  parentRef,
  staticDrop,
  staticUp,
  children,
}: ToggleContentProps) {
  const { show, setShow } = useMoreOptionContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const [position] = useToggleContentPosition({
    parentRef,
    containerRef,
    staticDrop,
    staticUp,
  });
  // outterclick is to detect click is inside portal and targert parent trigger or not inside when portal is open
  useEnableScroll(containerRef);
  useOutterClick(show, setShow, containerRef, parentRef);
  useCloseFunctoion(show, () => setShow(false), containerRef);
  return (
    <FocusTrap
      focusTrapOptions={{
        allowOutsideClick: true,
      }}
    >
      <div
        className={clsx(
          " fixed z-50 overflow-auto max-w-full  bg-pop max-h-full border border-borderFull left-0 top-0 p-1 rounded-md",
        )}
        ref={containerRef}
        tabIndex={-1}
        style={position}
      >
        <div className="min-w-[200px] max-w-[260px]">{children}</div>
        {/* to avoid re-render cause of position */}
      </div>
    </FocusTrap>
  );
}

const bottom = 20;
// to sastify the bottom-5 in close

function ToggleContentMobile({
  children,
}: {
  children: ToggleContentProps["children"];
}) {
  const [scope, animate] = useAnimate();
  const { show, setShow } = useMoreOptionContext();
  const controls = useDragControls();
  const y = useMotionValue(0);
  const { setStack } = useMoreOptionStackContext();
  const { uuidState } = useMoreOptionUniqueContext();
  const containerRef = useRef<HTMLDivElement>(null);

  // the reason i am not reseting setUuidState is to avoaid showing hidden class in toggleContent parent

  function onCloseAnimation() {
    const yStart = typeof y.get() === "number" ? y.get() : 0;
    const height = containerRef.current
      ? containerRef.current.getBoundingClientRect().height
      : 0;

    const backdropAnim = animate(
      "#backDrop",
      { opacity: 0 },
      { duration: 0.25, ease: "easeInOut" },
    );

    const drawerAnim = animate(
      "#drawer",
      { y: [yStart, height + bottom] },
      { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
    );

    Promise.all([backdropAnim.finished, drawerAnim.finished]).then(() => {
      setStack(0);
      setShow(false);
    });
  }

  useCloseFunctoion(show, () => setShow(false), containerRef);
  return (
    <div ref={scope} className="z-50">
      <motion.div
        onClick={(e) => {
          if (e.target === e.currentTarget) return;
          onCloseAnimation();
        }}
        id="drawer"
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{
          ease: "easeInOut",
        }}
        className={clsx(
          " fixed z-50 p-2   bottom-5 left-2 right-2 overflow-hidden rounded-md bg-pop",
          {
            hidden: uuidState !== "",
          },
        )}
        style={{ y }}
        drag="y"
        dragControls={controls}
        onDragEnd={(_, info) => {
          if (info.offset.y > 60) {
            onCloseAnimation();
          }
        }}
        dragListener={false}
        dragConstraints={{
          top: 0,
          bottom: 0,
        }}
        ref={containerRef}
        dragElastic={{
          top: 0,
          bottom: 0.5,
        }}
      >
        <FocusTrap
          active={uuidState === ""}
          focusTrapOptions={{
            allowOutsideClick: true,
          }}
        >
          <div className="w-full h-full" tabIndex={-1}>
            <TipUi controls={controls} />
            <div className="  w-full">{children}</div>
          </div>
        </FocusTrap>
      </motion.div>
      <motion.div
        id="backDrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut" }}
        onClick={onCloseAnimation}
        aria-hidden
        className={clsx("fixed  top-0 left-0 bottom-0 right-0 bg-overlay", {
          hidden: uuidState !== "",
        })}
      ></motion.div>
    </div>
  );
}

function ToggleContent({
  parentRef,
  staticDrop,
  staticUp,
  children,
}: ToggleContentProps) {
  const { device } = useDeviceContext();

  return device !== "mobile" ? (
    <ToggleContentFloat
      parentRef={parentRef}
      staticDrop={staticDrop}
      staticUp={staticUp}
    >
      {children}
    </ToggleContentFloat>
  ) : (
    <ToggleContentMobile>{children}</ToggleContentMobile>
  );
}

export default ToggleContent;
