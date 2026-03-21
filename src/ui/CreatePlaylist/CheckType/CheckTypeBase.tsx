import { useTranslations } from "next-intl";

type PrivacyType = "public" | "private";

type CheckTypeBaseProps = {
  defaultValue?: PrivacyType;
  name?: string;
};

function CheckTypeBase({
  defaultValue,
  name = "typeCheck",
}: CheckTypeBaseProps) {
  const b = useTranslations("block");

  const options: { label: string; value: PrivacyType }[] = [
    { label: b("playlistForm.public"), value: "public" },
    { label: b("playlistForm.private"), value: "private" },
  ];

  return (
    <fieldset className="my-2">
      <legend className="mb-2 font-medium">{b("playlistForm.privacy")}</legend>

      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <label key={opt.value} className="cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt.value}
              defaultChecked={
                defaultValue ? defaultValue === opt.value : i === 0
              }
              className="sr-only peer"
            />
            <div className="px-4 py-2 rounded-lg border-2 border-borderFull transition-colors duration-300 font-medium peer-checked:bg-brand peer-checked:text-foreground">
              {opt.label}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default CheckTypeBase;
