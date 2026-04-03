import { useTranslations } from "next-intl";

function UnAuthResponseText() {
  const au = useTranslations("Auth");
  return (
    <div className=" text-center max-w-80 space-y-2">
      <h1 className=" text-xl font-extrabold">{au("unAuthTitle")}</h1>
      <p>{au("unAuthText")}</p>
    </div>
  );
}

export default UnAuthResponseText;
