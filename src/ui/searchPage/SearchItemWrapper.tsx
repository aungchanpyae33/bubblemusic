import React from "react";

type SearchItemWrapperProps = React.ComponentProps<"li">;
function SearchItemWrapper({ children }: SearchItemWrapperProps) {
  return (
    <li
      className=" transition-colors duration-150 group flex gap-4 items-center justify-between  [&:has(:focus-visible)]:ring-4 p-2   grow-0 hover:bg-surface-2
      "
      // tabIndex={0}
      // id="uni1"
      // role={`cell${index + 1}`}
    >
      {children}
    </li>
  );
}

export default SearchItemWrapper;
