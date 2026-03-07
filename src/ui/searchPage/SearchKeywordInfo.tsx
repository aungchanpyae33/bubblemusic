import { getTranslations } from "next-intl/server";

async function SearchKeywordInfo({ query }: { query: string }) {
  const b = await getTranslations("block");
  return (
    <div className="p-2">
      {b("searchPage.searchResultFor", { searchKeyword: `"${query}"` })}
    </div>
  );
}

export default SearchKeywordInfo;
