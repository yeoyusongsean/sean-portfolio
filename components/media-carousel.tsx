"use client";

import React from "react"

/**
 * =============================================================================
 * MEDIA CAROUSEL COMPONENT
 * =============================================================================
 * 
 * This component displays a carousel of images and videos for project showcases.
 * It's used in the Projects section for featured projects.
 * 
 * HOW TO USE:
 * 
 * Import and use in your components:
 * 
 * import { MediaCarousel, type MediaItem } from "./media-carousel";
 * 
 * const media: MediaItem[] = [
 *   { type: "image", src: "/project-screenshot.jpg", alt: "Screenshot" },
 *   { type: "video", src: "/demo.mp4", poster: "/thumbnail.jpg" },
 * ];
 * 
 * <MediaCarousel items={media} />
 * 
 * MEDIA ITEM OPTIONS:
 * - type: "image" | "video"
 * - src: Path to the media file (put files in /public folder)
 * - alt: Alt text for images (accessibility)
 * - poster: Thumbnail image for videos (shows before play)
 * 
 * FEATURES:
 * - Images: Click anywhere on the image to open fullscreen
 * - Videos: Native HTML5 controls (play/pause, volume, seek, fullscreen)
 * - Fullscreen: Click outside content or press Escape to close
 * 
 * =============================================================================
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

export type MediaItem = {
  type: "image" | "video";
  src: string;
  alt?: string;
  poster?: string;
};

type MediaCarouselProps = {
  items: MediaItem[];
  className?: string;
  enableFullscreen?: boolean;  // Set to false to disable fullscreen on click (default: true)
};

export function MediaCarousel({ items, className = "", enableFullscreen = true }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  const currentItem = items[currentIndex];

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Handle backdrop click to close fullscreen
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeFullscreen();
    }
  };

  // Handle keyboard navigation in fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullscreen) return;
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") closeFullscreen();
    };
    
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, goToPrevious, goToNext]);

  // Pause videos when changing slides
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
  }, [currentIndex]);

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  if (items.length === 0) return null;

  return (
    <>
      {/* Regular Carousel View */}
      <div className={`relative group bg-secondary/30 overflow-hidden ${className}`}>
        {/* Media Display */}
        <div className="relative aspect-video">
          {currentItem.type === "image" ? (
            /* Image - Click to open fullscreen (if enabled) */
            <Image
              src={currentItem.src || "/placeholder.svg"}
              alt={currentItem.alt || "Project image"}
              fill
              className={`object-cover ${enableFullscreen ? "cursor-pointer" : ""}`}
              onClick={enableFullscreen ? openFullscreen : undefined}
            />
          ) : (
            /* Video with native HTML5 controls */
            <video
              ref={videoRef}
              src={currentItem.src}
              poster={currentItem.poster}
              className="w-full h-full object-contain bg-black"
              controls
              playsInline
            />
          )}
        </div>

        {/* Navigation Arrows */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card/80 border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
              aria-label="Previous media"
            >
              <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-card/80 border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
              aria-label="Next media"
            >
              <ChevronRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            {/* Dots Indicator */}
            <div className="flex gap-1.5 sm:gap-2">
              {items.map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/50 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to media ${index + 1}`}
                />
              ))}
            </div>

            {/* Media Type Counter */}
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              {currentItem.type === "video" ? "video" : "image"} {currentIndex + 1}/{items.length}
            </span>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal - Only rendered if enableFullscreen is true */}
      {enableFullscreen && isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex flex-col"
          onClick={handleBackdropClick}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-[60] w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
            aria-label="Close fullscreen"
          >
            <X size={20} />
          </button>

          {/* Navigation Arrows */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-[60] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                aria-label="Previous media"
              >
                <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-[60] w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                aria-label="Next media"
              >
                <ChevronRight size={20} className="sm:w-6 sm:h-6" />
              </button>
            </>
          )}

          {/* Content Area - Scrollable */}
          <div 
            className="flex-1 overflow-y-auto flex items-center justify-center p-4 pt-16 pb-24 sm:px-16 sm:py-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-5xl mx-auto">
              {currentItem.type === "image" ? (
                <Image
                  src={currentItem.src || "/placeholder.svg"}
                  alt={currentItem.alt || "Project image"}
                  width={1600}
                  height={900}
                  className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg mx-auto"
                  priority
                />
              ) : (
                <video
                  ref={fullscreenVideoRef}
                  src={currentItem.src}
                  poster={currentItem.poster}
                  className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg mx-auto"
                  controls
                  autoPlay={false}
                  playsInline
                />
              )}

              {/* Caption */}
              {currentItem.alt && (
                <p className="mt-4 text-sm text-muted-foreground font-mono text-center">
                  {currentItem.alt}
                </p>
              )}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 sm:gap-4 px-3 sm:px-4 py-2 bg-card/90 border border-border rounded-full backdrop-blur-sm">
            <div className="flex gap-1.5 sm:gap-2">
              {items.map((item, index) => (
                <button
                  key={`fullscreen-${item.src}-${index}`}
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-primary"
                      : "bg-muted-foreground/50 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to media ${index + 1}`}
                />
              ))}
            </div>
            <span className="text-xs sm:text-sm font-mono text-muted-foreground">
              {currentIndex + 1} / {items.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
