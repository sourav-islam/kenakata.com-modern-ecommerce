// src/app/checkout/page.tsx

import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | KenaKata.com",
  description: "Complete your purchase with secure checkout.",
};

export default function CheckoutPage() {
  return (
    <div className="container py-8">
      <CheckoutClient />
    </div>
  );
}
