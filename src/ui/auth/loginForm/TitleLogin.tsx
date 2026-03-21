import { getTranslations } from "next-intl/server";

async function TitleLogin() {
  const au = await getTranslations("Auth");
  return (
    <h3 className=" font-semibold text-center text-lg ">
      {au("loginAccount")}
    </h3>
  );
}

export default TitleLogin;
