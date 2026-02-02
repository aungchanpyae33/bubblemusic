import { RelativeData } from "../ContextGoToRelative";
import OptionButton from "../OptionButton";
import OptionContainer from "../OptionContainer";
import OptionItem from "../OptionItem";

function RelativeSubItem({ relative }: { relative: RelativeData }) {
  return (
    <OptionItem>
      <OptionButton className=" px-4">{relative.name}</OptionButton>
    </OptionItem>
  );
}

function RelativeSubOption({ relative }: { relative: RelativeData[] }) {
  return (
    <OptionContainer>
      {relative.map((item) => (
        <RelativeSubItem key={item.id} relative={item} />
      ))}
    </OptionContainer>
  );
}

export default RelativeSubOption;
