"use client";
import OverLay from "./OverLay";
import NavSideLink from "./NavSideLink";
import { ReactNode, useRef, useState } from "react";
import NavListUlWrapper from "./NavListUlWrapper";
import { ListMusic, Menu } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

import NavSideLinkNotOpen from "./NavSideLinkNotOpen";
import PlaylistAdd from "./PlaylistAdd";
import PlaylistFolderContainer from "./PlaylistFolderContainer";
import { useTranslations } from "next-intl";
import ContextContainerHeight from "../Footer/audioFull/ContextContainerHeight";

interface childrenProp {
  childrenExplore: ReactNode;
  childrenLive: ReactNode;
  childrenPlaylist: ReactNode;
  childrenLogo: ReactNode;
}
function NavList({
  childrenExplore,
  childrenLive,
  childrenPlaylist,
  childrenLogo,
}: childrenProp) {
  const b = useTranslations("block");
  const containerHeightRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <div className=" w-full  ">
      <ul className="fixed w-[70px] top-0  box-border left-0 h-[70px] md:h-full flex  flex-col gap-x-1   rounded-b-sm">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
          tabIndex={open ? -1 : 0}
          className=" w-[70px]  cursor-pointer border-none  h-[70px] min-h-[70px]  flex items-center justify-center "
        >
          {/* open */}
          <IconWrapper size="large" Icon={Menu} />
        </button>

        <div className=" h-full border-r border-seperate-soft">
          <NavSideLinkNotOpen hrefString="/explore">
            {childrenExplore}
          </NavSideLinkNotOpen>
          <NavSideLinkNotOpen hrefString="/live">
            {childrenLive}
          </NavSideLinkNotOpen>

          <NavSideLinkNotOpen hrefString="/library">
            {childrenPlaylist}
          </NavSideLinkNotOpen>
        </div>
      </ul>

      <NavListUlWrapper
        open={open}
        setOpen={setOpen}
        childrenLogo={childrenLogo}
      >
        <div className="overflow-auto will-change-scroll flex-1  flex flex-col py-3  ">
          {/*  will-change-scroll for hardware acceleration , without this , it feels junky in chrome and some webkit browser */}

          <NavSideLink
            url="/explore"
            desp={b("navLink.exploreDescription")}
            open={open}
            setOpen={setOpen}
          >
            {childrenExplore}
          </NavSideLink>
          <NavSideLink
            url="/live"
            desp={b("navLink.liveDescription")}
            open={open}
            setOpen={setOpen}
          >
            {childrenLive}
          </NavSideLink>
          <div className="h-[50px] flex items-center justify-between  ">
            <NavSideLink url="/library" desp="" open={open} setOpen={setOpen}>
              <div className=" w-[70px] flex items-center  justify-center">
                <IconWrapper size="large" Icon={ListMusic} />
              </div>
            </NavSideLink>
            <PlaylistAdd stackNum={1} />
          </div>
          <ContextContainerHeight containerHeightRef={containerHeightRef}>
            <div className="w-full h-full" ref={containerHeightRef}>
              {open && <PlaylistFolderContainer />}
            </div>
          </ContextContainerHeight>
        </div>
      </NavListUlWrapper>

      {open && <OverLay setOpen={setOpen} className="bg-overlay" />}
    </div>
  );
}

export default NavList;
