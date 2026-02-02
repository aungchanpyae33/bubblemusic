"use client";
import { createContext, ReactNode } from "react";
export interface contextProps {
  device:
    | "mobile"
    | "tablet"
    | "console"
    | "smarttv"
    | "wearable"
    | "xr"
    | "embedded"
    | "desktop";
}
export const DeviceContext = createContext<contextProps>({
  device: "mobile",
});
function ContextDeviceCheck({
  device,
  children,
}: {
  device: contextProps["device"];
  children: ReactNode;
}) {
  const value = { device };
  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

export default ContextDeviceCheck;
