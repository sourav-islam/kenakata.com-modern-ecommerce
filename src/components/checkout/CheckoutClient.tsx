// src/components/checkout/CheckoutClient.tsx

"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

export function CheckoutClient() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof typeof initialState) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">
      <div className="rounded-3xl border bg-background p-8 shadow-sm">
        <div className="mb-6 space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Checkout
          </p>
          <h1 className="text-3xl font-semibold">Billing details</h1>
          <p className="text-sm text-muted-foreground">
            Enter your shipping and contact information to complete your order.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm">
              First name
              <Input
                value={form.firstName}
                onChange={handleChange("firstName")}
                placeholder="John"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              Last name
              <Input
                value={form.lastName}
                onChange={handleChange("lastName")}
                placeholder="Doe"
                required
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm">
            Email address
            <Input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="john@example.com"
              required
            />
          </label>

          <label className="grid gap-2 text-sm">
            Street address
            <Input
              value={form.address}
              onChange={handleChange("address")}
              placeholder="123 Main St"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="grid gap-2 text-sm">
              City
              <Input
                value={form.city}
                onChange={handleChange("city")}
                placeholder="Dhaka"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              Postal code
              <Input
                value={form.postalCode}
                onChange={handleChange("postalCode")}
                placeholder="1207"
                required
              />
            </label>
            <label className="grid gap-2 text-sm">
              Country
              <Input
                value={form.country}
                onChange={handleChange("country")}
                placeholder="Bangladesh"
                required
              />
            </label>
          </div>

          <Button type="submit" className="w-full">
            Place order
          </Button>
        </form>

        {submitted && (
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
            Thank you! Your checkout details are ready for processing.
          </div>
        )}
      </div>

      <aside className="rounded-3xl border bg-background p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Order summary
            </p>
            <h2 className="text-xl font-semibold">Secure checkout</h2>
          </div>
          <div className="rounded-2xl bg-muted p-4">
            <p className="text-sm text-muted-foreground">Billing address</p>
            <p className={cn("mt-2 text-base font-medium", !form.address && "text-muted-foreground")}>
              {form.address || "Enter your address"}
            </p>
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between rounded-2xl border bg-background p-4">
              <span className="text-sm text-muted-foreground">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border bg-background p-4">
              <span className="text-sm text-muted-foreground">Tax</span>
              <span className="font-medium">Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl border bg-background p-4">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="font-semibold">$99.99</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
