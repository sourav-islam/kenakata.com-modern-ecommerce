import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <section className="container">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Elevate Your Style with <span className="text-primary">KenaKata</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover the latest trends in fashion and accessories. High-quality products at your fingertips.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="container space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
          <Link href="/products" className="text-sm font-medium text-primary hover:underline">
            View all products
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="aspect-square overflow-hidden rounded-md bg-muted">
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  Product Image
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="h-4 w-1/2 bg-muted rounded" />
                <div className="h-4 w-1/4 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
