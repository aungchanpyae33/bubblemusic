"use client";
import OverLay from "./OverLay";
import NavSideLink from "./NavSideLink";
import { ReactNode, useState } from "react";
import NavListUlWrapper from "./NavListUlWrapper";
import { ListMusic, Menu } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

import NavSideLinkNotOpen from "./NavSideLinkNotOpen";
import PlaylistAdd from "./PlaylistAdd";
import PlaylistFolderContainer from "./PlaylistFolderContainer";

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
  // console.log("render");
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
        <div className="overflow-auto flex-1  flex flex-col py-3  ">
          {/*  will-change-scroll for hardware acceleration , without this , it feels junky in chrome and some webkit browser */}

          <NavSideLink
            url="/explore"
            icon="icon"
            desp="စုံလင်စွာရှာဖွေရန်"
            open={open}
            setOpen={setOpen}
          >
            {childrenExplore}
          </NavSideLink>
          <NavSideLink
            url="/live"
            icon="icon"
            desp="တိုက်ရိုက်လိုက်ဖ်"
            open={open}
            setOpen={setOpen}
          >
            {childrenLive}
          </NavSideLink>
          <div className="h-[50px] flex items-center justify-between  ">
            <NavSideLink
              url="/library"
              icon="icon"
              desp=""
              open={open}
              setOpen={setOpen}
            >
              <div className=" w-[70px] flex items-center  justify-center">
                <IconWrapper size="large" Icon={ListMusic} />
              </div>
            </NavSideLink>
            <PlaylistAdd stackNum={1} />
          </div>
          <PlaylistFolderContainer open={open} setOpen={setOpen} />
        </div>
      </NavListUlWrapper>

      {open && <OverLay setOpen={setOpen} className="bg-overlay" />}
    </div>
  );
}

export default NavList;
