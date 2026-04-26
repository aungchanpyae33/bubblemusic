import React, { ReactNode } from "react";

import clsx from "clsx";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

interface LinkProps {
  url: string;
  desp: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}
function NavSideLink({ url, desp, setOpen, children }: LinkProps) {
  return (
    <li className="h-16 w-full">
      <NoThankYouPreFetchLink
        href={url}
        className="h-full hover:bg-surface-2    relative flex"
        onClick={() => setOpen(false)}
      >
        {children}
        <div className={clsx("flex flex-1 items-center  justify-start h-full")}>
          {desp !== "" && <div className=" truncate">{desp}</div>}
        </div>
      </NoThankYouPreFetchLink>
    </li>
  );
}

export default NavSideLink;
