import { ReactNode } from "react";

function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-3 flex-col justify-center  min-h-screen max-h-screen items-center">
      {children}
    </div>
  );
}

export default AppWrapper;
