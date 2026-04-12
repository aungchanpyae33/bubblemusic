import Button from "@/components/button/Button";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { startTransition } from "react";

function ReloadPageButton({ reset }: { reset: () => void }) {
  const b = useTranslations("block");
  const router = useRouter();
  const loader = useTopLoader();
  return (
    <Button
      onClick={() => {
        startTransition(() => {
          loader.start();
          router.refresh(); // ← re-fetches server data
          reset(); // ← clears error state
        });
      }}
    >
      <span>{b("reload")}</span>
    </Button>
  );
}

export default ReloadPageButton;
