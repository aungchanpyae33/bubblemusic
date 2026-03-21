import { getTranslations } from "next-intl/server";
import Link from "next/link";

async function SignUpText() {
  const au = await getTranslations("Auth");
  return (
    <p className="text-sm text-center font-light ">
      {au.rich("noAcc", {
        link: (chunks) => (
          <Link href="sign-up" className=" underline">
            {chunks}
          </Link>
        ),
      })}
    </p>
  );
}

export default SignUpText;
