import { getRequestConfig } from "next-intl/server";
import { cacheLife } from "next/cache";
import { cookies } from "next/headers";

async function getCachedMessages(locale: string) {
  "use cache";
  cacheLife("days");
  return (await import(`../../messages/${locale}.json`)).default;
}

export default getRequestConfig(async () => {
  const store = await cookies();
  const locale = store.get("locale")?.value || "en";

  const messages = await getCachedMessages(locale);
  return {
    locale,
    messages,
  };
});
