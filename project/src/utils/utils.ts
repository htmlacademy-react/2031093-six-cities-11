// import dayjs from 'dayjs';

export const debounce = (callback: () => void, timeoutDelay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...rest: []) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export const shuffle = <T>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

// export const getDateDifferenceInSeconds = (d1: string, d2: string): number => dayjs(d1).diff(dayjs(d2), 'second');
