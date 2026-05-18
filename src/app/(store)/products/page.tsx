// src/app/(store)/products/page.tsx

import { Suspense } from "react";
import { getProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { ProductsClient } from "@/components/product/ProductsClient";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our full collection of products",
};

interface ProductsPageProps {
  searchParams: Promise<{
    categoryId?: string;
    title?: string;
    price_min?: string;
    price_max?: string;
    sort?: string;
    page?: string;
  }>;
}

async function ProductsContent({
  searchParams,
}: {
  searchParams: Awaited<ProductsPageProps["searchParams"]>;
}) {
  const page       = Number(searchParams.page) || 1;
  const limit      = 12;
  const offset     = (page - 1) * limit;
  const categoryId = searchParams.categoryId
    ? Number(searchParams.categoryId)
    : undefined;

  // Parallel fetch — fast!
  const [products, categories] = await Promise.all([
    getProducts({
      limit:      limit + 1, // +1 diye check korbo next page ache kina
      offset,
      categoryId,
      title:      searchParams.title || undefined,
      price_min:  searchParams.price_min
        ? Number(searchParams.price_min)
        : undefined,
      price_max:  searchParams.price_max
        ? Number(searchParams.price_max)
        : undefined,
    }),
    getCategories(),
  ]);

  const hasNextPage = products.length > limit;
  const displayProducts = hasNextPage ? products.slice(0, limit) : products;

  return (
    <ProductsClient
      initialProducts={displayProducts}
      categories={categories}
      currentFilters={{
        categoryId: searchParams.categoryId,
        title:      searchParams.title,
        price_min:  searchParams.price_min,
        price_max:  searchParams.price_max,
        sort:       searchParams.sort,
        page:       searchParams.page,
      }}
      currentPage={page}
      hasNextPage={hasNextPage}
    />
  );
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const resolvedParams = await searchParams;

  return (
    <div className="container py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="text-muted-foreground mt-1">
          Browse our full collection
        </p>
      </div>

      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsContent searchParams={resolvedParams} />
      </Suspense>
    </div>
  );
}

function ProductsPageSkeleton() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Filter sidebar skeleton */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="rounded-lg border bg-background p-4 space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-10 w-full animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </aside>
      {/* Product grid skeleton */}
      <div className="flex-1">
        <ProductGridSkeleton count={12} />
      </div>
    </div>
  );
}