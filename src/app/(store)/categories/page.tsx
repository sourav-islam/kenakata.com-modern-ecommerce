// src/app/(store)/categories/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Grid3X3 } from "lucide-react";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { getSafeImageUrl } from "@/lib/utils/helpers";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title:       "Categories",
  description: "Browse all product categories on KenaKata",
};

// ── Async Content ──────────────────────────────────
async function CategoriesContent() {
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ limit: 200 }),
  ]);

  // Product count per category
  const countMap = allProducts.reduce<Record<number, number>>((acc, p) => {
    acc[p.category.id] = (acc[p.category.id] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {/* Stats bar */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Grid3X3 className="h-4 w-4" />
        <span>
          {categories.length} categories •{" "}
          {allProducts.length} total products
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category, index) => {
          const imageUrl = getSafeImageUrl([category.image]);
          const count    = countMap[category.id] ?? 0;

          return (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="group relative overflow-hidden rounded-2xl border bg-background transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-0.5"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-muted">
                <Image
                  src={imageUrl}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw,
                         (max-width: 1024px) 50vw,
                         25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  priority={index < 4}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />

                {/* Category number badge */}
                <div className="absolute top-3 left-3 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 backdrop-blur-sm text-xs font-bold text-primary border border-border">
                  {index + 1}
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h2 className="font-semibold capitalize text-base leading-tight truncate group-hover:text-primary transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {count} {count === 1 ? "product" : "products"}
                    </p>
                  </div>
                  <div className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

// ── Loading Skeleton ───────────────────────────────
function CategoriesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-2xl border bg-background"
        >
          <Skeleton className="h-48 w-full rounded-none" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Page ──────────────────────────────────────────
export default function CategoriesPage() {
  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          All Categories
        </h1>
        <p className="text-muted-foreground mt-1">
          Find exactly what you are looking for
        </p>
      </div>

      <Suspense fallback={<CategoriesSkeleton />}>
        <CategoriesContent />
      </Suspense>
    </div>
  );
}