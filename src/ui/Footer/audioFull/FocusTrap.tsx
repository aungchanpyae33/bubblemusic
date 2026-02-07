import { ReactNode, RefObject, useEffect } from "react";

interface Props extends React.ComponentProps<"div"> {
  refFocus: RefObject<HTMLElement | null>;
  children: ReactNode;
  open?: boolean; //if not provided , focus trap is only avaible in mounted , if provided , focus trap is avaible in screen all the time (ex: navsidebar toggle)
}

function FocusTrap({ children, refFocus, open }: Props) {
  useEffect(() => {
    let lastClickMustBeToCloe = false;
    const container = refFocus.current;
    if (!container) return;

    // Helper to get CURRENT focusable elements in the DOM including hidden ones
    const getFreshElementsAll = () => {
      const selector =
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details, [tabindex]:not([tabindex="-1"])';
      const elements = Array.from(
        container.querySelectorAll(selector),
      ) as HTMLElement[];
      return elements;
    };

    // Helper to get CURRENT focusable elements in the DOM
    const getFreshElements = () => {
      const selector =
        'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details, [tabindex]:not([tabindex="-1"])';
      const elements = Array.from(
        container.querySelectorAll(selector),
      ) as HTMLElement[];

      // Filter for visibility (offsetParent is null if element or parent is display: none)
      return elements.filter((el) => el.offsetParent !== null);
    };

    // to handle when lastElement is focus and then resize the window to some breakpoint , as it loss focus state which can lead to break focus trap

    function handleOut(e: FocusEvent) {
      // if focus loss is cause by tab key , return it
      if (e.relatedTarget) {
        return;
      }

      // check if last element is on the screen or not
      const elements = getFreshElementsAll();
      if (elements.length === 0) return;
      const lastElement = elements[elements.length - 1];
      if (lastElement.offsetParent === null) {
        lastClickMustBeToCloe = true;
      }
    }

    function handleKeydown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;

      const elements = getFreshElements();
      if (elements.length === 0) return;

      const firstElement = elements[0];
      if (!e.shiftKey && lastClickMustBeToCloe) {
        firstElement.focus();
        lastClickMustBeToCloe = false;
        return;
      }
      const lastElement = elements[elements.length - 1];

      // Shift + Tab on the first element -> Wrap to the last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab on the last element -> Wrap to the first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
    if (open === false) return;
    document.body.addEventListener("focusout", handleOut);
    document.body.addEventListener("keydown", handleKeydown);
    return () => {
      document.body.removeEventListener("focusout", handleOut);
      document.body.removeEventListener("keydown", handleKeydown);
    };
  }, [refFocus, open]);

  return <>{children}</>;
}

export default FocusTrap;
