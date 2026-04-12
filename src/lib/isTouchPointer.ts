export function isTouchPointer(e: React.PointerEvent | PointerEvent) {
  return e.pointerType === "touch";
}
