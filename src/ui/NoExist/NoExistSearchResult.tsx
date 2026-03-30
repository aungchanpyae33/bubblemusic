import { useTranslations } from "next-intl";
import { CircleSlash, Search } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import SearchResultContainer from "../searchBar/SearchResultContainer";

function NoExistSearchResult() {
  const w = useTranslations("Warning");
  return (
    <SearchResultContainer>
      <div className="p-2 sm:pl-4  relative rounded h-[45px] flex items-center cursor-pointer">
        <div className=" sm:hidden  w-[58px] pl-1 h-full flex items-center">
          <IconWrapper Icon={Search} size="small" />
        </div>

        <div className=" text-ink-400 flex-1 min-w-0 flex gap-3 items-center  ">
          <div className="flex-1 truncate">{w("noSearchResult")}</div>
          <IconWrapper Icon={CircleSlash} className="fill-error" size="small" />
        </div>
      </div>
    </SearchResultContainer>
  );
}

export default NoExistSearchResult;
