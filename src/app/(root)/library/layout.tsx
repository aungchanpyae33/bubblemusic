import LibNavLink from "@/ui/LibraryPage/LibNavLink";
import { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold px-4 pb-3 ">Library</h2>

      <LibNavLink />

      {children}
    </div>
  );
}

export default layout;
