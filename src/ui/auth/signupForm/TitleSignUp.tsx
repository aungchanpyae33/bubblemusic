import { getTranslations } from "next-intl/server";

async function TitleSignUp() {
  const au = await getTranslations("Auth");
  return (
    <h3 className=" font-semibold text-center text-lg ">
      {au("createAccount")}
    </h3>
  );
}

export default TitleSignUp;
