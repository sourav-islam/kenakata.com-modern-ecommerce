// src/components/product/ProductFiltersPanel.tsx
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Category } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface CurrentFilters {
  categoryId?: string;
  title?:      string;
  price_min?:  string;
  price_max?:  string;
}

interface ProductFiltersPanelProps {
  categories:      Category[];
  currentFilters:  CurrentFilters;
  onFilterChange:  (updates: Record<string, string | undefined>) => void;
  onClearAll:      () => void;
}

// Collapsible filter section
function FilterSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b pb-4 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 text-sm font-medium"
      >
        {title}
        {open
          ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
          : <ChevronDown className="h-4 w-4 text-muted-foreground" />
        }
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export function ProductFiltersPanel({
  categories,
  currentFilters,
  onFilterChange,
  onClearAll,
}: ProductFiltersPanelProps) {
  const [priceMin, setPriceMin] = useState(currentFilters.price_min ?? "");
  const [priceMax, setPriceMax] = useState(currentFilters.price_max ?? "");

  const hasActiveFilters = !!(
    currentFilters.categoryId ||
    currentFilters.price_min  ||
    currentFilters.price_max
  );

  const applyPriceFilter = () => {
    onFilterChange({
      price_min: priceMin || undefined,
      price_max: priceMax || undefined,
    });
  };

  return (
    <div className="rounded-lg border bg-background p-4 space-y-4 sticky top-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-xs text-primary hover:underline"
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Category ─────────────────────── */}
      <FilterSection title="Category">
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ categoryId: undefined })}
            className={cn(
              "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
              !currentFilters.categoryId
                ? "bg-primary text-primary-foreground font-medium"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                onFilterChange({ categoryId: String(cat.id) })
              }
              className={cn(
                "w-full rounded-md px-3 py-2 text-left text-sm transition-colors capitalize",
                currentFilters.categoryId === String(cat.id)
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* ── Price Range ───────────────────── */}
      <FilterSection title="Price Range">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              min={0}
            />
            <Input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              min={0}
            />
          </div>

          {/* Quick price ranges */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: "Under $50",  min: "",   max: "50"  },
              { label: "$50–$200",   min: "50",  max: "200" },
              { label: "$200–$500",  min: "200", max: "500" },
              { label: "Over $500",  min: "500", max: ""    },
            ].map((range) => (
              <button
                key={range.label}
                onClick={() => {
                  setPriceMin(range.min);
                  setPriceMax(range.max);
                  onFilterChange({
                    price_min: range.min || undefined,
                    price_max: range.max || undefined,
                  });
                }}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-xs transition-colors",
                  currentFilters.price_min === range.min &&
                  currentFilters.price_max === range.max
                    ? "bg-primary text-primary-foreground border-primary"
                    : "hover:bg-muted border-border text-muted-foreground"
                )}
              >
                {range.label}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={applyPriceFilter}
          >
            Apply Price
          </Button>
        </div>
      </FilterSection>
    </div>
  );
}