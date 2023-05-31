import React from "react"

import { useInfiniteLoader } from "./useInfiniteLoader"
import { FetchFunction } from "@/types/InfiniteLoader.types"

interface InfiniteLoaderProps<T> {
  fetchFunction: FetchFunction<T>
  limit?: number
  renderItem: (item: T) => React.ReactNode
}

function InfiniteLoader<T>({
  fetchFunction,
  limit = 10,
  renderItem,
}: InfiniteLoaderProps<T>) {
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

export default InfiniteLoader