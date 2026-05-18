"use client";
// src/components/home/CategoriesSection.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Category } from "@/types";
import { getSafeImageUrl } from "@/lib/utils/helpers";

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <section className="container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Find exactly what you are looking for
          </p>
        </div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          All categories
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {categories.slice(0, 5).map((category) => {
          const imageUrl = getSafeImageUrl([category.image]);

          return (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="group flex flex-col items-center gap-3 rounded-lg border bg-background p-6 text-center transition-all hover:border-primary/30 hover:bg-accent hover:shadow-sm"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-full bg-muted ring-2 ring-background group-hover:ring-primary/20 transition-all">
                <Image
                  src={imageUrl}
                  alt={category.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/56x56/f1f5f9/64748b?text=" + category.name[0];
                  }}
                />
              </div>
              <span className="text-sm font-medium capitalize leading-tight group-hover:text-primary transition-colors">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}