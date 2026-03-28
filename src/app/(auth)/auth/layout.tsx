import { ReactNode } from "react";
import DeviceCheckFetcher from "@/lib/DeviceCheck/DeviceCheckFetcher";
import { NextIntlClientProvider } from "next-intl";
import GeneralSettingOption from "@/ui/Option/GeneralSettingOption/GeneralSettin";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <NextIntlClientProvider>
      <DeviceCheckFetcher>
        <div className=" absolute right-4 top-4">
          <GeneralSettingOption />
        </div>
        <div className=" overflow-y-auto"> {children}</div>
      </DeviceCheckFetcher>
    </NextIntlClientProvider>
  );
}
