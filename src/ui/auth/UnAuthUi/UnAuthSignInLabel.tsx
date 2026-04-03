import { useTranslations } from "next-intl";

function UnAuthSignInLabel() {
  const au = useTranslations("Auth");
  return <p className="text-ink-400">{au("login")}</p>;
}

export default UnAuthSignInLabel;
