import { map, Observable } from "rxjs";

export interface ApiResponseItem {
  Cells: Record<string, any>;
  Number: number;
}

export const extractData = <T extends Record<string, any>, K extends keyof T>(
  source$: Observable<{ Number: number; Cells: T }[]>,
  keys: readonly K[],
  nestedKey?: { key: K; subKey: keyof T[K] }
): Observable<(Pick<T, K> & { Number: number })[]> => {
  return source$.pipe(
    map(data =>
      data.map(item => {
        const unwrapped = item.Cells;

        const extracted = keys.reduce((acc, key) => {
          acc[key] = unwrapped[key];
          return acc;
        }, {} as Pick<T, K>);

        const result = { ...extracted, Number: item.Number };

        if (nestedKey && Array.isArray(result[nestedKey.key])) {
          const nestedObject = result[nestedKey.key][0];
          if (nestedObject) {
            result[nestedKey.key] = nestedObject[nestedKey.subKey];
          }
        }

        return result;
      })
    )
  );
};


export interface ILibrary {
  FullName: string;
  ObjectAddress: string;
  Number: number;
}
