// InfiniteLoader.tsx

import React from "react"

import { useInfiniteLoader } from "./useInfiniteLoader"
import { FetchFunction } from "."

interface InfiniteLoaderProps<T> {
  fetchFunction: FetchFunction<T>
  limit?: number
  renderItem: (item: T) => React.ReactNode
}

export const InfiniteLoader = <T,>({
  fetchFunction,
  limit = 10,
  renderItem,
}: InfiniteLoaderProps<T>) => {
  const { data, hasMore, loaderRef } = useInfiniteLoader(fetchFunction, limit)

  return (
    <>
      {data.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
      ))}
      {hasMore && <div ref={loaderRef}>Loading...</div>}
    </>
  )
}
