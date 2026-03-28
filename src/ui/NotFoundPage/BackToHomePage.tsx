import { _Translator } from "next-intl";
import { ReactNode } from "react";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  b: _Translator<Record<string, any>, "block">;
};
async function BackToHomePage({
  b,
  children,
}: {
  b: Props["b"];
  children: ReactNode;
}) {
  return (
    <a href={"/"} className="  flex gap-5 ">
      {children}
      <span className="bg-surface-1 rounded-lg p-2"> {b("home")}</span>
    </a>
  );
}

export default BackToHomePage;
