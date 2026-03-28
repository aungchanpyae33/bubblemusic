import SearchBar from "../searchBar/SearchBar";
import { Suspense } from "react";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import Logo from "./Logo";
import NavSideBar from "../NavSideBarUI/NavSideBar";
import AuthCheckRender from "./AuthCheckRender";
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
              <Logo />
            </NoThankYouPreFetchLink>
          </div>
        </div>
      </Suspense>

      <div className=" flex-1 z-20  text-end">
        <SearchBar />
      </div>

      <div className="max-w-[200px] w-[20%] min-w-fit flex justify-end pr-4">
        <AuthCheckRender />
      </div>
    </nav>
  );
}

export default NavBar;
