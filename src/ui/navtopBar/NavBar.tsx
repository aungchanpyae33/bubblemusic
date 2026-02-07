import SearchBar from "../searchBar/SearchBar";
import UserInfo from "../user/UserInfo";
import NavSideBar from "./NavSideBar";
import { Suspense } from "react";
import Logo from "../icon/Logo";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
function NavBar() {
  return (
    <nav className="navBarContainer bg-section flex w-full   h-[70px] z-10   items-center justify-between border-opacity-15  border-b border-seperate-soft ">
      <Suspense fallback={<div className=" w-[160px] h-[70px]"></div>}>
        <div className="flex  w-[160px]">
          <NavSideBar />
          <div className="logo relative   w-[90px] h-[70px] flex items-center    bg-gradient-to-r">
            <NoThankYouPreFetchLink
              href={"/"}
              className=" flex items-center w-full h-full"
            >
              <Logo width={90} height={70} />
            </NoThankYouPreFetchLink>
          </div>
        </div>
      </Suspense>

      <div className=" flex-1  z-20  text-end">
        <SearchBar />
      </div>

      <div className="max-w-[200px]  w-[20%] flex justify-end pr-4">
        <UserInfo />
      </div>
    </nav>
  );
}

export default NavBar;
