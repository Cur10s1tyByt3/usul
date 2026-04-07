"use client";

import type { ImageLoader, ImageProps } from "next/image";
import Image from "next/image";

export const cloudflareImageLoader: ImageLoader = ({ src, width, quality }) => {
  // Vercel does not serve /cdn-cgi/image/; embedding https:// in that path gets mangled by redirects.
  // Use remote URLs as-is (e.g. assets.usul.ai).
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  const props = [
    "format=auto",
    "fit=scale-down", // never enlarge the image, but allow it to either scale down or stay the same
    `width=${width}`,
  ];

  if (quality) {
    props.push(`quality=${quality}`);
  }

  return `https://usul.ai/cdn-cgi/image/${props.join(",")}/${src}`;
};

export function CloudflareImage(props: Omit<ImageProps, "loader">) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return (
    <Image {...props} loader={cloudflareImageLoader} suppressHydrationWarning />
  );
}
