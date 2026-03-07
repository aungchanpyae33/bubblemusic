import { useTranslations } from "next-intl";
import { ReactNode } from "react";

function NotiBox({ children }: { children: ReactNode }) {
  const w = useTranslations("Warning");
  return (
    <div className=" space-y-3 py-3">
      <h3>{w("notice")}</h3>
      {children}
    </div>
  );
}

export default NotiBox;
