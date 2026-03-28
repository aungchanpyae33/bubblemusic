import type { listInfo } from "../../../../database.types-fest";
import ImageBox from "../ListRow/ImageBox";
import SingleItemRow from "./SingleItemRow";
import SingleItemInfo from "./SingleItemInfo";
import ListOption from "@/ui/ListContainer/ListOption";
import { PlayButtonOverlayOnImage } from "@/lib/StyleUtils/tailwindStyle";
import { ComponentProps } from "react";
import DirectPlayButton from "../TogglePlayButton/DirectPlayButton";
interface SingleItemListProps extends ComponentProps<"div"> {
  list: listInfo;
}
function SingleItemList({ list, ...props }: SingleItemListProps) {
  return (
    <SingleItemRow {...props}>
      <ImageBox name={list.name} cover_url={list.cover_url} type={list.type}>
        {list.type !== "profile" && (
          <DirectPlayButton
            size="exSmall"
            className={PlayButtonOverlayOnImage}
            listId={list.id}
            type={list.type}
          />
        )}
      </ImageBox>
      <SingleItemInfo list={list} />
      <ListOption list={list} />
    </SingleItemRow>
  );
}

export default SingleItemList;
