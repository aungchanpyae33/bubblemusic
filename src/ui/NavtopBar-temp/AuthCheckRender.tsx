import { userFetch } from "@/lib/UserInfoFetch";
import AuthLeftSection from "./AuthLeftSection";
import UnAuthLeftSection from "./UnAuthLeftSection";

async function AuthCheckRender() {
  const user = await userFetch();
  return user ? <AuthLeftSection user={user} /> : <UnAuthLeftSection />;
}

export default AuthCheckRender;
