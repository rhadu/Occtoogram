import React from "react"

import { resizeImageUrl } from "@/utils/helpers"
import type { Post } from "@/types/Post"

import styles from "./PostCard.module.css"

type Props = {
  post: Post
}

function PostCard({ post }: Props) {
  const imgRef = React.useRef<HTMLImageElement | null>(null)
  const [isImageLoaded, setIsImageLoaded] = React.useState(false)

  React.useEffect(() => {
    const currentImgRef = imgRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting) {
          currentImgRef!.src = resizeImageUrl(post.download_url)
          observer.unobserve(currentImgRef!)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px 600px 0px" },
    )
    if (currentImgRef) {
      observer.observe(currentImgRef)
    }

    return () => {
      if (currentImgRef) {
        observer.unobserve(currentImgRef)
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
        style={{
          visibility: isImageLoaded ? "visible" : "hidden",
        }}
      />
    </div>
  )
}

export const MemoPostCard = React.memo(PostCard)
