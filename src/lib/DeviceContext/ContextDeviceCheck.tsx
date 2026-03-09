"use client";
import { createContext, ReactNode, useContext } from "react";
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
export const DeviceContext = createContext<contextProps | undefined>(undefined);

export const useDeviceContext = () => {
  const context = useContext(DeviceContext);
  if (context === undefined) {
    throw new Error(
      "useDeviceContext must be used within a DeviceContext.Provider",
    );
  }
  return context;
};
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
