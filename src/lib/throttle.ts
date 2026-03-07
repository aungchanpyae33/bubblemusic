const throttle = <T extends (...args: never[]) => void>(
  fn: T,
  delay: number,
) => {
  let lastTime = 0;
  return (...arg: Parameters<T>) => {
    const now = new Date().getTime();
    if (now - lastTime < delay) return;
    lastTime = now;
    fn(...arg);
  };
};
export default throttle;
