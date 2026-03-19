import { Locale } from "@/i18n/request";
import IconWrapper from "@/ui/general/IconWrapper";
import OptionButton from "@/ui/general/optionBox/OptionButton";
import OptionContainer from "@/ui/general/optionBox/OptionContainer";
import OptionItem from "@/ui/general/optionBox/OptionItem";
import { Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useTopLoader } from "nextjs-toploader";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

type LanOption = {
  id: Locale;
};

function CheckMark({ id }: { id: LanOption["id"] }) {
  const locale = useLocale();
  if (!locale) return;
  if (id !== locale) return;
  return (
    <span className=" absolute right-2">
      <IconWrapper Icon={Check} size="small" />
    </span>
  );
}

function LanItem({
  option,
  onSelect,
}: {
  option: LanOption;
  onSelect: (theme: LanOption["id"]) => void;
}) {
  const b = useTranslations("block");
  return (
    <OptionItem>
      <OptionButton
        action={() => {
          onSelect(option.id);
        }}
        className=" px-4 w-full"
      >
        {b(`${option.id}`)}
      </OptionButton>
      <CheckMark id={option.id} />
    </OptionItem>
  );
}

function LanguageSub() {
  const router = useRouter();
  const loader = useTopLoader();
  function handleLanguageChange(locale: "my" | "en") {
    loader.start();
    document.cookie = `locale=${locale}; path=/; max-age=31536000`;

    router.refresh();
  }

  const mapData: LanOption[] = [{ id: "en" }, { id: "my" }];
  // loader for language change
  useEffect(() => {
    loader.done();
  }, [loader]);
  return (
    <OptionContainer>
      {mapData.map((option) => (
        <LanItem
          key={option.id}
          option={option}
          onSelect={handleLanguageChange}
        />
      ))}
    </OptionContainer>
  );
}

export default LanguageSub;
