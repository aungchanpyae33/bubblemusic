import type { GetAllMediaItems } from "@/database/data-types-return";
import { getTranslations } from "next-intl/server";
import ListGeneralHeader from "../albumContainer/ListGeneralHeader";
import ListUpFaceContainerWrapper from "./ListUpFaceContainerWrapper";
import ContextContainer from "../albumContainer/ContextContainer";
import ArrowNaviContainer from "./ArrowNaviContainer";
import ListUpFaceContainer from "./ListUpFaceContainer";
async function ListUpFaceGroup({
  list,
  description,
}: {
  list: GetAllMediaItems[Exclude<keyof GetAllMediaItems, "trendingSongs">];
  description: string;
}) {
  const l = await getTranslations("ListTitle");
  if (!list || list.idArray.length === 0) return;
  return (
    <ContextContainer>
      <div className=" justify-between px-4  flex ">
        <ListGeneralHeader>{l(description)}</ListGeneralHeader>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <ListUpFaceContainerWrapper>
          {list.idArray.map((id) => {
            const item = list.byId[id];
            return <ListUpFaceContainer key={item.id} list={item} />;
          })}
        </ListUpFaceContainerWrapper>
      </div>
    </ContextContainer>
  );
}

export default ListUpFaceGroup;
