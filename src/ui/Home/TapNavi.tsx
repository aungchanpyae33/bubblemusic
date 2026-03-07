import { getTranslations } from "next-intl/server";

async function tapNavi() {
  const b = await getTranslations("block");
  return (
    <div className=" w-full p-4 h-[80px] thinScrollbar [&>*]:bg-surface-1 flex justify-between gap-3 shrink-0 overflow-auto items-center max-w-[950px] grow-0 text-nowrap no-scrollbar">
      <button className=" p-2 px-6 hover:bg-surface-2 ">
        {b("tapNavi.like")}
      </button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">
        {b("tapNavi.energetic")}
      </button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">
        {" "}
        {b("tapNavi.heartbreak")}
      </button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">
        {" "}
        {b("tapNavi.happy")}
      </button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">
        {" "}
        {b("tapNavi.sleep")}
      </button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">
        {" "}
        {b("tapNavi.relax")}
      </button>{" "}
      <button className=" p-2 px-6 hover:bg-surface-2 ">
        {" "}
        {b("tapNavi.rock")}
      </button>{" "}
      <button className=" p-2 px-6 hover:bg-surface-2 ">
        {" "}
        {b("tapNavi.kpop")}
      </button>
    </div>
  );
}

export default tapNavi;
