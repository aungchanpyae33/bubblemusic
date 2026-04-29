import { useTranslations } from "next-intl";
import {
  noticeModalBox,
  noticeModalBoxAction,
  useNoticeModalBox,
} from "@/lib/zustand";
import Button from "@/components/button/Button";
import { closeModalBox } from "@/lib/closeModalBox";

function InfoNoticeContent() {
  const { noticeText } =
    useNoticeModalBox((state: noticeModalBox) => state.noticeModalBox) || {};
  const noticeModalBoxAction = useNoticeModalBox(
    (state: noticeModalBoxAction) => state.noticeModalBoxAction,
  );
  const b = useTranslations("block");
  return (
    <div className=" flex flex-col gap-3">
      <p>{noticeText}</p>
      <div className="flex justify-end  gap-3">
        <Button
          onClick={() => {
            closeModalBox(noticeModalBoxAction);
          }}
        >
          {b("close")}
        </Button>
      </div>
    </div>
  );
}

export default InfoNoticeContent;
