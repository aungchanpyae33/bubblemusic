import { getTranslations } from "next-intl/server";
import IconWrapper from "../general/IconWrapper";
import { SearchCheck } from "lucide-react";

async function SearchKeywordInfo({ query }: { query: string }) {
  const b = await getTranslations("block");
  return (
    <div className="p-2 text-ink-400 flex gap-2">
      <IconWrapper Icon={SearchCheck} className=" shrink-0 " />
      <div className=" truncate">
        {b("searchPage.searchResultFor", { searchKeyword: `"${query}"` })}
      </div>
    </div>
  );
}

export default SearchKeywordInfo;
