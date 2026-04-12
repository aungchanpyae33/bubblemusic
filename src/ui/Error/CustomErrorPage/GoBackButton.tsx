import Button from "@/components/button/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "nextjs-toploader/app";

function GoBackButton() {
  const b = useTranslations("block");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };
  return (
    <Button>
      <span onClick={handleGoBack}>{b("back")}</span>
    </Button>
  );
}

export default GoBackButton;
