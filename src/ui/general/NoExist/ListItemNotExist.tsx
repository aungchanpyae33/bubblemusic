import { Ghost } from "lucide-react";
import IconWrapper from "../IconWrapper";
import { _Translator } from "next-intl";

function ListItemNotExist({
  b,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  b: _Translator<Record<string, any>, "block">;
}) {
  return (
    <div className=" border border-seperate-soft flex items-center justify-center gap-3  rounded-lg  p-3 my-3 min-h-36">
      <IconWrapper Icon={Ghost} size="exLarge" />
      <span>{b("emptySongList")}</span>
    </div>
  );
}

export default ListItemNotExist;
