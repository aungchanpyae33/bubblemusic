import IconWrapper from "@/ui/general/IconWrapper";
import { MailSearch } from "lucide-react";
import { getTranslations } from "next-intl/server";

async function SignUpSuccessTitle() {
  const au = await getTranslations("Auth");
  return (
    <h3 className=" font-semibold text-center flex items-center justify-center gap-2 text-lg ">
      <div className=" p-2 border border-seperate-soft rounded-md">
        <IconWrapper Icon={MailSearch} size="medium" />
      </div>
      <span>{au("signUpSuccess")}</span>
    </h3>
  );
}

export default SignUpSuccessTitle;
