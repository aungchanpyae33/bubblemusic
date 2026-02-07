import IconWrapper from "@/ui/general/IconWrapper";
import NoThankYouPreFetchLink from "@/ui/general/NoThankYouPreFetchLink";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionIconEl from "@/ui/general/optionBox/OptionIconEl";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import OptionText from "@/ui/general/optionBox/OptionText";
import { User } from "lucide-react";

function ProfileItem({ id }: { id: string | undefined }) {
  if (!id) return;
  return (
    <NoThankYouPreFetchLink href={`/profile/${id}`} className="block ">
      <OptionItem>
        <OptionButton>
          <OptionIconEl>
            <IconWrapper size="small" Icon={User} />
          </OptionIconEl>
          <OptionText>profile</OptionText>
        </OptionButton>
      </OptionItem>
    </NoThankYouPreFetchLink>
  );
}

export default ProfileItem;
