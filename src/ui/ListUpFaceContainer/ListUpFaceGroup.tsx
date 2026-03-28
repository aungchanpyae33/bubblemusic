import type { GetAllMediaItems } from "@/database/data-types-return";
import { getTranslations } from "next-intl/server";
import ListUpFaceContainerWrapper from "./ListUpFaceContainerWrapper";
import ArrowNaviContainer from "./ArrowNaviContainer";
import ListUpFaceContainer from "./ListUpFaceContainer";
import ContextContainer from "@/Context/ContextContainer";
import ListGeneralHeader from "../general/ListInfoGeneral/ListGeneralHeader";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
async function ListUpFaceGroup({
  list,
  description,
  showMore,
  href,
}: {
  list: GetAllMediaItems[Exclude<keyof GetAllMediaItems, "trendingSongs">];
  description: string;
  showMore?: boolean;
  href?: string;
}) {
  const l = await getTranslations("ListTitle");
  if (!list || list.idArray.length === 0) return;
  return (
    <ContextContainer>
      <div className=" justify-between px-4  flex ">
        <ListGeneralHeader>{l(description)}</ListGeneralHeader>
        <ArrowNaviContainer>
          {showMore && href && list.idArray.length > 7 && (
            <UnderLineLinkHover href={href}>{l("showMore")}</UnderLineLinkHover>
          )}
        </ArrowNaviContainer>
      </div>
      <div className="relative z-0 max-w-fit">
        <ListUpFaceContainerWrapper>
          {list.idArray.map((id, index) => {
            if (showMore && index === 7) return;
            const item = list.byId[id];
            return <ListUpFaceContainer key={item.id} list={item} />;
          })}
        </ListUpFaceContainerWrapper>
      </div>
    </ContextContainer>
  );
}

export default ListUpFaceGroup;
