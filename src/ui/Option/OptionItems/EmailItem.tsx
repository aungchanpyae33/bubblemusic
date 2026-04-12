import IconWrapper from "@/ui/general/IconWrapper";
import ToolTip from "@/ui/general/ToolTip";
import { Mail } from "lucide-react";
import OptionItem from "../OptionUI/OptionItem";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionButton from "../OptionUI/OptionButton";
import OptionText from "../OptionUI/OptionText";

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
