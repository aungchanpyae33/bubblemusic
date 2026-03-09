"use client";
import OptionItem from "./OptionItem";
import { useInfoTrackContext } from "@/ui/trackComponent/ContextInfoTrack";
import OptionIconEl from "./OptionIconEl";
import { Disc } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionButton from "./OptionButton";
import NoThankYouPreFetchLink from "../NoThankYouPreFetchLink";
import { useTranslations } from "next-intl";
import OptionText from "./OptionText";

function GoToAlbum() {
  const b = useTranslations("block");
  const { song } = useInfoTrackContext();
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

          <OptionText>{b("goToAlbum")}</OptionText>
        </NoThankYouPreFetchLink>
      </OptionButton>
    </OptionItem>
  );
}

export default GoToAlbum;
