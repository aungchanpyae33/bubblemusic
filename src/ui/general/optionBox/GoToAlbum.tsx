"use client";
import { useContext } from "react";
import OptionItem from "./OptionItem";
import { InfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import OptionIconEl from "./OptionIconEl";
import { Disc } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionButton from "./OptionButton";
import NoThankYouPreFetchLink from "../NoThankYouPreFetchLink";

function GoToAlbum() {
  const { song } = useContext(InfoTrackContext);
  const albumId = song?.album.id;

  return (
    <OptionItem>
      <OptionButton>
        <NoThankYouPreFetchLink
          href={`/album/${albumId}`}
          className="flex items-center"
        >
          <OptionIconEl>
            <IconWrapper size="small" Icon={Disc} />
          </OptionIconEl>

          <span>go to the album </span>
        </NoThankYouPreFetchLink>
      </OptionButton>
    </OptionItem>
  );
}

export default GoToAlbum;
