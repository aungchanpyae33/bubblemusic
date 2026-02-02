import { RefObject, useLayoutEffect, useRef, useState } from "react";
import { CSSProperties } from "react";
import throttle from "../throttle";
import debounce from "../debounce";

type PositionStyle = CSSProperties;

function calcMenuPosition(
  parentEl: HTMLElement | null,
  containerEl: HTMLElement | null,
  viewportWidthStoreRef: RefObject<number | null>,
  viewportHeightStoreRef: RefObject<number | null>,
  staticDrop?: boolean,
  staticUp?: boolean,
): PositionStyle | undefined {
  // parent is vertical icon cantainer
  // container is content
  if (!parentEl || !containerEl) {
    return { transform: "translate(0px, 0px)" };
  }
  // always use clientWidth and clientHeight when accurate positin is needed like for toggleTip(fixed position)
  // previouse windowidth is not accurate in windowWidth including scrollbar width and aslo inconsistent in resize
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  if (
    viewportWidthStoreRef.current === viewportWidth &&
    viewportHeightStoreRef.current === viewportHeight
  ) {
    return;
  } else {
    viewportWidthStoreRef.current = viewportWidth;
    viewportHeightStoreRef.current = viewportHeight;
  }
  const targetRect = parentEl.getBoundingClientRect();
  const containerRect = containerEl.getBoundingClientRect();

  const targetTop = targetRect.top;
  const targetLeft = targetRect.left;
  const targetRight = targetRect.right;
  const targetBottom = targetRect.bottom;
  const containerHeight = containerRect.height;
  const containerWidth = containerRect.width;
  if (staticDrop) {
    const x = targetRight - containerWidth;
    const y = targetBottom + 4; // add 4 px space below
    const roundedY = Math.max(Math.round(y), 0);
    const roundedX = Math.max(Math.round(x), 0);
    return {
      transform: `translate(${roundedX}px, ${roundedY}px)`,
    };
  }

  if (staticUp) {
    const x = targetRight - containerWidth;
    const y = targetTop - 4; // add 4 px space above
    const roundedY = Math.max(Math.round(y), 0);
    const roundedX = Math.max(Math.round(x), 0);
    return {
      transform: `translate(${roundedX}px, ${roundedY}px)`,
    };
  }

  // calculate how many space is left in below when position in top is not available
  const spaceBelow = viewportHeight - targetBottom;
  //calculate how many space is left in right when postion is left is not available

  const spaceRight = viewportWidth - targetRight;

  // i wll add comment in modify , new , previouse code to explain what is it for future as in later i forget how it works in some component

  // how x component is calculate
  // it has  check -> first check is space not available in right, if not available check becomes false, then go the second option, it avalile in right( first check is false) go option to right
  const x = (() => {
    const notSpaceAvailableInRight = spaceRight < containerWidth;
    if (notSpaceAvailableInRight) {
      //in left side option mind

      // in resize , this check does target item is not in viewport or not for resize behavior
      const isTargetItemNotInViewPort = viewportWidth - targetRight <= 0;
      if (isTargetItemNotInViewPort) {
        // then return the targetLeft with reduce version
        // spaceRight is necessary to maintain the correct position when target is not is the view port(ususally with -value)
        return targetLeft - (containerWidth - spaceRight);
      } else {
        // if target item is in viewport still , then return relative positino
        return targetLeft - containerWidth;
      }
    } else {
      // right side option mind
      return targetRight;
    }
  })();

  // how y component is calculate
  // it has  check -> first check is  space not available in bottom, if not available check becomes false, then go the second option, it avalile in bottom( first check is false) go option to bottom
  const y = (() => {
    const notSpaceAvailableInBelow = spaceBelow < containerHeight;
    if (notSpaceAvailableInBelow) {
      // top side option in mind

      // in resize , this check does target item is not in viewport or not for resize behavior
      const isTargetItemNotInViewPort = viewportHeight - targetBottom <= 0;
      if (isTargetItemNotInViewPort) {
        // then return the targetLeft with reduce version
        // spaceBelow is necessary to maintain the correct position when target is not is the view port(ususally with -value)
        return targetBottom - (containerHeight - spaceBelow);
      } else {
        // if target item is in viewport still , then return relative positino
        return targetBottom - containerHeight;
      }
    } else {
      //  bottom side option mind
      return targetTop;
    }
  })();

  const roundedY = Math.max(Math.round(y), 0);
  const roundedX = Math.max(Math.round(x), 0);

  return {
    transform: `translate(${roundedX}px, ${roundedY}px)`,
  };
}

export const useToggleContentPosition = ({
  parentRef,
  containerRef,
  staticDrop,
  staticUp,
}: {
  parentRef: RefObject<HTMLButtonElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  staticDrop?: boolean;
  staticUp?: boolean;
}): [PositionStyle, React.Dispatch<React.SetStateAction<PositionStyle>>] => {
  const [position, setPosition] = useState<PositionStyle>({
    transform: "translate(0px, 0px)",
  });
  const viewportWidthStoreRef = useRef(null);
  const viewportHeightStoreRef = useRef(null);
  // now , it will be run as sub content when available , because of that , if 3 sub content is open (currently only two) , the resize could be expensive for 3 run , so right now throttle will be add  to prevent lag in low performance machine

  // the reason i use use layout effect is obvious , that to run this effect before the layout pain , because i need to the content width , height , etc before paint to calculate the position of its to render
  useLayoutEffect(() => {
    const update = () => {
      const newPos = calcMenuPosition(
        parentRef.current,
        containerRef.current,
        viewportWidthStoreRef,
        viewportHeightStoreRef,
        staticDrop,
        staticUp,
      );
      if (!newPos) return;
      setPosition(newPos);
    };

    const throttledUpdate = throttle(update, 80);
    const debouncedUpdate = debounce(update, 200);

    // run immediately
    throttledUpdate();

    window.addEventListener("resize", throttledUpdate);
    window.addEventListener("resize", debouncedUpdate);

    return () => {
      window.removeEventListener("resize", throttledUpdate);
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, [parentRef, containerRef, staticUp, staticDrop]);

  return [position, setPosition];
};
