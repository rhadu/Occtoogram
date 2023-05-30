import { useEffect, useRef, useState } from "react"
import { FetchFunction } from "./InfiniteLoader.types"

export const useInfiniteLoader = <T>(
  fetchFunction: FetchFunction<T>,
  limit: number,
) => {
  const [data, setData] = useState<T[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]

        if (firstEntry.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      },
      { threshold: 1 },
    )

    const currentLoaderRef = loaderRef.current
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef)
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef)
      }
    }
  }, [loaderRef, hasMore])

  useEffect(() => {
    fetchFunction(page, limit).then((newData) => {
      setData((prevData) => [...prevData, ...newData])
      setHasMore(newData.length >= limit)
    })
  }, [fetchFunction, limit, page])

  return { data, hasMore, loaderRef }
}
