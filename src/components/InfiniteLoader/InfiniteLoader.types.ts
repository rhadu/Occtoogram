export type FetchFunction<T> = (page: number, limit?: number) => Promise<T[]>;
