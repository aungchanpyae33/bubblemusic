import Button from "@/components/button/Button";
import { useTranslations } from "next-intl";

function ReloadPageButton({ unstable_retry }: { unstable_retry: () => void }) {
  const b = useTranslations("block");
  return (
    <Button
      onClick={
        // Attempt to recover by re-fetching and re-rendering the segment
        () => unstable_retry()
      }
    >
      <span>{b("reload")}</span>
    </Button>
  );
}

export default ReloadPageButton;
