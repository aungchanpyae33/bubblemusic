import SignInButtonLink from "@/components/button/SignInButtonLink";
import UnAuthResponseText from "./UnAuthResponseText";
import UnAuthSignInLabel from "./UnAuthSignInLabel";

function UnAuthResponseWrapper() {
  return (
    <>
      <UnAuthResponseText />
      <div className=" flex items-center gap-3">
        <UnAuthSignInLabel />
        <div className=" border border-seperate-soft rounded-md p-1">
          <SignInButtonLink />
        </div>
      </div>
    </>
  );
}

export default UnAuthResponseWrapper;
