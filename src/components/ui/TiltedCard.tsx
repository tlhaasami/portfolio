"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './TiltedCard.css';

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  className?: string;
  priority?: boolean;
  onLoaded?: () => void;
}

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className = '',
  priority = false,
  onLoaded
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imageStatus, setImageStatus] = useState<"loading" | "loaded" | "error">("loading");

  useEffect(() => {
    if (!imageSrc) {
      setTimeout(() => {
        setImageStatus("error");
        if (onLoaded) onLoaded();
      }, 0);
      return;
    }
    console.log(`[TiltedCard] Reading profile image from json: ${imageSrc}`);

    const img = imgRef.current;
    if (!img) return;

    const onLoad = () => {
      console.log(`[TiltedCard] Successfully loaded image: ${imageSrc}`);
      setImageStatus("loaded");
      if (onLoaded) onLoaded();
    };

    const onError = () => {
      console.error(`[TiltedCard] Failed to load image: ${imageSrc}`);
      setImageStatus("error");
      if (onLoaded) onLoaded();
    };

    if (img.complete) {
      setTimeout(() => onLoad(), 0);
    } else {
      setTimeout(() => setImageStatus("loading"), 0);
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onError);
    }

    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [imageSrc, onLoaded]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={`tilted-card-figure ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <motion.div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        {imageStatus === "loading" && (
          <div className="absolute inset-0 bg-neutral-200/50 dark:bg-zinc-800/50 animate-pulse rounded-inherit w-full h-full z-10" />
        )}
        {imageStatus === "error" && (
          <div className="absolute inset-0 bg-neutral-100 dark:bg-zinc-900 border border-dashed border-neutral-300 dark:border-zinc-800 rounded-inherit flex items-center justify-center text-xs text-neutral-400 font-mono z-10">
            Profile Pic N/A
          </div>
        )}
          <>
            {priority && (
              <link rel="preload" href={imageSrc} as="image" fetchPriority="high" />
            )}
            <motion.img
              ref={imgRef}
              src={imageSrc}
              alt={altText}
              className="tilted-card-img"
              fetchPriority={priority ? "high" : undefined}
              loading={priority ? "eager" : "lazy"}
              style={{
                width: imageWidth,
                height: imageHeight,
                opacity: imageStatus === "loaded" ? 1 : 0
              }}
            />
          </>

        {displayOverlayContent && overlayContent && (
          <motion.div className="tilted-card-overlay">{overlayContent}</motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="tilted-card-caption"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
