import clsx from "clsx";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import type { listInfo } from "../../../database.types-fest";
import ImageAttachedVertical from "../general/ThreeDot/ImageAttachedVertical";
import ListOption from "../ListContainer/ListOption";
import { DirectPlayButtonOverlayOnImage } from "@/lib/StyleUtils/tailwindStyle";
import ListImage from "../ListContainer/ListImage";
import { outputRelatedType } from "@/lib/ouputRelatedType";
import DirectPlayButton from "../general/TogglePlayButton/DirectPlayButton";
import ContextSongListContainer from "@/Context/ContextSongListContainer";
import ListUpFaceNameText from "./ListUpFaceNameText";

interface ListUpFaceContainerProps {
  list: listInfo;
}

function ListUpFaceContainer({ list }: ListUpFaceContainerProps) {
  const { id, name, related_id, related_name, cover_url, type } = list;
  const relatedType = outputRelatedType(type);
  return (
    <div
      className={clsx(
        "peer snap-center p-2 rounded-lg hover:bg-surface-2 space-y-3 w-[180px]  md:w-[195px] lg:w-[200px] shrink-0 grow-0 ",
      )}
    >
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

export default ListUpFaceContainer;
