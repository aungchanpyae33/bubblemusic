import ToolTip from "@/ui/general/ToolTip";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionText from "../OptionUI/OptionText";

function NameItem({ name }: { name: string | undefined }) {
  if (!name) return;
  const firstLetter = name.slice(0, 1);
  return (
    <OptionItem>
      <OptionButton>
        <OptionIconEl>
          <div className=" bg-surface-1 rounded-full size-9/12 flex items-center justify-center">
            {firstLetter}
          </div>
        </OptionIconEl>
        <ToolTip tooltipContent={name}>
          <OptionText>{name}</OptionText>
        </ToolTip>
      </OptionButton>
    </OptionItem>
  );
}

export default NameItem;
