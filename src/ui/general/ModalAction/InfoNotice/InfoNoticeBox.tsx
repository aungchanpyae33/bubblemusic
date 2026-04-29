"use client";
import {
  noticeModalBox,
  noticeModalBoxAction,
  useNoticeModalBox,
} from "@/lib/zustand";
import SubOpenContentWrapper from "../ModalWrapper/SubOpenContentWrapper";
import SubOpenToggle from "../ModalWrapper/SubOpenToggle";
import { useTranslations } from "next-intl";
import InfoNoticeContent from "./InfoNoticeContent";

function InfoNoticeBox() {
  const w = useTranslations("Warning");
  const data = useNoticeModalBox(
    (state: noticeModalBox) => state.noticeModalBox,
  );
  if (!data) return null;
  const { originParentTriggerRef } = data;
  return (
    <SubOpenContentWrapper
      selector={(state: noticeModalBox) => state.noticeModalBox}
      useStore={useNoticeModalBox}
    >
      <SubOpenToggle
        selector={(state: noticeModalBoxAction) => state.noticeModalBoxAction}
        headerText={w("notice")}
        originParentTriggerRef={originParentTriggerRef}
        useStore={useNoticeModalBox}
      >
        <InfoNoticeContent />
      </SubOpenToggle>
    </SubOpenContentWrapper>
  );
}

export default InfoNoticeBox;
