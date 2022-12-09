export const debounce = (callback: () => void, timeoutDelay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...rest: []) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
