import clsx from "clsx";
import { useRouter } from "nextjs-toploader/app";

import { memo } from "react";
interface prop {
  title: string;
  // arrow: {
  //   run: boolean;
  //   number: number;
  // };
  show: boolean;
}
//[later] : reactcompiler -> stable
const SearchResultItem = memo(({ title, show }: prop) => {
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
      }}
    >
      <div className=" leading-relaxed truncate">{title}</div>
    </div>
  );
});

SearchResultItem.displayName = "SearchResultItem";

export default SearchResultItem;
