import clsx from "clsx";
import { ReactNode, SetStateAction, useRef } from "react";
import NavSidebarToggle from "./NavSideBarToggle";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import { FocusTrap } from "focus-trap-react";
import useCloseFunctoion from "@/lib/CustomHooks/useCloseFunction";

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
  useCloseFunctoion(open, () => setOpen(false), ulRef);

  return (
    <FocusTrap
      active={open}
      focusTrapOptions={{
        allowOutsideClick: true,
      }}
    >
      <ul
        className={clsx(
          "fixed bg-section border-r border-seperate-soft  top-0 z-40 box-border w-[280px]  max-w-[280px]  left-0 h-full flex duration-200   transition-transform flex-col gap-1  rounded-b-sm",
          {
            // to remove from tab order
            "-translate-x-full": !open,
            "translate-x-0": open,
          },
        )}
        ref={ulRef}
        tabIndex={0}
        inert={!open ? true : false}
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
    </FocusTrap>
  );
}

export default NavSideListOpenWrapper;
