"use client";
import Link from "next/link";
import Button from "./Button";
import { useTranslations } from "next-intl";

function SignupButtonLink() {
  const b = useTranslations("block");
  return (
    <Link href="/auth/sign-up">
      <Button className="">{b("signUp")}</Button>
    </Link>
  );
}

export default SignupButtonLink;
