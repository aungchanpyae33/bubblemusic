"use client";
import { ListX } from "lucide-react";
import useRemoveSongMutate from "@/lib/CustomHooks/mutation/RemoveSongMutate";
import { useTranslations } from "next-intl";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import IconWrapper from "@/ui/general/IconWrapper";
import OptionText from "../OptionUI/OptionText";

function RemoveSongButtonChild() {
  const b = useTranslations("block");
  const { id, song } = useInfoTrackContext();
  const id_scope = song?.id;

  const mutation = useRemoveSongMutate(id!);
  const handleRemove = () => {
    mutation.mutate({
      playlistId: id!,
      id: id_scope!,
    });
  };

  return (
    <OptionItem>
      <OptionButton action={handleRemove}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={ListX} />
        </OptionIconEl>

        <OptionText>{b("removeFromPlaylist")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

function RemoveSongButton() {
  const { source } = useInfoTrackContext();
  if (source !== "create") return null;
  return <RemoveSongButtonChild />;
}

export default RemoveSongButton;
