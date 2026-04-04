import { _Translator } from "next-intl";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  w: _Translator<Record<string, any>, "Warning">;
};
async function NotFoundText({ w }: { w: Props["w"] }) {
  return (
    <div className=" text-center max-w-80">
      <h1 className="text-lg mb-2 font-extrabold">
        {w("globalNotFoundTitle")}
      </h1>
      <p>{w("globalNotFoundText")}</p>
    </div>
  );
}

export default NotFoundText;
