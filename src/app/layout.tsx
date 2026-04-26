import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "next-themes";
export const metadata: Metadata = {
  title: {
    template: "%s | Bubble",
    default: "Bubble",
  },
  metadataBase: outputBaseUrl(),
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Bubble",
  },
  verification: {
    google: "qUiD6zMa2G5hXsaRx_P2lfhYardVPp1UbjZDHvj_ulA",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
import NextTopLoader from "nextjs-toploader";
import { NextIntlClientProvider } from "next-intl";
import { Suspense } from "react";
import AppLoading from "@/ui/loading/AppLoading";
import { Toaster } from "sonner";
import DeviceCheckFetcher from "@/lib/DeviceCheck/DeviceCheckFetcher";
import LayoutLocalFetch from "@/ui/general/layout/LayoutLocalFetch";
import { outputBaseUrl } from "@/lib/outputBaseUrl";
import PlaceHolderPolyfillInert from "@/Placeholder/PlaceHolderPolyfillInert";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<AppLoading />}>
      <LayoutLocalFetch>
        <body
          className={`${inter.className} overflow-hidden relative h-full flex flex-col`}
        >
          <Toaster
            position="bottom-center"
            toastOptions={{
              duration: 2000,
            }}
          />
          <PlaceHolderPolyfillInert />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="var(--loader)"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px var(--loader),0 0 5px var(--loader)"
              template='<div class="bar" role="bar"><div class="peg"></div></div>' // no spinner
              zIndex={1600}
              showAtBottom={false}
            />

            <NextIntlClientProvider>
              <DeviceCheckFetcher>{children}</DeviceCheckFetcher>
            </NextIntlClientProvider>
          </ThemeProvider>
        </body>
      </LayoutLocalFetch>
    </Suspense>
  );
}
