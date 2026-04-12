import ErrorPageText from "./ErrorPageText";
import ReloadPageButton from "./ReloadPageButton";
import GoBackButton from "./GoBackButton";

function ErrorWrapper({ reset }: { reset: () => void }) {
  return (
    <>
      <ErrorPageText />
      <div className=" flex items-center gap-3">
        <ReloadPageButton reset={reset} />
        <GoBackButton />
      </div>
    </>
  );
}

export default ErrorWrapper;
