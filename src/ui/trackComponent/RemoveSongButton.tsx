"use client";
import OptionItem from "../general/optionBox/OptionItem";
import OptionButton from "../general/optionBox/OptionButton";
import OptionIconEl from "../general/optionBox/OptionIconEl";
import IconWrapper from "../general/IconWrapper";
import { ListX } from "lucide-react";
import useRemoveSongMutate from "@/lib/CustomHooks/mutation/RemoveSongMutate";
import { useTranslations } from "next-intl";
import OptionText from "../general/optionBox/OptionText";
import { useInfoTrackContext } from "@/Context/ContextInfoTrack";

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
