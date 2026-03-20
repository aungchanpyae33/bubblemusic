import { Compass, ListMusic, Radio } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import Logo from "./Logo";
import NavSideList from "./NavSideList";

async function NavSideBar() {
  return (
    <div className="w-[70px] bg-section ">
      <NavSideList
        childrenLogo={<Logo />}
        childrenExplore={
          <div className=" w-[70px] max-w-[70px] h-[70px]   flex items-center justify-center     ">
            <IconWrapper size="large" Icon={Compass} />
          </div>
        }
        childrenLive={
          <div className=" w-[70px]  h-[70px]  flex items-center justify-center  ">
            <IconWrapper size="large" Icon={Radio} />
          </div>
        }
        childrenPlaylist={
          <div className=" w-[70px] h-[70px]  flex items-center justify-center  ">
            <IconWrapper size="large" Icon={ListMusic} />
          </div>
        }
      />
    </div>
  );
}

export default NavSideBar;
