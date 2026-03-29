import { EmptyCatIcon } from "@/ui/CustomIcon/Icon";
import { getTranslations } from "next-intl/server";

async function EmptyGeneral() {
  const w = await getTranslations("Warning");
  return (
    <div className=" border border-seperate-soft flex items-center justify-center gap-3 h-96 flex-col   rounded-lg  p-3 my-3 min-h-36">
      <EmptyCatIcon />
      <div className=" text-lg font-semibold">{w("currentlyEmpty")}</div>
    </div>
  );
}

export default EmptyGeneral;
