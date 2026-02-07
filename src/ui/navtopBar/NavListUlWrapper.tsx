import clsx from "clsx";
import { ReactNode, SetStateAction, useRef } from "react";
import NavSidebarToggle from "./NavSideBarToggle";
import FocusTrap from "../Footer/audioFull/FocusTrap";
import MoreOptionStackContext from "../trackComponent/MoreOptionStackContext";
import useFocusOnOpen from "@/lib/CustomHooks/useFocusOnOpen";

interface NavListUlWrapperProp {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  childrenLogo: ReactNode;
}
function NavListUlWrapper({
  open,
  setOpen,
  children,
  childrenLogo,
}: NavListUlWrapperProp) {
  const ulRef = useRef<HTMLUListElement>(null);
  useFocusOnOpen(open, ulRef);
  return (
    <FocusTrap refFocus={ulRef} open={open}>
      <MoreOptionStackContext>
        <ul
          className={clsx(
            "fixed bg-section border-r border-seperate-soft  top-0 z-40 box-border w-[280px]  max-w-[280px]  left-0 h-full flex duration-200   transition-[transform,visibility] flex-col gap-1  rounded-b-sm",
            {
              // to remove from tab order
              "-translate-x-full invisible": !open,
              "translate-x-0 visible": open,
            },
          )}
          ref={ulRef}
          aria-hidden={!open}
          tabIndex={0}
        >
          <li className="h-[70px] relative   flex border-b border-seperate-soft">
            <NavSidebarToggle setOpen={setOpen} open={open} />
            <button
              className={clsx(
                "flex flex-1 items-center   justify-start  h-[70px]",
              )}
              aria-hidden={true}
            >
              {childrenLogo}
            </button>
          </li>
          {children}
        </ul>
      </MoreOptionStackContext>
    </FocusTrap>
  );
}

export default NavListUlWrapper;
