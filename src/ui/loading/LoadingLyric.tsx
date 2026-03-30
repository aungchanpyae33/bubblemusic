import { useTranslations } from "next-intl";
import MainLoading from "./MainLoading";

function LoadingLyric() {
  const l = useTranslations("Loading");
  return (
    <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <MainLoading />
      <span className="whitespace-nowrap animate-pulse">
        {l("loadingLyric")}
      </span>
    </div>
  );
}

export default LoadingLyric;
