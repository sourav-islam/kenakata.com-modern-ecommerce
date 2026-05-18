// src/app/(store)/products/loading.tsx
import { ProductGridSkeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="container py-8">
      <div className="mb-8 space-y-2">
        <div className="h-9 w-48 animate-pulse rounded bg-muted" />
        <div className="h-5 w-64 animate-pulse rounded bg-muted" />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar skeleton */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="rounded-lg border bg-background p-4 space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="space-y-1">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className="h-9 w-full animate-pulse rounded-md bg-muted"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Grid skeleton */}
        <div className="flex-1">
          <ProductGridSkeleton count={12} />
        </div>
      </div>
    </div>
  );
}