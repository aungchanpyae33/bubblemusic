import { outputBaseUrl } from "@/lib/outputBaseUrl";
import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import SignUpInstruction from "@/ui/auth/signupScuuess/SignUpInstruction";
import SignUpSuccessTitle from "@/ui/auth/signupScuuess/SignUpSuccessTitle";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
export async function generateMetadata(): Promise<Metadata> {
  const meta = await getTranslations("MetaData");
  return {
    title: meta("authConfirm.title"),
    description: meta("authConfirm.description"),
    metadataBase: outputBaseUrl(),
    robots: {
      index: false,
      follow: false,
    },
    openGraph: {
      images: [],
    },
    twitter: {
      images: [],
    },
  };
}
export default function Page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <SignUpSuccessTitle />
      <SignUpInstruction />
    </AuthContainer>
  );
}
