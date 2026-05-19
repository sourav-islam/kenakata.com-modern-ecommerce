// src/app/orders/page.tsx

import type { Metadata } from "next";
import { OrdersClient } from "@/components/orders/OrdersClient";

export const metadata: Metadata = {
  title: "My Orders | KenaKata.com",
  description: "Review your recent orders and tracking status.",
};

export default function OrdersPage() {
  return (
    <div className="container py-8">
      <OrdersClient />
    </div>
  );
}
