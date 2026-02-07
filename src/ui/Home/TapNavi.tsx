function TapNavi() {
  return (
    <div className=" w-full p-4 h-[80px] thinScrollbar [&>*]:bg-surface-1 flex justify-between gap-3 shrink-0 overflow-auto items-center max-w-[950px] grow-0 text-nowrap no-scrollbar">
      <button className=" p-2 px-6 hover:bg-surface-2 ">နှစ်သက်မှု</button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">အန်နာဂျီ</button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">အသည်းကွဲ</button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">ပျော်စရာ</button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">အိပ်ရာဝင်</button>
      <button className=" p-2 px-6 hover:bg-surface-2 ">အပန်းဖြေ</button>{" "}
      <button className=" p-2 px-6 hover:bg-surface-2 ">ရော့ခ်</button>{" "}
      <button className=" p-2 px-6 hover:bg-surface-2 ">ကေ ပေါ့ပ်</button>
    </div>
  );
}

export default TapNavi;
