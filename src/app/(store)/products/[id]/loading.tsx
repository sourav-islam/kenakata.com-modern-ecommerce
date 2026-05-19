// src/app/(store)/products/[id]/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { ProductGridSkeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="container py-8">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <Skeleton className="h-3.5 w-3.5" />}
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>

      {/* Main content skeleton */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">

        {/* Gallery skeleton */}
        <div className="flex flex-col gap-3">
          <Skeleton className="aspect-square w-full rounded-xl" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-16 rounded-lg shrink-0" />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="flex flex-col gap-5">
          <Skeleton className="h-6 w-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-3/4" />
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4 rounded-sm" />
            ))}
            <Skeleton className="h-4 w-28 ml-2" />
          </div>
          <div className="flex items-baseline gap-3">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="space-y-2 border-t pt-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-36 rounded-lg" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-11 flex-1 rounded-md" />
            <Skeleton className="h-11 flex-1 rounded-md" />
          </div>
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>

      {/* Related products skeleton */}
      <div className="mt-16 space-y-6">
        <Skeleton className="h-7 w-48" />
        <ProductGridSkeleton count={4} />
      </div>
    </div>
  );
}