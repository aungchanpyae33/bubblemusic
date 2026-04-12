import { useTranslations } from "next-intl";
import IconWrapper from "../../IconWrapper";
import { Lock } from "lucide-react";
import NoThankYouPreFetchLink from "../../NoThankYouPreFetchLink";
import Button from "@/components/button/Button";

function SignInNoticContent() {
  const w = useTranslations("Warning");
  const b = useTranslations("block");
  const au = useTranslations("Auth");
  return (
    <div className=" flex flex-col items-center gap-6">
      <div className=" p-2 border border-seperate-hard rounded-md">
        {" "}
        <IconWrapper Icon={Lock} size="large" />
      </div>

      <div className="text-base font-bold text-center">{w("needToLogin")}</div>
      <NoThankYouPreFetchLink href="/auth/login">
        <Button className="w-48 p-3">{b("login")}</Button>
      </NoThankYouPreFetchLink>
      <p className="text-sm font-light">
        {au.rich("noAcc", {
          link: (chunks) => (
            <NoThankYouPreFetchLink href="/auth/sign-up" className=" underline">
              {chunks}
            </NoThankYouPreFetchLink>
          ),
        })}
      </p>
    </div>
  );
}

export default SignInNoticContent;
