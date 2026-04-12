"use client";
import { useSongListContext } from "@/Context/ContextSongListContainer";
import UnderLineLinkHover from "../general/UnderLineLinkHover";

function ListUpFaceNameText() {
  const { type, id, name } = useSongListContext();
  return (
    <UnderLineLinkHover className="block mt-2" href={`/${type}/${id}`}>
      {name}
    </UnderLineLinkHover>
  );
}

export default ListUpFaceNameText;
