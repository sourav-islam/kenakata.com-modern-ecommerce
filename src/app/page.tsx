// src/app/page.tsx
import { Suspense } from "react";
import { getFeaturedProducts } from "@/lib/api/products";
import { getCategories } from "@/lib/api/categories";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CtaBanner } from "@/components/home/CtaBanner";
import { ProductGridSkeleton } from "@/components/ui/skeleton";

// ── Async data components ──────────────────────────

async function FeaturedProductsSection() {
  try {
    const products = await getFeaturedProducts(8);
    return <FeaturedProducts products={products} />;
  } catch {
    // Error hoile silent fail — page crash korbe na
    return null;
  }
}

async function CategoriesSectionWrapper() {
  try {
    const categories = await getCategories();
    return <CategoriesSection categories={categories} />;
  } catch {
    return null;
  }
}

// ── Page ──────────────────────────────────────────

export const metadata = {
  title: "KenaKata.com | Modern E-commerce Storefront",
  description:
    "Discover the latest trends in fashion and accessories. High-quality products at your fingertips.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 py-8">

      {/* Hero — static, no loading state needed */}
      <HeroSection />

      {/* Featured Products — server fetch with Suspense */}
      <Suspense
        fallback={
          <section className="container space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="h-7 w-48 animate-pulse rounded bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
            </div>
            <ProductGridSkeleton count={8} />
          </section>
        }
      >
        <FeaturedProductsSection />
      </Suspense>

      {/* Categories — server fetch with Suspense */}
      <Suspense
        fallback={
          <section className="container space-y-6">
            <div className="h-7 w-48 animate-pulse rounded bg-muted" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 rounded-lg border bg-background p-6"
                >
                  <div className="h-14 w-14 animate-pulse rounded-full bg-muted" />
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </section>
        }
      >
        <CategoriesSectionWrapper />
      </Suspense>

      {/* Features — static */}
      <FeaturesSection />

      {/* CTA — static */}
      <CtaBanner />

    </div>
  );
}