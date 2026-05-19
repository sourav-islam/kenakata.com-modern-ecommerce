// src/components/cart/CartPageClient.tsx
"use client";

import Link   from "next/link";
import Image  from "next/image";
import { ShoppingBag, ArrowRight, Trash2, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart }         from "@/lib/store/CartContext";
import { Button }          from "@/components/ui/button";
import { formatPrice, getSafeImageUrl } from "@/lib/utils/helpers";
import { cn }              from "@/lib/utils";

export function CartPageClient() {
  const { cart, items, removeItem, updateQty, clearCart } = useCart();
  const { total, itemCount } = cart;

  // Empty state
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Your cart is empty</h2>
          <p className="text-sm text-muted-foreground max-w-sm">
            Looks like you have not added anything to your cart yet.
            Start shopping to fill it up!
          </p>
        </div>
        <Button asChild size="lg">
          <Link href="/products">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Start Shopping
          </Link>
        </Button>
      </div>
    );
  }

  const shipping    = total >= 50 ? 0 : 9.99;
  const tax         = total * 0.08;
  const orderTotal  = total + shipping + tax;
  const freeShippingLeft = Math.max(0, 50 - total);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      {/* ── Cart Items ──────────────────────── */}
      <div className="lg:col-span-2 space-y-4">

        {/* Free shipping banner */}
        {freeShippingLeft > 0 ? (
          <div className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 px-4 py-3">
            <p className="text-sm text-amber-800 dark:text-amber-400">
              Add{" "}
              <span className="font-semibold">
                {formatPrice(freeShippingLeft)}
              </span>{" "}
              more to get{" "}
              <span className="font-semibold">free shipping!</span>
            </p>
            {/* Progress bar */}
            <div className="mt-2 h-1.5 w-full rounded-full bg-amber-200 dark:bg-amber-800">
              <div
                className="h-full rounded-full bg-amber-500 transition-all"
                style={{ width: `${Math.min((total / 50) * 100, 100)}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800 px-4 py-3">
            <p className="text-sm text-green-800 dark:text-green-400 font-medium">
              🎉 You have free shipping!
            </p>
          </div>
        )}

        {/* Items header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
          <button
            onClick={clearCart}
            className="text-xs text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Clear cart
          </button>
        </div>

        {/* Cart item list */}
        <div className="space-y-3">
          {items.map((item) => {
            const imageUrl = getSafeImageUrl(item.product.images);

            return (
              <div
                key={item.product.id}
                className="flex gap-4 rounded-xl border bg-background p-4 transition-all hover:shadow-sm"
              >
                {/* Product image */}
                <Link
                  href={`/products/${item.product.id}`}
                  className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={imageUrl}
                    alt={item.product.title}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                    onError={(e) => {
                      const t  = e.target as HTMLImageElement;
                      t.src = "https://placehold.co/96x96/f1f5f9/64748b?text=?";
                    }}
                  />
                </Link>

                {/* Product info */}
                <div className="flex flex-1 flex-col gap-2 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors leading-snug"
                    >
                      {item.product.title}
                    </Link>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground capitalize">
                    {item.product.category.name}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    {/* Quantity control */}
                    <div className="flex items-center rounded-lg border">
                      <button
                        onClick={() =>
                          updateQty(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="flex h-8 w-8 items-center justify-center rounded-l-lg transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="flex h-8 w-10 items-center justify-center border-x text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQty(item.product.id, item.quantity + 1)
                        }
                        disabled={item.quantity >= 99}
                        className="flex h-8 w-8 items-center justify-center rounded-r-lg transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Item total */}
                    <div className="text-right">
                      <p className="text-sm font-bold">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted-foreground">
                          {formatPrice(item.product.price)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue shopping */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline underline-offset-4 mt-2"
        >
          ← Continue shopping
        </Link>
      </div>

      {/* ── Order Summary ───────────────────── */}
      <div className="lg:col-span-1">
        <div className="sticky top-20 rounded-xl border bg-background p-6 space-y-4">
          <h2 className="font-semibold text-lg">Order Summary</h2>

          {/* Price breakdown */}
          <div className="space-y-2.5 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Subtotal ({itemCount} items)
              </span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className={cn(shipping === 0 && "text-green-600 font-medium")}>
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax (8%)</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="border-t pt-2.5 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>{formatPrice(orderTotal)}</span>
            </div>
          </div>

          {/* Checkout button */}
          <Button asChild size="lg" className="w-full">
            <Link href="/checkout">
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          {/* Security note */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Secure checkout — SSL encrypted
          </div>

          {/* Accepted payments */}
          <div className="border-t pt-4">
            <p className="text-xs text-muted-foreground text-center mb-2">
              We accept
            </p>
            <div className="flex justify-center gap-2">
              {["VISA", "MC", "AMEX", "PayPal"].map((method) => (
                <span
                  key={method}
                  className="rounded border bg-muted px-2 py-1 text-[10px] font-medium"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}