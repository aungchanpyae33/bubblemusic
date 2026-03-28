export function guardToSignIn<T>(value: T, fun: (value: T) => void) {
  fun(value);
  return null;
}
