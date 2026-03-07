import React, { ReactNode } from "react";

import clsx from "clsx";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

interface LinkProps {
  url: string;
  icon: string;
  desp: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
function NavSideLink({ url, icon, desp, open, setOpen, children }: LinkProps) {
  return (
    <li className="h-[70px] ">
      <NoThankYouPreFetchLink
        href={url}
        className="h-full  relative flex"
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
      >
        {children}
        <div
          className={clsx(
            "flex w-[150px] min-w-[150px] max-w-[150px] items-center    justify-start h-full",
          )}
        >
          {desp !== "" && (
            <div className=" truncate leading-relaxed ">{desp}</div>
          )}
        </div>
      </NoThankYouPreFetchLink>
    </li>
  );
}

export default NavSideLink;
