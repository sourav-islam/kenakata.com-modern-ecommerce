// src/components/home/CtaBanner.tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center sm:px-12">
        {/* Decorative */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
        <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5" />

        <div className="relative">
          <h2 className="text-2xl font-bold tracking-tight text-primary-foreground sm:text-3xl">
            Ready to Start Shopping?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-primary-foreground/80">
            Join thousands of happy customers. Get the best deals delivered
            right to your door.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-foreground transition-colors hover:bg-background/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Create Account
            </Link>
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-primary-foreground/20 px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}