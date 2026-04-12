import { useTranslations } from "next-intl";

function ErrorLyric() {
  const e = useTranslations("ErrorMsg");
  return (
    <div className="flex    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full items-center justify-center">
      <span className=" text-lg">{e("errorLyric")}</span>
    </div>
  );
}

export default ErrorLyric;
