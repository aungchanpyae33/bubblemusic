import IconWrapper from "@/ui/general/IconWrapper";
import NoThankYouPreFetchLink from "@/ui/general/NoThankYouPreFetchLink";
import { User } from "lucide-react";
import { useTranslations } from "next-intl";
import OptionItem from "../OptionUI/OptionItem";
import OptionButton from "../OptionUI/OptionButton";
import OptionIconEl from "../OptionUI/OptionIconEl";
import OptionText from "../OptionUI/OptionText";

function ProfileItem({ id }: { id: string | undefined }) {
  const b = useTranslations("block");
  if (!id) return;
  return (
    <NoThankYouPreFetchLink href={`/profile/${id}`} className="block ">
      <OptionItem>
        <OptionButton>
          <OptionIconEl>
            <IconWrapper size="small" Icon={User} />
          </OptionIconEl>
          <OptionText>{b("profile.title")}</OptionText>
        </OptionButton>
      </OptionItem>
    </NoThankYouPreFetchLink>
  );
}

export default ProfileItem;
