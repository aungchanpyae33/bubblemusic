import SignInButtonLink from "@/components/button/SignInButtonLink";
import GeneralSettingOption from "../Option/GeneralSettingOption/GeneralSettin";

function UnAuthLeftSection() {
  return (
    <div className="flex items-center gap-3">
      <GeneralSettingOption />
      <SignInButtonLink />
    </div>
  );
}

export default UnAuthLeftSection;
