import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionText from "@/ui/general/optionBox/OptionText";
import ToolTip from "@/ui/general/ToolTip";

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
