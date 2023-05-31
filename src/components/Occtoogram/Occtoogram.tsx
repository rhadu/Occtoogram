import { InfiniteLoader } from "@components/InfiniteLoader"
import { MemoPostCard, fetchPosts } from "@components/PostCard"

import { Post } from "@/types/Post"

import styles from "./Occtoogram.module.css"

export function Occtoogram() {
  const PostItem = (post: Post) => <MemoPostCard key={post.id} post={post} />

  return (
    <div className={styles.wrapper}>
      <InfiniteLoader
        fetchFunction={fetchPosts}
        limit={18}
        renderItem={PostItem}
      />
    </div>
  )
}
