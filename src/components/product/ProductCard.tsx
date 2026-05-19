// src/components/product/ProductCard.tsx
// "use client" add koro top e, cart connect koro

"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star, Check } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { formatPrice, getSafeImageUrl, generateRating } from "@/lib/utils/helpers";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/lib/store/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product:   Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const imageUrl         = getSafeImageUrl(product.images);
  const rating           = generateRating(product.id);
  const { addItem, isInCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const inCart = isInCart(product.id);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border bg-background p-2",
        "transition-all duration-200 hover:shadow-md hover:border-primary/20",
        className
      )}
    >
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-md bg-muted">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://placehold.co/400x400/f1f5f9/64748b?text=No+Image";
            }}
          />
          {/* Category badge */}
          <div className="absolute left-2 top-2">
            <Badge variant="secondary" className="text-[10px] capitalize">
              {product.category.name}
            </Badge>
          </div>
          {/* Already in cart indicator */}
          {inCart && !added && (
            <div className="absolute right-2 top-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                <Check className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-3 space-y-2">
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="text-xs text-muted-foreground">{rating}</span>
        </div>

        {/* Title */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-sm font-medium leading-snug line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Price + Cart Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-base font-bold">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAddToCart}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5",
              "text-xs font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              added
                ? "bg-green-600 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            aria-label={`Add ${product.title} to cart`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}