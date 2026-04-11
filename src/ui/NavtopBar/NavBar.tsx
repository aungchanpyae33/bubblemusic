import SearchBar from "../searchBar/SearchBar";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import Logo from "./Logo";
import NavSideBar from "../NavSideBarUI/NavSideBar";
import AuthCheckRender from "./AuthCheckRender";
function NavBar() {
  return (
    <nav className="bg-section flex w-full h-[70px] z-10 items-center justify-between">
      <div className="flex border-opacity-15 h-full  border-b border-seperate-soft  w-[160px]">
        <NavSideBar />
        <div className="logo relative w-[90px] h-full flex items-center    bg-gradient-to-r">
          <NoThankYouPreFetchLink
            href={"/"}
            className=" flex items-center w-full h-full"
          >
            <Logo />
          </NoThankYouPreFetchLink>
        </div>
      </div>

      <div className="border-b border-seperate-soft h-full flex-1 z-20 text-end">
        <SearchBar />
      </div>

      <div className="max-w-[200px] border-b border-seperate-soft h-full w-[20%] min-w-fit flex items-center justify-end pr-4">
        <AuthCheckRender />
      </div>
    </nav>
  );
}

export default NavBar;
