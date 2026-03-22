import AuthContainer from "@/ui/auth/AuthContainer";
import BrandTitle from "@/ui/auth/BrandTitle";
import SignUpInstruction from "@/ui/auth/signupScuuess/SignUpInstruction";
import SignUpSuccessTitle from "@/ui/auth/signupScuuess/SignUpSuccessTitle";

export default function Page() {
  return (
    <AuthContainer>
      <BrandTitle />
      <SignUpSuccessTitle />
      <SignUpInstruction />
    </AuthContainer>
  );
}
