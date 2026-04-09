import { getLocale } from "next-intl/server";
import { ReactNode } from "react";

async function LayoutLocalFetch({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  return (
    <html
      lang={locale}
      className="h-full bg-background text-foreground"
      suppressHydrationWarning
    >
      {children}
    </html>
  );
}

export default LayoutLocalFetch;
