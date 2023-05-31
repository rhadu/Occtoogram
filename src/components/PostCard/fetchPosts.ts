import { FetchFunction } from "@/types/InfiniteLoader.types"
import { Post } from "@/types/Post"

export const fetchPosts: FetchFunction<Post> = async (page, limit) => {
  let response, error
  const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`

  try {
    response = await fetch(url)
  } catch (err) {
    error = err
    console.log("There was an error", error)
  }

  if (response?.ok) {
    const data = await response.json()
    return { data, error: null }
  } else {
    error = new Error(`HTTP Response Code: ${response?.status}`)
    console.error("Error:", error)
    return { data: null, error }
  }
}
