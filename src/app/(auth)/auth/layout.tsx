import { ReactNode } from "react";
import GeneralSettingOption from "@/ui/Option/GeneralSettingOption/GeneralSettin";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className=" overflow-y-auto">
      {children}
      <div className=" absolute right-4 top-4">
        <GeneralSettingOption />
      </div>
    </div>
  );
}
