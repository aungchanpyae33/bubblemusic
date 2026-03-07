import { RefObject } from "react";

const AbortFetch = (
  fetching: RefObject<{ isFetch: boolean; fetchingseg: number }>,
  abortController: RefObject<AbortController | null>,
  seekSeg: number,
) => {
  if (fetching.current.isFetch) {
    if (abortController.current && fetching.current.fetchingseg !== seekSeg) {
      abortController.current.abort("seeked");
      abortController.current = new AbortController();
      fetching.current.isFetch = false;
    }
  }
};
export default AbortFetch;
