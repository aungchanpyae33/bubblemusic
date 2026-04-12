import { RefObject } from "react";
import { FocusElement } from "./FocusElement";
// currently not implemented
function ArrowNavi(
  e: React.KeyboardEvent<HTMLDivElement>,
  dataInc: RefObject<number>,
  containerRef: RefObject<HTMLDivElement | null>,
  ascendingDr: string,
  descendingDir: string,
  MaxLength: number,
  focusAttribute: string,
) {
  if (e.key === "Tab" || e.key === "Escape") {
    if (!containerRef.current) return;
    if (dataInc.current === 0) return;
    containerRef.current.focus();
  }
  if (e.key === ascendingDr || e.key === descendingDir) {
    e.preventDefault();
    e.stopPropagation();

    if (e.key === ascendingDr) {
      dataInc.current = dataInc.current === MaxLength ? 0 : dataInc.current + 1;
    } else if (e.key === descendingDir) {
      dataInc.current = dataInc.current === 0 ? MaxLength : dataInc.current - 1;
    }
    FocusElement(e.currentTarget as HTMLElement, focusAttribute, dataInc);
  }
}
export default ArrowNavi;
