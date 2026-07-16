"use client";

import React, { useState, useEffect, useRef } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export default function SafeImage({
  src,
  alt = "",
  className = "",
  style,
  fallback,
  ...props
}: SafeImageProps) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">("loading");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }
    console.log(`[SafeImage] Reading image source from json: ${src}`);

    const img = imgRef.current;
    if (!img) return;

    const onLoad = () => {
      console.log(`[SafeImage] Successfully loaded image: ${src}`);
      setStatus("loaded");
    };

    const onError = () => {
      console.error(`[SafeImage] Failed to load image: ${src}`);
      setStatus("error");
    };

    // If it's already cached and complete
    if (img.complete) {
      onLoad();
    } else {
      setStatus("loading");
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
    }

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src]);

  const isContain = className.includes("object-contain");
  const isCover = className.includes("object-cover");
  const objectFitClass = isContain ? "object-contain" : "object-cover";

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Loading Skeleton */}
      {status === "loading" && (
        <div className="absolute inset-0 bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse rounded-inherit w-full h-full min-h-[40px] z-10" />
      )}

      {/* Error Fallback */}
      {status === "error" && (
        fallback ? (
          fallback
        ) : (
          <div className="absolute inset-0 bg-neutral-150 dark:bg-zinc-900 border border-dashed border-neutral-350 dark:border-zinc-800 rounded-inherit flex items-center justify-center text-xs text-neutral-400 font-mono z-10">
            N/A
          </div>
        )
      )}

      {/* Actual Image */}
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`w-full h-full ${objectFitClass} transition-opacity duration-300 ${
            status === "loaded" ? "opacity-100" : "opacity-0 absolute pointer-events-none"
          }`}
          {...props}
        />
      )}
    </div>
  );
}
