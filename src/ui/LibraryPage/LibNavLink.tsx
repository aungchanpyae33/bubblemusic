import { SUPPORTED_ROUTE } from "@/app/(root)/library/(library)/[params]/page";
import { getTranslations } from "next-intl/server";
import NoThankYouPreFetchLink from "../general/NoThankYouPreFetchLink";
import CurrentLibSectionHighlight from "./CurrentLibSectionHighlight";

async function LibNavLink() {
  const l = await getTranslations("ListTitle");

  return (
    <div className=" flex gap-1 px-4 overflow-auto scroll-container">
      {SUPPORTED_ROUTE.map((item) => {
        const routeHref = `/library/${item}`;
        return (
          <NoThankYouPreFetchLink
            className="block  shrink-0 grow-0 cursor-pointer"
            href={routeHref}
            key={item}
          >
            <div className="p-2 bg-surface-1  hover:bg-surface-2 rounded-md overflow-hidden px-4 relative ">
              <CurrentLibSectionHighlight route={routeHref} />
              <span className=" relative z-10">{l(item)}</span>
            </div>
          </NoThankYouPreFetchLink>
        );
      })}
    </div>
  );
}

export default LibNavLink;
