// src/components/home/HeroSection.tsx
import Link from "next/link";
import { ArrowRight, ShoppingBag, Star, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-background to-primary/10 border px-6 py-16 sm:px-12 sm:py-24">

        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/5" />

        <div className="relative flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-3.5 w-3.5" />
            New arrivals every week
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Elevate Your Style with{" "}
            <span className="text-primary">KenaKata</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Discover the latest trends in fashion and accessories.
            High-quality products at your fingertips.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-8 text-sm">
            {[
              { value: "10K+", label: "Products" },
              { value: "50K+", label: "Customers" },
              { value: "4.8", label: "Rating", icon: Star },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="flex items-center justify-center gap-1">
                  {stat.icon && (
                    <stat.icon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  )}
                  <span className="text-xl font-bold">{stat.value}</span>
                </div>
                <span className="text-muted-foreground text-xs">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Shop Now
            </Link>
            <Link
              href="/categories"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Browse Categories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}