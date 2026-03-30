import SafariStringPlaceHolderNoVisiable from "../SafariStringPlaceHolderNoVisiable/SafariStringPlaceHolderNoVisiable";
import MainLoading from "./MainLoading";

function AppLoading() {
  return (
    <div className=" flex gap-3 flex-col justify-center  min-h-screen max-h-screen items-center">
      <SafariStringPlaceHolderNoVisiable />
      <MainLoading />
    </div>
  );
}

export default AppLoading;
