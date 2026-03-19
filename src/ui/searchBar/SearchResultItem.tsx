import clsx from "clsx";
import { useRouter } from "nextjs-toploader/app";

import { memo, RefObject } from "react";
interface SearchResultItemProps {
  title: string;
  show: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
}
//[later] : reactcompiler -> stable
const SearchResultItem = memo(
  ({ title, show, inputRef }: SearchResultItemProps) => {
    const router = useRouter();

    return (
      <div
        className={clsx(
          "hover:bg-surface-2 pl-[85px] rounded sm:pl-4  pr-2 h-[40px] flex items-center cursor-pointer",
          {
            "bg-surface-2": show,
          },
        )}
        key={title}
        onPointerDown={() => {
          router.push(`/search?query=${title}`);
          if (!inputRef.current) return;
          inputRef.current.value = title;
        }}
      >
        <div className="truncate">{title}</div>
      </div>
    );
  },
);

SearchResultItem.displayName = "SearchResultItem";

export default SearchResultItem;
