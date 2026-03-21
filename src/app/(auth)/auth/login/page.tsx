import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import LoginFormContainer from "@/ui/auth/loginForm/LoginFormContainer";
import SignUpText from "@/ui/auth/loginForm/SignUpText";
import TitleLogin from "@/ui/auth/loginForm/TitleLogin";

export default function Page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <TitleLogin />
      <LoginFormContainer />
      <SignUpText />
    </AuthContainer>
  );
}
