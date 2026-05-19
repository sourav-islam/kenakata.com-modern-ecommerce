// src/components/cart/CartItem.tsx
// Mini cart item — header dropdown e use korbo (future)
"use client";

import Link  from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types";
import { formatPrice, getSafeImageUrl } from "@/lib/utils/helpers";
import { useCart } from "@/lib/store/CartContext";

interface CartItemProps {
  item: CartItemType;
}

export function CartItemRow({ item }: CartItemProps) {
  const { removeItem } = useCart();
  const imageUrl = getSafeImageUrl(item.product.images);

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
        <Image
          src={imageUrl}
          alt={item.product.title}
          fill
          sizes="48px"
          className="object-contain p-1"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          href={`/products/${item.product.id}`}
          className="text-xs font-medium line-clamp-1 hover:text-primary transition-colors"
        >
          {item.product.title}
        </Link>
        <p className="text-xs text-muted-foreground">
          {item.quantity} × {formatPrice(item.product.price)}
        </p>
      </div>
      <button
        onClick={() => removeItem(item.product.id)}
        className="shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1"
        aria-label="Remove"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}