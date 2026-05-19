// src/components/product/ProductInfo.tsx
"use client";

import { useState } from "react";
import {
  ShoppingCart, Star, Shield, Truck,
  RotateCcw, Share2, Heart, Check, Minus, Plus,
} from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice, generateRating } from "@/lib/utils/helpers";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/store/AuthContext";
import { useCart } from "@/lib/store/CartContext"; // CartContext ইমপোর্ট করা হলো
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity,    setQuantity]    = useState(1);
  const [added,       setAdded]       = useState(false);
  const [wishlisted,  setWishlisted]  = useState(false);
  
  const { isLoggedIn } = useAuth();
  const { addItem, isInCart } = useCart(); // CartContext থেকে মেথড নেওয়া হলো
  const router = useRouter();

  const alreadyInCart = isInCart(product.id); // প্রোডাক্টটি অলরেডি কার্টে আছে কি না চেক
  const rating    = generateRating(product.id);
  const reviewCount = (product.id * 7) % 200 + 15; // deterministic fake count

  // Quantity handlers
  const decrease = () => setQuantity((q) => Math.max(1, q - 1));
  const increase = () => setQuantity((q) => Math.min(99, q + 1));

  // Add to cart handler updated
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${window.location.pathname}`);
      return;
    }
    addItem(product, quantity); // কার্টে প্রোডাক্ট ও কোয়ান্টিটি যোগ করা হলো
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Buy Now handler added
  const handleBuyNow = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=${window.location.pathname}`);
      return;
    }
    addItem(product, quantity); // কার্টে প্রোডাক্ট যোগ করে সরাসরি কার্ট পেজে নিয়ে যাবে
    router.push("/cart");
  };

  // Share handler
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="flex flex-col gap-5">

      {/* ── Category + Share + Wishlist ────────── */}
      <div className="flex items-start justify-between gap-4">
        <Badge variant="secondary" className="capitalize text-xs">
          {product.category.name}
        </Badge>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (!isLoggedIn) {
                router.push(`/login?redirect=${window.location.pathname}`);
                return;
              }
              setWishlisted((w) => !w);
            }}
            className={cn(
              "rounded-full p-2 transition-colors hover:bg-muted",
              wishlisted && "text-red-500"
            )}
            aria-label="Add to wishlist"
          >
            <Heart
              className="h-5 w-5"
              fill={wishlisted ? "currentColor" : "none"}
            />
          </button>
          <button
            onClick={handleShare}
            className="rounded-full p-2 transition-colors hover:bg-muted"
            aria-label="Share product"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── Title ──────────────────────────────── */}
      <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
        {product.title}
      </h1>

      {/* ── Rating ─────────────────────────────── */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < Math.floor(rating)
                  ? "fill-amber-400 text-amber-400"
                  : i < rating
                  ? "fill-amber-400/50 text-amber-400"
                  : "fill-muted text-muted-foreground"
              )}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{rating}</span>
        <span className="text-sm text-muted-foreground">
          ({reviewCount} reviews)
        </span>
      </div>

      {/* ── Price ──────────────────────────────── */}
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-bold">
          {formatPrice(product.price)}
        </span>
        {/* Fake original price for visual */}
        <span className="text-base text-muted-foreground line-through">
          {formatPrice(product.price * 1.2)}
        </span>
        <Badge variant="destructive" className="text-xs">
          -17%
        </Badge>
      </div>

      {/* ── Description ────────────────────────── */}
      <div className="border-t pt-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
      </div>

      {/* ── Quantity Selector ──────────────────── */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Quantity</span>
        <div className="flex items-center rounded-lg border">
          <button
            onClick={decrease}
            disabled={quantity <= 1}
            className="flex h-9 w-9 items-center justify-center rounded-l-lg transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Decrease quantity"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="flex h-9 w-12 items-center justify-center border-x text-sm font-medium">
            {quantity}
          </span>
          <button
            onClick={increase}
            disabled={quantity >= 99}
            className="flex h-9 w-9 items-center justify-center rounded-r-lg transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Increase quantity"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          In stock
        </span>
      </div>

      {/* ── Add to Cart & Buy Now Buttons (Updated) ── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          size="lg"
          className="flex-1"
          onClick={handleAddToCart}
        >
          {added ? (
            <>
              <Check className="mr-2 h-5 w-5" />
              Added to Cart!
            </>
          ) : alreadyInCart ? (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add More
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
        
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          onClick={handleBuyNow}
        >
          Buy Now
        </Button>
      </div>

      {/* ── Trust Badges ───────────────────────── */}
      <div className="grid grid-cols-3 gap-3 rounded-xl border bg-muted/40 p-4">
        {[
          { icon: Truck,      label: "Free Shipping",   sub: "Orders over $50" },
          { icon: RotateCcw,  label: "Easy Returns",    sub: "30-day policy"   },
          { icon: Shield,     label: "Secure Payment",  sub: "SSL encrypted"   },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium leading-tight">
                {item.label}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {item.sub}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Product Meta ───────────────────────── */}
      <div className="space-y-1.5 border-t pt-4 text-xs text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">SKU: </span>
          KK-{String(product.id).padStart(5, "0")}
        </p>
        <p>
          <span className="font-medium text-foreground">Category: </span>
          <span className="capitalize">{product.category.name}</span>
        </p>
      </div>
    </div>
  );
}