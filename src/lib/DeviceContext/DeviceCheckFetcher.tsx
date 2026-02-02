import { DeviceCheck } from "@/lib/DeviceCheck";
import ContextDeviceCheck from "./ContextDeviceCheck";

async function DeviceCheckFetcher({ children }: { children: React.ReactNode }) {
  const device = await DeviceCheck();
  return <ContextDeviceCheck device={device}>{children}</ContextDeviceCheck>;
}

export default DeviceCheckFetcher;
