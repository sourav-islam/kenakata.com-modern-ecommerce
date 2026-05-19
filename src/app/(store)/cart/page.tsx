// src/app/(store)/cart/page.tsx
import type { Metadata } from "next";
import { CartPageClient } from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
  title:       "Your Cart",
  description: "Review your cart and proceed to checkout",
};

export default function CartPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">
        Shopping Cart
      </h1>
      <CartPageClient />
    </div>
  );
}