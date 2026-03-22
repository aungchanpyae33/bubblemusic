import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

type PrivacyType = "public" | "private";

type CheckTypeBaseProps = {
  name: string;
};

function CheckTypeBase({ name }: CheckTypeBaseProps) {
  const b = useTranslations("block");
  const { register } = useFormContext();
  const options: { label: string; value: PrivacyType }[] = [
    { label: b("playlistForm.public"), value: "public" },
    { label: b("playlistForm.private"), value: "private" },
  ];

  return (
    <fieldset className="space-y-3">
      <legend className="font-medium">{b("playlistForm.privacy")}</legend>

      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="cursor-pointer">
            <input
              type="radio"
              value={opt.value}
              {...register(name)}
              className="peer sr-only"
            />
            <div className="px-4 py-2 rounded-lg border-2 border-borderFull transition-colors duration-300 font-medium peer-checked:bg-brand peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-blue-800 peer-checked:text-foreground">
              {opt.label}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default CheckTypeBase;
