import { ReactNode } from "react";
import { userFetch } from "../UserInfoFetch";
import ContextUserInfo from "@/Context/ContextUserInfo";

async function UserInfoFetcher({ children }: { children: ReactNode }) {
  const user = await userFetch();
  return <ContextUserInfo user={user}>{children}</ContextUserInfo>;
}

export default UserInfoFetcher;
