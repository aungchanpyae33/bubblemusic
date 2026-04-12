import { getRequestConfig } from "next-intl/server";
import { cacheLife } from "next/cache";
import { cookies, headers } from "next/headers";

const SUPPORTED_LOCALES = ["en", "my"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

function isSupported(locale: string | undefined): locale is Locale {
  return !!locale && SUPPORTED_LOCALES.includes(locale as Locale);
}

async function getBrowserLocale(): Promise<Locale | undefined> {
  const acceptLanguage = (await headers()).get("accept-language");
  if (!acceptLanguage) return undefined;

  const browserLocale = acceptLanguage.split(",")[0].split("-")[0];

  return isSupported(browserLocale) ? browserLocale : undefined;
}

async function getCookieLocale(): Promise<Locale | undefined> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  return isSupported(cookieLocale) ? cookieLocale : undefined;
}

async function getCachedMessages(locale: Locale) {
  "use cache";
  cacheLife("days");

  return (await import(`../../messages/${locale}.json`)).default;
}

export default getRequestConfig(async () => {
  const [cookieLocale, browserLocale] = await Promise.all([
    getCookieLocale(),
    getBrowserLocale(),
  ]);
  const locale: Locale = cookieLocale || browserLocale || "en";
  const messages = await getCachedMessages(locale);
  return {
    locale,
    messages,
  };
});
