// src/components/orders/OrdersClient.tsx

"use client";

import Link from "next/link";
import { useAuth } from "@/lib/store/AuthContext";
import { Button } from "@/components/ui/button";

export function OrdersClient() {
  const { user, isLoading, isLoggedIn } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-4 rounded-2xl border bg-background p-8 shadow-sm">
        <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full max-w-sm animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="rounded-2xl border bg-background p-8 text-center shadow-sm">
        <p className="text-lg font-semibold">Sign in to view your orders.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          You must be logged in to see your order history.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-background p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">My Orders</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Review your recent purchase history and delivery status.
        </p>
      </div>

      <div className="rounded-2xl border bg-muted/50 p-8 text-center shadow-sm">
        <p className="text-lg font-semibold">No orders yet</p>
        <p className="mt-2 text-sm text-muted-foreground">
          You haven't placed any orders yet. Start shopping and your orders will show up here.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
