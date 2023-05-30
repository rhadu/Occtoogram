import React from "react"
import { FetchFunction, InfiniteLoader } from "../InfiniteLoader"
import styles from "./style.module.css"

type Post = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}

function resizeImageUrl(url: string, width = 600, height = 600) {
  const newUrl = url.replace(
    /picsum.photos\/id\/(\d+)\/(\d+)\/(\d+)/,
    `picsum.photos/id/$1/${width}/${height}`,
  )
  return newUrl
}

const fetchPosts: FetchFunction<Post> = async (page, limit) => {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${page}&limit=${limit}`,
  )
  const data = await response.json()

  return data
}
const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const [isImageLoaded, setIsImageLoaded] = React.useState(false)

  React.useEffect(() => {
    let observerRefValue: HTMLImageElement | null = null

    if (imgRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          observerRefValue = imgRef.current
          const firstEntry = entries[0]
          if (firstEntry.isIntersecting) {
            if (imgRef.current) {
              imgRef.current.src = resizeImageUrl(post.download_url)
              observer.unobserve(imgRef.current)
            }
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px 600px 0px" },
      )

      observer.observe(imgRef.current)

      return () => {
        if (observerRefValue) {
          observer.unobserve(observerRefValue)
        }
      }
    }
  }, [post.download_url])

  const handleImageLoad = () => {
    setIsImageLoaded(true)
  }

  return (
    <div className={styles.imageContainer}>
      {!isImageLoaded && (
        <div className={`${styles.skeleton} ${styles.imageWrapper}`}></div>
      )}
      <img
        ref={imgRef}
        alt={post.author}
        onLoad={handleImageLoad}
        className={styles.imageWrapper}
        style={{ visibility: isImageLoaded ? "visible" : "hidden" }}
      />
    </div>
  )
}

const MemoPostCard = React.memo(PostCard)

export function Occtoogram() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0.25rem",
      }}
    >
      <InfiniteLoader
        fetchFunction={fetchPosts}
        limit={18}
        renderItem={(post) => <MemoPostCard key={post.id} post={post} />}
      />
    </div>
  )
}
