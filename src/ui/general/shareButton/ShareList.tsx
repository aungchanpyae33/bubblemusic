"use client";
import { Link2 } from "lucide-react";
import IconWrapper from "../IconWrapper";
import OptionItem from "../optionBox/OptionItem";
import OptionIconEl from "../optionBox/OptionIconEl";
import OptionButton from "../optionBox/OptionButton";
import OptionText from "../optionBox/OptionText";
import { useTranslations } from "next-intl";
import { useSongListContext } from "@/Context/ContextSongListContainer";

function ShareList() {
  const b = useTranslations("block");
  const { id, type } = useSongListContext();
  const handleCopy = async () => {
    const origin = window.location.origin;
    try {
      await navigator.clipboard.writeText(`${origin}/${type}/${id}`);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <OptionItem>
      <OptionButton className="flex items-center" action={handleCopy}>
        <OptionIconEl>
          <IconWrapper size="small" Icon={Link2} />
        </OptionIconEl>
        <OptionText>{b("share")}</OptionText>
      </OptionButton>
    </OptionItem>
  );
}

export default ShareList;
