import { useTranslations } from "next-intl";

function ErrorPageText() {
  const e = useTranslations("ErrorMsg");
  return (
    <div className=" text-center max-w-80 space-y-2">
      <h1 className=" text-lg mb-2 font-extrabold">{e("globalErrorTitle")}</h1>
      <p>{e("globalErrorText")}</p>
    </div>
  );
}

export default ErrorPageText;
