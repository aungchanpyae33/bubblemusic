import { Clock } from "lucide-react";
import IconWrapper from "../general/IconWrapper";
import { _Translator } from "next-intl";

function TableHeadItems({
  b,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  b: _Translator<Record<string, any>, "block">;
}) {
  return (
    <>
      <div className=" flex items-center  justify-center">#</div>
      <div className=" flex items-center  justify-start">
        {b("listHeader.title")}
      </div>
      <div className=" lg:flex   items-center hidden  justify-start">
        {b("listHeader.album")}
      </div>
      <div className=" sm:flex items-center   hidden justify-center">
        <IconWrapper Icon={Clock} size="small" />
      </div>
      <div
        className=" flex items-center pr-2  justify-center lg:justify-end "
        aria-hidden
      ></div>
      <div className=" flex items-center pr-2  justify-center ">#</div>
    </>
  );
}

export default TableHeadItems;
