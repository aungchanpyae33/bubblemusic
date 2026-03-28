import Button from "@/components/button/Button";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import { useTranslations } from "next-intl";

function NeedToSignInSideBar() {
  const b = useTranslations("block");
  const w = useTranslations("Warning");
  return (
    <div className="flex  h-full justify-center items-center">
      <div className=" flex flex-col items-center gap-6 ">
        <p className="   text-center text-sm text-ink-400">
          {w("needToLoginSidebar")}
        </p>
        <NoThankYouPreFetchLink href="/auth/login">
          <Button className="p-3">{b("login")}</Button>
        </NoThankYouPreFetchLink>
      </div>
    </div>
  );
}

export default NeedToSignInSideBar;
