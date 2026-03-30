"use client";
import Link from "next/link";
import Button from "./Button";
import IconWrapper from "@/ui/general/IconWrapper";
import { LogIn } from "lucide-react";

function SignInButtonLink() {
  return (
    <Link href="/auth/login">
      <Button>
        <IconWrapper Icon={LogIn} />
      </Button>
    </Link>
  );
}

export default SignInButtonLink;
