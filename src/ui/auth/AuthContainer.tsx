import { ReactNode } from "react";

function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-5 md:p-10">
      <div className="w-full bg-section rounded-md max-w-sm border border-seperate-soft p-3 md:p-5 py-10 space-y-5 ">
        {children}
      </div>
    </div>
  );
}

export default AuthContainer;
