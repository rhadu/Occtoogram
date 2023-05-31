export type FetchFunction<T> = (
  page: number,
  limit?: number,
) => Promise<{ data: T[] | null; error: Error | null }>
