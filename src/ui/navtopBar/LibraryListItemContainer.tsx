import { useQuery } from "@tanstack/react-query";
import { getUserLibClient } from "@/database/client-data";
import { Virtuoso } from "react-virtuoso";
import SingleItemList from "../general/SingleItemRow/SingleItemList";
import VirtuosoLoaderSingleItemList from "../general/VirtuosoLoader/VirtuosoLoaderSingleItemList";

function LibraryListItemContainer() {
  const { data: queryData, error: queryError } = useQuery({
    queryKey: ["user-library"],
    queryFn: () => getUserLibClient(),
  });
  const { data, error } = queryData || {};
  if (!data || error || queryError) return;
  const { userLib } = data;
  if (!userLib) return;
  return (
    <div className=" relative  w-full h-full">
      <VirtuosoLoaderSingleItemList length={userLib.idArray.length} />
      <div className=" w-full h-full will-change-scroll  ">
        <Virtuoso
          increaseViewportBy={{ top: 240, bottom: 240 }}
          style={{ height: "100%" }}
          className=" will-change-scroll scroll-container"
          fixedItemHeight={64}
          defaultItemHeight={64}
          totalCount={userLib.idArray.length}
          itemContent={(index) => {
            const id = userLib.idArray[index];
            const item = userLib.byId[id];
            return (
              <SingleItemList
                className="bg-section"
                key={item.id}
                list={item}
              />
            );
          }}
        />
      </div>
    </div>
  );
}

export default LibraryListItemContainer;
