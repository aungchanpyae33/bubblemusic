import { outputRelatedType } from "@/lib/ouputRelatedType";
import { ListUpFaceContainerProps } from "./ListUpFaceContainer";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import ImageAttachedVertical from "../general/ThreeDot/ImageAttachedVertical";
import ListOption from "../ListContainer/ListOption";
import { DirectPlayButtonOverlayOnImage } from "@/lib/StyleUtils/tailwindStyle";
import ListImage from "../ListContainer/ListImage";
import DirectPlayButton from "../general/TogglePlayButton/DirectPlayButton";
import ContextSongListContainer from "@/Context/ContextSongListContainer";
import ListUpFaceNameText from "./ListUpFaceNameText";
function ListUpFaceContainerItem({ list }: ListUpFaceContainerProps) {
  const { id, name, related_id, related_name, cover_url, type } = list;
  const relatedType = outputRelatedType(type);
  return (
    <div className=" w-full h-full">
      <div className="flex relative w-full  group">
        <NoThankYouPreFetchLink
          href={`/${type}/${id}`}
          className=" w-full relative block"
        >
          <ListImage
            className="w-full md:w-full lg:w-full"
            cover_url={cover_url}
            name={name}
            type={type}
          />
        </NoThankYouPreFetchLink>

        <ImageAttachedVertical>
          <ListOption list={list} />
        </ImageAttachedVertical>

        <DirectPlayButton
          listId={id}
          type={type}
          className={DirectPlayButtonOverlayOnImage}
        />
      </div>

      <div className="">
        <ContextSongListContainer list={list} id={list.id}>
          <ListUpFaceNameText />
        </ContextSongListContainer>
        {relatedType && (
          <UnderLineLinkHover
            href={`/${relatedType}/${related_id}`}
            className="text-sm text-ink-400"
          >
            {related_name}
          </UnderLineLinkHover>
        )}
      </div>
    </div>
  );
}

export default ListUpFaceContainerItem;
