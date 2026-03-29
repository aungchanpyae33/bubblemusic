import ErrorPageText from "./ErrorPageText";
import ReloadPageButton from "./ReloadPageButton";
import GoBackButton from "./GoBackButton";

function ErrorWrapper({ unstable_retry }: { unstable_retry: () => void }) {
  return (
    <>
      <ErrorPageText />
      <div className=" flex items-center gap-3">
        <ReloadPageButton unstable_retry={unstable_retry} />
        <GoBackButton />
      </div>
    </>
  );
}

export default ErrorWrapper;
