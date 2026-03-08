import ContextContainer from "./ContextContainer";
import ArrowNaviContainer from "./ArrowNaviContainer";
import SonglistsContainer from "../playlist/SonglistsContainer";
import SonglistWrapper from "./SonglistWrapper";
import type { GetAllMediaItems } from "@/database/data-types-return";
import type { listInfo } from "../../../database.types-fest";
import { getTranslations } from "next-intl/server";
import ListGeneralHeader from "./ListGeneralHeader";
async function Container({
  songs,
  description,
}: {
  songs: GetAllMediaItems[keyof GetAllMediaItems];
  description: string;
}) {
  const l = await getTranslations("ListTitle");
  if (!songs || songs.idArray.length === 0) return;
  return (
    <ContextContainer>
      <div aria-label="song name is" className=" justify-between px-4  flex ">
        <ListGeneralHeader>{l(description)}</ListGeneralHeader>
        <ArrowNaviContainer />
      </div>
      <div className="relative z-0 max-w-fit">
        <SonglistWrapper>
          {songs.idArray.map((id, index) => {
            const item = songs.byId[`${id}`];
            return (
              <SonglistsContainer
                index={index}
                key={item.id}
                list={item as listInfo}
              />
            );
          })}
        </SonglistWrapper>
      </div>
    </ContextContainer>
  );
}

export default Container;
