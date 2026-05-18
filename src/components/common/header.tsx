"use client"; 
import Link from 'next/link';
import { ShoppingCart, User, Search, Sun, Moon } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
export function Header() {
  // Header function er modhye:
const router = useRouter();
const [searchValue, setSearchValue] = useState("");

const handleSearch = (e: FormEvent) => {
  e.preventDefault();
  if (searchValue.trim()) {
    router.push(`/products?title=${encodeURIComponent(searchValue.trim())}`);
  }
};

// Input form:
<form onSubmit={handleSearch} className="relative hidden sm:block">
  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
  <input
    type="search"
    placeholder="Search products..."
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    className="h-10 w-full rounded-md border border-input bg-background
      px-9 py-2 text-sm ring-offset-background
      placeholder:text-muted-foreground focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-ring
      focus-visible:ring-offset-2 md:w-[200px] lg:w-[300px]"
  />
</form>
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl sm:text-2xl">
              KenaKata<span className="text-primary">.com</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/products" className="text-sm font-medium hover:text-primary">
              Products
            </Link>
            <Link href="/categories" className="text-sm font-medium hover:text-primary">
              Categories
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              className="h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[200px] lg:w-[300px]"
            />
          </div>
          <ThemeToggle />
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </Link>
          <Link href="/login">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>

      
    </header>
  );
}
