"use client";

import NavSideLink from "./NavSideLink";
import { ReactNode, useRef, useState } from "react";
import { Menu } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

import NavSideLinkNotOpen from "./NavSideLinkNotOpen";
import { useTranslations } from "next-intl";
import LibraryListItemContainer from "./LibraryListItemContainer";
import NavSideListOpenWrapper from "./NavSideListOpenWrapper";
import ContextContainerHeight from "@/Context/ContextContainerHeight";
import OverLay from "../general/overlay/OverLay";
import InitCreateButton from "../PlaylistForm/InitCreateButton";
import { useUserInfoContext } from "@/Context/ContextUserInfo";
import NeedToSignInSideBar from "./NeedToSignInSideBar";

interface NavSideListProps {
  childrenExplore: ReactNode;
  childrenLike: ReactNode;
  childrenPlaylist: ReactNode;
  childrenLogo: ReactNode;
}
function NavSideList({
  childrenExplore,
  childrenLike,
  childrenPlaylist,
  childrenLogo,
}: NavSideListProps) {
  const b = useTranslations("block");
  const containerHeightRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { userInfo } = useUserInfoContext();
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
          className=" w-[70px] cursor-pointer h-[70px] min-h-[70px] flex items-center justify-center"
        >
          {/* open */}
          <IconWrapper size="large" Icon={Menu} />
        </button>

        <div className=" h-full border-r border-seperate-soft">
          <NavSideLinkNotOpen hrefString="/explore">
            {childrenExplore}
          </NavSideLinkNotOpen>
          <NavSideLinkNotOpen hrefString="/playlist/like">
            {childrenLike}
          </NavSideLinkNotOpen>

          <NavSideLinkNotOpen hrefString="/library/overview">
            {childrenPlaylist}
          </NavSideLinkNotOpen>
        </div>
      </ul>

      <NavSideListOpenWrapper
        open={open}
        setOpen={setOpen}
        childrenLogo={childrenLogo}
      >
        <div className="overflow-auto will-change-scroll flex-1  flex flex-col">
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
            url="/playlist/like"
            desp={b("navLink.likeDescription")}
            open={open}
            setOpen={setOpen}
          >
            {childrenLike}
          </NavSideLink>
          <div className="flex items-center relative justify-between w-full  ">
            <NavSideLink
              url="/library/overview"
              desp={b("navLink.libraryDescription")}
              open={open}
              setOpen={setOpen}
            >
              {childrenPlaylist}
            </NavSideLink>
            <InitCreateButton />
          </div>

          <ContextContainerHeight containerHeightRef={containerHeightRef}>
            <div className="w-full h-full" ref={containerHeightRef}>
              {open && userInfo ? (
                <LibraryListItemContainer />
              ) : (
                <NeedToSignInSideBar />
              )}
            </div>
          </ContextContainerHeight>
        </div>
      </NavSideListOpenWrapper>

      {open && <OverLay setOpen={setOpen} className="bg-overlay" />}
    </div>
  );
}

export default NavSideList;
