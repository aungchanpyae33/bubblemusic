import { useTranslations } from "next-intl";

function NoExistLyric() {
  const b = useTranslations("block");
  return (
    <div className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full  items-center justify-center">
      <span className=" ">{b("noExistLyric")}</span>
    </div>
  );
}

export default NoExistLyric;
