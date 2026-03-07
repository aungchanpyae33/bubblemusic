"use client";
import { useTranslations } from "next-intl";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";

function UserLoginButton() {
  const b = useTranslations("block");

  return (
    <NoThankYouPreFetchLink href={"/auth/login"}>
      <button className=" bg-surface-1  hover:scale-105   active:scale-90 h-[40px] px-2  border-opacity-15 border border-borderFull rounded-sm flex items-center ">
        {b("login")}
      </button>
    </NoThankYouPreFetchLink>
  );
}

export default UserLoginButton;
