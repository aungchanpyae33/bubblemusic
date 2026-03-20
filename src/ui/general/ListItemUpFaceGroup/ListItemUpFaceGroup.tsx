import ListGeneralHeader from "@/ui/albumContainer/ListGeneralHeader";
import { getTranslations } from "next-intl/server";
import React from "react";

async function ListItemUpFaceGroup({
  children,
  description,
}: {
  children: React.ReactNode;
  description: string;
}) {
  const l = await getTranslations("ListTitle");
  return (
    <div className="">
      <div className="px-4">
        <ListGeneralHeader> {l(description)}</ListGeneralHeader>
      </div>

      <div className="flex overflow-auto scroll-container  p-4 gap-5 will-change-scroll ">
        {children}
      </div>
    </div>
  );
}

export default ListItemUpFaceGroup;
