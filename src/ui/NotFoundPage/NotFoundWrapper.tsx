import { getTranslations } from "next-intl/server";
import NotFoundText from "./NotFoundText";
import BackToHomePage from "./BackToHomePage";
import Logo from "../NavtopBar/Logo";

async function NotFoundWrapper() {
  const [b, w] = await Promise.all([
    getTranslations("block"),
    getTranslations("Warning"),
  ]);
  return (
    <>
      <NotFoundText w={w} />
      <BackToHomePage b={b}>
        <Logo />
      </BackToHomePage>
    </>
  );
}

export default NotFoundWrapper;
