import { getTranslations } from "next-intl/server";

async function SearchListContainerTitle({ title }: { title: string }) {
  const l = await getTranslations("ListTitle");
  return <h3 className=" text-lg font-bold p-2">{l(title)}</h3>;
}

export default SearchListContainerTitle;
