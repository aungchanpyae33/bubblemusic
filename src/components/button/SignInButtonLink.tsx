"use client";
import Link from "next/link";
import Button from "./Button";
import { useTranslations } from "next-intl";

function SignInButtonLink() {
  const b = useTranslations("block");
  return (
    <Link href="/auth/login">
      <Button className="">{b("login")}</Button>
    </Link>
  );
}

export default SignInButtonLink;
