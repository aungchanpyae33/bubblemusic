import { outputBaseUrl } from "@/lib/outputBaseUrl";
import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import SignInText from "@/ui/auth/signupForm/SignInText";
import SignUpFormContainer from "@/ui/auth/signupForm/SignUpFormContainer";
import TitleSignUp from "@/ui/auth/signupForm/TitleSignUp";
import type { Metadata, ResolvingMetadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
  _: unknown,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const [meta, parentMeta] = await Promise.all([
    getTranslations("MetaData"),
    parent,
  ]);
  const parentOg = parentMeta.openGraph;
  return {
    title: meta("authSignup.title"),
    description: meta("authSignup.description"),
    metadataBase: outputBaseUrl(),

    openGraph: {
      ...parentOg,
      url: "/auth/sign-up",
    },
  };
}

export default function Page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <TitleSignUp />
      <SignUpFormContainer />
      <SignInText />
    </AuthContainer>
  );
}
