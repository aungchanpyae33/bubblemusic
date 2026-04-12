"use client";
import { useTranslations } from "next-intl";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import NoThankYouPreFetchLink from "@/ui/general/NoThankYouPreFetchLink";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import { Disc } from "lucide-react";
import OptionText from "../OptionUI/OptionText";

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
