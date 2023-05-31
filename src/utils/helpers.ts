export function resizeImageUrl(url: string, width = 600, height = 600) {
  const newUrl = url.replace(
    /picsum.photos\/id\/(\d+)\/(\d+)\/(\d+)/,
    `picsum.photos/id/$1/${width}/${height}`,
  )
  return newUrl
}
