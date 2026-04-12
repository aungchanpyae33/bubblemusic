import { headers } from "next/headers";
import { cache } from "react";
import { UAParser } from "ua-parser-js";
export type DeviceFromUserAgentReturn =
  | "mobile"
  | "tablet"
  | "desktop"
  | "console"
  | "smarttv"
  | "wearable"
  | "xr"
  | "embedded";
export const DeviceCheck = cache(async () => {
  const headerList = await headers();
  const userAgent = headerList.get("user-agent");
  const { device } = UAParser(userAgent || "");
  const deviceFromUserAgent = device.type ? device.type : "desktop";
  return deviceFromUserAgent;
});
