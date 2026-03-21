import ContextDeviceCheck from "@/Context/ContextDeviceCheck";
import { DeviceCheck } from "@/lib/DeviceCheck";

async function DeviceCheckFetcher({ children }: { children: React.ReactNode }) {
  const device = await DeviceCheck();
  return <ContextDeviceCheck device={device}>{children}</ContextDeviceCheck>;
}

export default DeviceCheckFetcher;
