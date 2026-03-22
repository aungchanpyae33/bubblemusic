import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function SignInText() {
  const au = await getTranslations("Auth");
  return (
    <p className="text-sm text-center font-light ">
      {au.rich("alreadyAcc", {
        link: (chunks) => (
          <Link href="login" className=" underline">
            {chunks}
          </Link>
        ),
      })}
    </p>
  );
}

export default SignInText;
