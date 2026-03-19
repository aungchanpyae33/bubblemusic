import clsx from "clsx";
import { ReactNode } from "react";

function Main({ children }: { children: ReactNode }) {
  return (
    <main
      className={clsx(
        " h-full  flex-1 overflow-y-auto will-change-scroll md:ml-[70px] z-0",
        // will-change-scroll for hardware acceleration , without this , it feels junky in chrome and some webkit browser
      )}
    >
      <div className="max-w-[1324px] mx-auto lg:p-10 md:p-6 sm:p-3 p-2 ">
        {children}
      </div>
    </main>
  );
}

export default Main;
