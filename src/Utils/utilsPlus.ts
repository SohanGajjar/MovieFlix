import {Genre} from "../Types/Types";

export function myThrottle<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void
{
  let lastExecuted = 0;
  let lastArgsArray: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>): void =>
  {
    const now = Date.now();
    const timeSinceLastExecution = now - lastExecuted;

    if(timeSinceLastExecution >= delay)
    {
      func(...args);
      lastExecuted = now;
      lastArgsArray = null;
    }
    else
    {
      lastArgsArray = args;
      setTimeout(() =>
      {
        if(lastArgsArray)
        {
          func(...lastArgsArray);
          lastExecuted = Date.now();
          lastArgsArray = null;
        }
      }, delay - timeSinceLastExecution);
    }
  };

  return throttled;
}

export function myDebounce<F extends (...args: any[]) => void>(func: F, delay: number): (...args: Parameters<F>) => void
{
  let timeoutId: NodeJS.Timeout;

  return function(this: ThisParameterType<F>, ...args: Parameters<F>)
  {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() =>
    {
      func.apply(context, args);
    }, delay);
  };
}

export function getGenres(genres: Genre[], genreIds: number[]): string[]
{
  const genreMap: Record<number, string> = {};
  genres.forEach(genre =>
  {
    genreMap[genre.id] = genre.name;
  });
  return genreIds.map(id => genreMap[id]) as string[];
}

export const isStringEmpty = (str: string): boolean =>
{
  return str.trim() === "";
};

export function isSubset(superArray: number[], subArray: number[]): boolean
{
  const globalSet: Set<number> = new Set(superArray);

  for(const num of subArray)
  {
    if(!globalSet.has(num))
    {
      return false;
    }
  }

  return true;
}
