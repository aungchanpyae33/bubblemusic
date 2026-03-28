import IconWrapper from "@/ui/general/IconWrapper";
import { Settings } from "lucide-react";
import GeneralSettingOptionContainer from "./GeneralSettingOptionContainer";
import MoreOption from "@/ui/general/MoreOption/MoreOption";
import ContextMoreOption from "@/Context/ContextMoreOption";

function GeneralSettingOption() {
  return (
    <ContextMoreOption>
      <MoreOption
        staticDrop={true}
        targetElement={<GeneralSettingOptionContainer />}
        triggerEl={
          <div className=" p-1 bg-surface-1 rounded-full">
            <IconWrapper Icon={Settings} size="small" />
          </div>
        }
      />
    </ContextMoreOption>
  );
}

export default GeneralSettingOption;
