import { RefObject } from "react";

export function closeModalBox<T>(
  fun: (value: T | undefined) => void,
  originParentTriggerRef: RefObject<HTMLElement | null>,
) {
  fun(undefined);
  if (!originParentTriggerRef.current) return;
  originParentTriggerRef.current.focus();
}
