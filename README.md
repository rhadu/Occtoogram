# Occtoogram

Occtoogram is a React application that uses InfiniteLoader to display a gallery of images fetched from the [Lorem Picsum API](https://picsum.photos).

## Live version

https://occtoogram.vercel.app/

## Features

- Infinite scrolling for image loading
- Image lazy loading using Intersection Observer
- Responsive image resizing

## Components & Hooks

- `Occtoogram.tsx` The main component of the application, which renders the InfiniteLoader and contains the PostItem function that is used for rendering images.

- `PostCard.tsx` A React component that displays an individual image post. It uses the Intersection Observer API for lazy loading images and ensures images are shown only after they are loaded.

- `fetchPosts.ts` An asynchronous function responsible for fetching images from the Lorem Picsum API. It handles errors and returns the fetched data or error.

- `InfiniteLoader.tsx` A reusable React component that handles infinite scrolling and data fetching. It takes a fetch function, a limit, and a renderItem function as props.

- `useInfiniteLoader.ts` A custom React hook that manages the state and logic for infinite scrolling, data fetching, and pagination.

- `resizeImageUrl` A utility function that takes an image URL and optional width and height parameters, and returns a new URL with the specified dimensions.

## Installation & Usage

1. Clone this repository.
2. Install dependencies with `npm install`.
3. Run the application with `npm run dev`.
4. Open your browser and navigate to `http://localhost:5173`.

## Optimizations & Performance

### Intersection Observer for Infinite Scrolling

The Intersection Observer is used to implement infinite scrolling. This improves performance by only loading new data when the user reaches the end of the current list, ensuring that unnecessary requests are not made, and the application remains responsive. It is also faster compared to listening for scroll events because it avoids potential performance bottlenecks caused by scroll event handling.

### Lazy Loading Images

The PostCard component also uses the Intersection Observer API for lazy loading images. This ensures that images are only loaded when they come into the viewport, improving performance and reducing unnecessary network requests.

### Image Resizing

To minimize bandwidth usage, images are resized using the `resizeImageUrl` helper function. This function takes an image URL and optional width and height parameters, and returns a new URL with the specified dimensions.

## Further Improvements

### Adding React-Window for Virtualization

Implementing virtualization using a library like `react-window` can help improve the performance of the InfiniteLoader component. Virtualization involves rendering only a subset of the items that are visible in the viewport, which reduces the number of DOM elements and speeds up rendering.

### Implementing React.Suspense
Consider using React.Suspense to handle the loading state of the components within the InfiniteLoader. This would allow for a cleaner and more declarative way to manage loading states and provide better flexibility in handling data fetching.

### Customizable Intersection Observer RootMargin

Allow the `useInfiniteLoader` hook to accept a parameter that specifies how many rows in advance the Intersection Observer should trigger loading new data. This would provide better control over the loading behavior and make it more adaptable to different use cases.

### Customizable Loader Component

Allow the InfiniteLoader component to accept a custom React loader component as a prop. This would enable users to pass their own loader designs and animations, providing a more personalized and flexible loading experience.


Enjoy browsing the Occtoogram gallery!

