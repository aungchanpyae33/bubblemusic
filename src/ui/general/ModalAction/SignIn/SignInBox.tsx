"use client";
import {
  SignInModalBox,
  SignInModalBoxAction,
  useSignInModalBox,
} from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import SignInNoticContent from "./SignInNoticContent";
import { useTranslations } from "next-intl";

function SignInBox() {
  const w = useTranslations("Warning");
  const data = useSignInModalBox(
    (state: SignInModalBox) => state.signInModalBox,
  );
  if (!data) return null;
  const { originParentTriggerRef } = data;
  return (
    <SubOpenContentWrapper
      selector={(state: SignInModalBox) => state.signInModalBox}
      useStore={useSignInModalBox}
    >
      <SubOpenToggle
        selector={(state: SignInModalBoxAction) => state.signInModalBoxAction}
        headerText={w("notice")}
        originParentTriggerRef={originParentTriggerRef}
        useStore={useSignInModalBox}
      >
        <SignInNoticContent />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default SignInBox;
