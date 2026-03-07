import { useTranslations } from "next-intl";

function LoadingLyric() {
  const l = useTranslations("Loading");
  return (
    <div className="flex flex-col gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <div className="flex space-x-2">
        <div
          className="w-4 h-4 bg-brand rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-4 h-4 bg-brand rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-4 h-4 bg-brand rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <span className="whitespace-nowrap animate-pulse">
        {l("loadingLyric")}
      </span>
    </div>
  );
}

export default LoadingLyric;
