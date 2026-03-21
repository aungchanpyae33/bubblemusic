import clsx from "clsx";
import { ReactNode, SetStateAction, useRef } from "react";
import NavSidebarToggle from "./NavSideBarToggle";
import useFocusOnOpen from "@/lib/CustomHooks/useFocusOnOpen";
import ContextMoreOptionStack from "@/Context/ContextMoreOptionStack";
import FocusTrap from "../general/FocusTrap";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

interface NavSideListOpenWrapperProp {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  childrenLogo: ReactNode;
}
function NavSideListOpenWrapper({
  open,
  setOpen,
  children,
  childrenLogo,
}: NavSideListOpenWrapperProp) {
  const ulRef = useRef<HTMLUListElement>(null);
  useFocusOnOpen(open, ulRef);
  return (
    <FocusTrap refFocus={ulRef} open={open}>
      <ContextMoreOptionStack>
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
          tabIndex={0}
        >
          <li className="h-[70px] relative   flex border-b border-seperate-soft">
            <NavSidebarToggle setOpen={setOpen} open={open} />
            <NoThankYouPreFetchLink
              href="/"
              className={clsx(
                "flex flex-1  items-center   justify-start  h-[70px]",
              )}
            >
              {childrenLogo}
            </NoThankYouPreFetchLink>
          </li>
          {children}
        </ul>
      </ContextMoreOptionStack>
    </FocusTrap>
  );
}

export default NavSideListOpenWrapper;
