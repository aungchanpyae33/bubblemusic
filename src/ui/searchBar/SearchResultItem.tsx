import { useScrollIntoView } from "@/lib/CustomHooks/useScrollIntoView";
import clsx from "clsx";
import { useRouter } from "nextjs-toploader/app";

import { memo, RefObject, useRef } from "react";
import IconWrapper from "../general/IconWrapper";
import { Search } from "lucide-react";
import { useToggleContext } from "@/Context/ContextToggle";
import type { MediaItemType } from "../../../database.types-fest";
import { useTranslations } from "next-intl";
interface SearchResultItemProps {
  type: MediaItemType;
  title: string;
  show: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
}
//[later] : reactcompiler -> stable
const SearchResultItem = memo(
  ({ type, title, show, inputRef }: SearchResultItemProps) => {
    const router = useRouter();
    const l = useTranslations("ListTitle");
    const { setOpen } = useToggleContext();
    const ref = useRef<HTMLDivElement>(null);
    useScrollIntoView(show, ref);
    return (
      <div
        className={clsx(
          "hover:bg-surface-2 p-2 sm:pl-4  relative rounded h-[45px] flex items-center cursor-pointer",
          {
            "bg-surface-2": show,
          },
        )}
        ref={ref}
        key={title}
        onMouseDown={(e) => {
          e.preventDefault();
          router.push(`/search?query=${title}`);
          if (!inputRef.current) return;
          inputRef.current.value = title;
          setOpen(false);
        }}
      >
        <div className=" sm:hidden  w-[58px] pl-1 h-full flex items-center">
          <IconWrapper Icon={Search} size="small" />
        </div>

        <div className=" flex-1 min-w-0 truncate">{title}</div>
        <div className="w-24 text-center border text-sm border-borderFull font-medium p-1">
          {l(type)}
        </div>
      </div>
    );
  },
);

SearchResultItem.displayName = "SearchResultItem";

export default SearchResultItem;
