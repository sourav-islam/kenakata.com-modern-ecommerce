// src/components/product/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { getSafeImageUrl } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  title:  string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed,      setZoomed]      = useState(false);

  // Clean & validate all images
  const cleanImages = images
    .map((img) => getSafeImageUrl([img]))
    .filter(Boolean);

  // At least 1 image guarantee
  const displayImages =
    cleanImages.length > 0
      ? cleanImages
      : ["https://placehold.co/600x600/f1f5f9/64748b?text=No+Image"];

  const activeImage = displayImages[activeIndex];

  const goNext = () =>
    setActiveIndex((i) => (i + 1) % displayImages.length);

  const goPrev = () =>
    setActiveIndex((i) =>
      i === 0 ? displayImages.length - 1 : i - 1
    );

  return (
    <div className="flex flex-col gap-3">

      {/* ── Main Image ─────────────────────────── */}
      <div
        className={cn(
          "relative aspect-square overflow-hidden rounded-xl border bg-muted",
          "group cursor-zoom-in"
        )}
        onClick={() => setZoomed(true)}
      >
        <Image
          key={activeImage}
          src={activeImage}
          alt={`${title} — image ${activeIndex + 1}`}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const t  = e.target as HTMLImageElement;
            t.src = "https://placehold.co/600x600/f1f5f9/64748b?text=No+Image";
          }}
        />

        {/* Zoom hint */}
        <div className="absolute right-3 top-3 rounded-full bg-background/80 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
          <ZoomIn className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Navigation arrows — only if multiple images */}
        {displayImages.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2",
                "rounded-full bg-background/80 p-2 shadow-sm",
                "opacity-0 group-hover:opacity-100 transition-opacity",
                "hover:bg-background backdrop-blur-sm"
              )}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2",
                "rounded-full bg-background/80 p-2 shadow-sm",
                "opacity-0 group-hover:opacity-100 transition-opacity",
                "hover:bg-background backdrop-blur-sm"
              )}
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {displayImages.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === activeIndex
                      ? "w-4 bg-primary"
                      : "w-1.5 bg-background/60 hover:bg-background"
                  )}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Thumbnails ─────────────────────────── */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={cn(
                "relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-all",
                i === activeIndex
                  ? "border-primary ring-1 ring-primary"
                  : "border-transparent hover:border-muted-foreground/30"
              )}
              aria-label={`Thumbnail ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${i + 1}`}
                fill
                sizes="64px"
                className="object-contain p-1"
                onError={(e) => {
                  const t  = e.target as HTMLImageElement;
                  t.src = "https://placehold.co/64x64/f1f5f9/64748b?text=?";
                }}
              />
            </button>
          ))}
        </div>
      )}

      {/* ── Zoom Modal ──────────────────────────── */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
          onClick={() => setZoomed(false)}
        >
          <div className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl">
            <Image
              src={activeImage}
              alt={title}
              width={800}
              height={800}
              className="object-contain max-h-[85vh] w-auto"
            />
            <button
              className="absolute right-3 top-3 rounded-full bg-background/80 p-2 hover:bg-background transition-colors"
              onClick={() => setZoomed(false)}
              aria-label="Close zoom"
            >
              <ChevronLeft className="h-4 w-4 rotate-[135deg]" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}