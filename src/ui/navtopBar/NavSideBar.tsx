import NavList from "./NavList";
import { Compass, ListMusic, Radio } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import Logo from "../icon/Logo";

async function NavSideBar() {
  // const deviceFromUserAgent = await DeviceCheck();

  return (
    <div className="w-[70px] bg-section ">
      <NavList
        childrenLogo={<Logo width={90} height={70} />}
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
