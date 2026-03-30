import SafariStringPlaceHolderNoVisiable from "../SafariStringPlaceHolderNoVisiable/SafariStringPlaceHolderNoVisiable";
import MainLoading from "./MainLoading";

function PageLoading() {
  return (
    <div className=" flex gap-3 flex-col justify-center h-96 items-center">
      <SafariStringPlaceHolderNoVisiable />
      <MainLoading />
    </div>
  );
}

export default PageLoading;
