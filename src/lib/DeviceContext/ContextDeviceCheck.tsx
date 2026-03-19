"use client";
import { createContext, ReactNode, useContext } from "react";
import { DeviceFromUserAgentReturn } from "../DeviceCheck";
export interface DeviceContextProps {
  device: DeviceFromUserAgentReturn;
}
const DeviceContext = createContext<DeviceContextProps | undefined>(undefined);

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
  device: DeviceContextProps["device"];
  children: ReactNode;
}) {
  const value = { device };
  return (
    <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>
  );
}

export default ContextDeviceCheck;
