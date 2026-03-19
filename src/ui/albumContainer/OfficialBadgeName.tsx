import { BadgeCheck } from "lucide-react";
import IconWrapper from "../general/IconWrapper";

function OfficialBadgeName() {
  return (
    <span title="official">
      <IconWrapper
        Icon={BadgeCheck}
        className=" ml-1 inline fill-brand"
        notClickable={true}
      />
    </span>
  );
}

export default OfficialBadgeName;
