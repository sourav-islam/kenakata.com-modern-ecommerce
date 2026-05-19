// src/app/(store)/products/[id]/page.tsx

import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProductById, getProductsByCategory } from "@/lib/api/products";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

// ── Dynamic Metadata ───────────────────────────────
interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { id }  = await params;
    const product = await getProductById(Number(id));
    return {
      title:       product.title,
      description: product.description.slice(0, 160),
      openGraph: {
        title:       product.title,
        description: product.description.slice(0, 160),
        images:      [{ url: product.images[0] ?? "" }],
      },
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

// ── Related Products Async Component ──────────────
async function RelatedProductsSection({
  categoryId,
  currentProductId,
}: {
  categoryId:       number;
  currentProductId: number;
}) {
  try {
    const related = await getProductsByCategory(categoryId, 8);
    const filtered = related.filter((p) => p.id !== currentProductId);
    if (filtered.length === 0) return null;
    return <RelatedProducts products={filtered.slice(0, 4)} />;
  } catch {
    return null;
  }
}

// ── Main Page ──────────────────────────────────────
export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) notFound();

  let product;
  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  return (
    <div className="container py-8">

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Products", href: "/products"                              },
          { label: product.category.name,
            href: `/products?categoryId=${product.category.id}`               },
          { label: product.title                                              },
        ]}
      />

      {/* Main product section */}
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left — Image Gallery */}
        <ProductGallery images={product.images} title={product.title} />

        {/* Right — Product Info */}
        <ProductInfo product={product} />
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <Suspense
          fallback={
            <div className="space-y-6">
              <Skeleton className="h-7 w-48" />
              <ProductGridSkeleton count={4} />
            </div>
          }
        >
          <RelatedProductsSection
            categoryId={product.category.id}
            currentProductId={product.id}
          />
        </Suspense>
      </div>
    </div>
  );
}

// ── Breadcrumb Component ───────────────────────────
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors capitalize"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium line-clamp-1 max-w-[200px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}