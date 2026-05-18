// src/components/product/ProductSortBar.tsx
"use client";

import { ArrowUpDown } from "lucide-react";

interface ProductSortBarProps {
  currentSort?: string;
  onSort:       (sort: string) => void;
}

const sortOptions = [
  { value: "default",    label: "Default"       },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
  { value: "title_asc",  label: "Name: A → Z"   },
  { value: "title_desc", label: "Name: Z → A"   },
];

export function ProductSortBar({ currentSort, onSort }: ProductSortBarProps) {
  return (
    <div className="flex items-center gap-2 ml-auto">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground shrink-0" />
      <select
        value={currentSort ?? "default"}
        onChange={(e) => onSort(e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          text-foreground cursor-pointer"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}