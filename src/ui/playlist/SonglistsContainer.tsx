import clsx from "clsx";
import Image from "next/image";
import DirectPlayButton from "./DirectPlayButton";
import UnderLineLinkHover from "../general/UnderLineLinkHover";
import MoreOptionContext from "../trackComponent/MoreOptionContext";
import MoreOption from "../trackComponent/MoreOption";
import SongListContainerOption from "../general/optionBox/SongListContainerOption";
import SonglistContainerWrapper from "./playlistOption/SonglistContainerWrapper";
import ContextSongListContainer from "./playlistOption/ContextSongListContainer";
import { listInfo } from "@/database/data";
import { outputRelatedType } from "@/lib/prototypeOuputRelatedType";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import VerticalThreeDots from "../general/icon/VerticalThreeDots";

import { outputRelative } from "@/lib/outputRelative";

interface SonglistsContainerProps {
  description: string;
  index: number;
  list: listInfo;
}

function SonglistsContainer({
  description,
  index,
  list,
}: SonglistsContainerProps) {
  const { id, name, related_id, related_name, cover_url, type } = list;
  const relatedType = outputRelatedType(type);
  return (
    <div
      role={`cell${index + 1}`}
      className={clsx(
        "peer snap-center space-y-3 w-[165px] isolate md:w-[175px] lg:w-[185px] shrink-0 grow-0 ",
      )}
    >
      <div className="flex relative w-full imageContainer  rounded  group">
        <NoThankYouPreFetchLink
          href={`/${type}/${id}`}
          className=" w-full relative peer  block before:block before:pb-[100%] "
        >
          {cover_url && (
            <Image
              src={cover_url}
              fill
              alt="this is image element"
              sizes="(min-width: 1024px) 185px, (min-width: 768px) 175px , 160px"
              priority={true}
              className=" group-hover:brightness-75 "
            />
          )}
        </NoThankYouPreFetchLink>
        <SonglistContainerWrapper className="absolute top-2 right-2">
          <MoreOptionContext
            relative={outputRelative(related_id, related_name)}
          >
            <MoreOption
              triggerEl={<VerticalThreeDots />}
              targetElement={
                <ContextSongListContainer id={id} list={list}>
                  <SongListContainerOption />
                </ContextSongListContainer>
              }
            />
          </MoreOptionContext>
        </SonglistContainerWrapper>

        <DirectPlayButton
          listId={id}
          type={type}
          className=" absolute z-10 bottom-4 right-2  has-hover:transition-[transform,opacity,background-color] has-hover:duration-150 has-hover:group-hover:-translate-y-2 has-hover:opacity-0 has-hover:peer-focus:-translate-y-2  has-hover:peer-focus:opacity-100 
      has-hover:focus:-translate-y-2 
      has-hover:focus:opacity-100 
      has-hover:group-hover:opacity-100  p-2 bg-[#222222]"
        />
      </div>

      <div className=" w-full">
        <UnderLineLinkHover
          href={`/${type}/${id}`}
          prefetch={false}
          className=" block leading-relaxed w-full truncate text-start  "
        >
          {name}
        </UnderLineLinkHover>
        {relatedType && (
          <UnderLineLinkHover
            href={`/${relatedType}/${related_id}`}
            prefetch={false}
            className=" block leading-relaxed w-full truncate text-start text-sm text-zinc-400 "
          >
            {related_name}
          </UnderLineLinkHover>
        )}
      </div>
    </div>
  );
}

export default SonglistsContainer;
