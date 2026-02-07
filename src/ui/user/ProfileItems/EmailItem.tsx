import IconWrapper from "@/ui/general/IconWrapper";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionText from "@/ui/general/optionBox/OptionText";
import ToolTip from "@/ui/general/ToolTip";
import { Mail } from "lucide-react";

function EmailItem({ email }: { email: string | undefined }) {
  if (!email) return;
  return (
    <OptionItem>
      <OptionButton>
        <OptionIconEl>
          <IconWrapper size="small" Icon={Mail} />
        </OptionIconEl>
        <ToolTip tooltipContent={email}>
          <OptionText>{email}</OptionText>
        </ToolTip>
      </OptionButton>
    </OptionItem>
  );
}

export default EmailItem;
