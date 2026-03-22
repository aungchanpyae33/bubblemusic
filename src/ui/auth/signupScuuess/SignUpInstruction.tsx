import { getTranslations } from "next-intl/server";

async function SignUpInstruction() {
  const au = await getTranslations("Auth");
  return (
    <div className=" text-center w-11/12 mx-auto ">
      {au("signUpSuccessContent")}
    </div>
  );
}

export default SignUpInstruction;
