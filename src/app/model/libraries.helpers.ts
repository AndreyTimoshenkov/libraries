import { map, Observable } from "rxjs";

export interface ApiResponseItem {
  Cells: Record<string, any>;
}

export const extractData = <T extends Record<string, any>, K extends keyof T>(
  source$: Observable<{ Cells: T }[]>,
  keys: readonly K[],
  nestedKey?: { key: K; subKey: keyof T[K] }
): Observable<Pick<T, K>[]> => {
  return source$.pipe(
    map(data =>
      data.map(item => {
        const unwrapped = item.Cells;

        const extracted = keys.reduce((acc, key) => {
          acc[key] = unwrapped[key];
          return acc;
        }, {} as Pick<T, K>);

        if (nestedKey && Array.isArray(extracted[nestedKey.key])) {
          const nestedObject = extracted[nestedKey.key][0];
          if (nestedObject) {
            extracted[nestedKey.key] = nestedObject[nestedKey.subKey];
          }
        }

        return extracted;
      })
    )
  );
};

export interface ILibrary {
  FullName: string;
  ObjectAddress: string;
}
