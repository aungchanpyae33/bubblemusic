import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import SignInText from "@/ui/auth/signupForm/SignInText";
import SignUpFormContainer from "@/ui/auth/signupForm/SignUpFormContainer";
import TitleSignUp from "@/ui/auth/signupForm/TitleSignUp";

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
