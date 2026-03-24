import { getTranslations } from "next-intl/server";
import CategoryContainer from "./CategoryContainer";
import { CategoryContainerProps } from "./GenreContainer";
import CategoryItem from "./CategoryItem";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

async function MoodContainer({
  moodList,
}: {
  moodList: CategoryContainerProps;
}) {
  if (!moodList) return null;
  const mood = await getTranslations("Mood");
  return (
    <CategoryContainer>
      {moodList.map((item) => {
        return (
          <NoThankYouPreFetchLink key={item.id} href={`/mood/${item.id}`}>
            <CategoryItem key={item.id}>{mood(item.name)}</CategoryItem>
          </NoThankYouPreFetchLink>
        );
      })}
    </CategoryContainer>
  );
}

export default MoodContainer;
