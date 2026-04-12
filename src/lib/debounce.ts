const debounce = <T extends (...args: never[]) => void>(
  fn: T,
  delay: number,
) => {
  let id: ReturnType<typeof setTimeout> | undefined;
  return (...arg: Parameters<T>) => {
    if (id) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...arg);
    }, delay);
  };
};

export default debounce;
