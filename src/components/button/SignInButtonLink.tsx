"use client";
import Link from "next/link";
import Button from "./Button";
import IconWrapper from "@/ui/general/IconWrapper";
import { LogIn } from "lucide-react";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface SignInButtonLinkProps extends ComponentProps<"button"> {
  className?: string;
}
function SignInButtonLink({ className, ...props }: SignInButtonLinkProps) {
  return (
    <Link href="/auth/login">
      <Button className={cn("p-1", className)} {...props}>
        <IconWrapper size="small" Icon={LogIn} />
      </Button>
    </Link>
  );
}

export default SignInButtonLink;
