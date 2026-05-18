// src/components/product/ProductsClient.tsx
"use client";

import { useCallback, useTransition, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Product, Category } from "@/types";
import { ProductGrid } from "./ProductGrid";
import { ProductFiltersPanel } from "./ProductFiltersPanel";
import { ProductSortBar } from "./ProductSortBar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CurrentFilters {
  categoryId?: string;
  title?:      string;
  price_min?:  string;
  price_max?:  string;
  sort?:       string;
  page?:       string;
}

interface ProductsClientProps {
  initialProducts: Product[];
  categories:      Category[];
  currentFilters:  CurrentFilters;
  currentPage:     number;
  hasNextPage:     boolean;
}

// ── Helper function to sort products client-side ──
function sortProducts(products: Product[], sort?: string): Product[] {
  if (!sort || sort === "default") return products;

  return [...products].sort((a, b) => {
    switch (sort) {
      case "price_asc":
        return a.price - b.price;
      case "price_desc":
        return b.price - a.price;
      case "title_asc":
        return a.title.localeCompare(b.title);
      case "title_desc":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });
}

export function ProductsClient({
  initialProducts,
  categories,
  currentFilters,
  currentPage,
  hasNextPage,
}: ProductsClientProps) {
  const router          = useRouter();
  const pathname        = usePathname();
  const searchParams    = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Active filter count calculate koro
  const activeFilterCount = [
    currentFilters.categoryId,
    currentFilters.title,
    currentFilters.price_min,
    currentFilters.price_max,
  ].filter(Boolean).length;

  // URL update helper
  const updateURL = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Filter change hoile page 1 e reset
      if (!("page" in updates)) {
        params.delete("page");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  // All filters clear
  const clearAllFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  // initialProducts use korar age sort apply koro
  const sortedProducts = sortProducts(initialProducts, currentFilters.sort);

  return (
    <div className="flex flex-col gap-6">

      {/* ── Top bar: sort + filter toggle ─────── */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile filter button */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileFilterOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {activeFilterCount}
              </span>
            )}
          </Button>

          {/* Active filter chips */}
          {activeFilterCount > 0 && (
            <div className="hidden sm:flex items-center gap-2 flex-wrap">
              {currentFilters.categoryId && (
                <FilterChip
                  label={
                    categories.find(
                      (c) => c.id === Number(currentFilters.categoryId)
                    )?.name ?? "Category"
                  }
                  onRemove={() => updateURL({ categoryId: undefined })}
                />
              )}
              {currentFilters.price_min && (
                <FilterChip
                  label={`Min $${currentFilters.price_min}`}
                  onRemove={() => updateURL({ price_min: undefined })}
                />
              )}
              {currentFilters.price_max && (
                <FilterChip
                  label={`Max $${currentFilters.price_max}`}
                  onRemove={() => updateURL({ price_max: undefined })}
                />
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Sort */}
        <ProductSortBar
          currentSort={currentFilters.sort}
          onSort={(sort) => updateURL({ sort })}
        />
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">

        {/* ── Desktop Sidebar Filter ────────── */}
        <aside className="hidden lg:block w-64 shrink-0">
          <ProductFiltersPanel
            categories={categories}
            currentFilters={currentFilters}
            onFilterChange={updateURL}
            onClearAll={clearAllFilters}
          />
        </aside>

        {/* ── Mobile Filter Drawer ──────────── */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileFilterOpen(false)}
            />
            {/* Drawer */}
            <div className="absolute right-0 top-0 h-full w-80 bg-background border-l shadow-xl overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileFilterOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ProductFiltersPanel
                categories={categories}
                currentFilters={currentFilters}
                onFilterChange={(updates) => {
                  updateURL(updates);
                  setMobileFilterOpen(false);
                }}
                onClearAll={() => {
                  clearAllFilters();
                  setMobileFilterOpen(false);
                }}
              />
            </div>
          </div>
        )}

        {/* ── Product Grid ──────────────────── */}
        <div className="flex-1 min-w-0">
          <div
            className={cn(
              "transition-opacity duration-200",
              isPending && "opacity-50 pointer-events-none"
            )}
          >
            {/* ProductGrid e sortedProducts pass kora holo */}
            <ProductGrid
              products={sortedProducts}
              columns={3}
            />
          </div>

          {/* ── Pagination ──────────────────── */}
          {(currentPage > 1 || hasNextPage) && (
            <div className="mt-10 flex items-center justify-center gap-3">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1 || isPending}
                onClick={() =>
                  updateURL({ page: String(currentPage - 1) })
                }
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>

              <span className="flex items-center gap-1.5 text-sm">
                <span className="font-medium">Page {currentPage}</span>
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={!hasNextPage || isPending}
                onClick={() =>
                  updateURL({ page: String(currentPage + 1) })
                }
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Filter chip component ──────────────────────────
function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border bg-secondary px-2.5 py-1 text-xs font-medium">
      {label}
      <button
        onClick={onRemove}
        className="ml-0.5 rounded-full hover:bg-muted p-0.5 transition-colors"
        aria-label={`Remove ${label} filter`}
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}