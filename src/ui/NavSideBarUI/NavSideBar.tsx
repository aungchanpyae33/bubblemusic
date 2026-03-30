import { Compass, Heart, ListMusic } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import NavSideList from "./NavSideList";
import Logo from "../NavtopBar/Logo";

function NavSideBar() {
  return (
    <div className="w-[70px] bg-section ">
      <NavSideList
        childrenLogo={<Logo />}
        childrenExplore={
          <div className=" size-16 flex items-center justify-center     ">
            <IconWrapper size="large" Icon={Compass} />
          </div>
        }
        childrenLike={
          <div className=" size-16 flex items-center justify-center  ">
            <IconWrapper size="large" Icon={Heart} />
          </div>
        }
        childrenPlaylist={
          <div className=" size-16 flex items-center justify-center  ">
            <IconWrapper size="large" Icon={ListMusic} />
          </div>
        }
      />
    </div>
  );
}

export default NavSideBar;
