import { getTranslations } from "next-intl/server";
import CategoryContainer from "./CategoryContainer";
import CategoryItem from "./CategoryItem";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

interface CategoryItem {
  id: string;
  name: string;
}
export type CategoryContainerProps = CategoryItem[] | null;
async function GenreContainer({
  genreList,
}: {
  genreList: CategoryContainerProps;
}) {
  if (!genreList) return null;
  const g = await getTranslations("Genre");
  return (
    <CategoryContainer>
      {genreList.map((item) => {
        return (
          <NoThankYouPreFetchLink key={item.id} href={`/genre/${item.id}`}>
            <CategoryItem>{g(item.name)}</CategoryItem>
          </NoThankYouPreFetchLink>
        );
      })}
    </CategoryContainer>
  );
}

export default GenreContainer;
