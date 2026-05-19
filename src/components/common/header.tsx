// src/components/common/header.tsx
"use client";

import Link           from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, FormEvent }    from "react";
import {
  ShoppingCart, User, Search,
  LogOut, Package, ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { useAuth }     from "@/lib/store/AuthContext";
import { cn }          from "@/lib/utils";

export function Header() {
  const router   = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user, logout, isLoading } = useAuth();

  const [searchValue,  setSearchValue]  = useState("");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/products?title=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  const navLinks = [
    { href: "/products",  label: "Products"   },
    { href: "/categories", label: "Categories" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">

        {/* ── Left: Logo + Nav ──────────────── */}
        <div className="flex items-center gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="inline-block font-bold text-xl sm:text-2xl">
              KenaKata<span className="text-primary">.com</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname.startsWith(link.href)
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Right: Search + Icons ─────────── */}
        <div className="flex items-center gap-2">

          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={cn(
                "h-10 w-full rounded-md border border-input",
                "bg-background px-9 py-2 text-sm",
                "ring-offset-background placeholder:text-muted-foreground",
                "focus-visible:outline-none focus-visible:ring-2",
                "focus-visible:ring-ring focus-visible:ring-offset-2",
                "md:w-[200px] lg:w-[280px]"
              )}
            />
          </form>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Cart */}
          <Link
            href="/cart"
            className="relative rounded-md p-2 hover:bg-accent transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {/* Response 6 e dynamic count */}
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              0
            </span>
          </Link>

          {/* User Menu */}
          {isLoading ? (
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
          ) : isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent transition-colors"
                aria-label="User menu"
                aria-expanded={userMenuOpen}
              >
                {/* Avatar */}
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <span className="hidden sm:block text-sm font-medium max-w-[80px] truncate">
                  {user.name?.split(" ")[0]}
                </span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 text-muted-foreground transition-transform",
                    userMenuOpen && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown */}
              {userMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full z-20 mt-1 w-48 rounded-lg border bg-background shadow-md py-1 animate-in fade-in-0 zoom-in-95">
                    {/* User info */}
                    <div className="px-3 py-2 border-b">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>

                    {/* Menu items */}
                    <Link
                      href="/profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                    >
                      <User className="h-4 w-4" />
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                    >
                      <Package className="h-4 w-4" />
                      My Orders
                    </Link>

                    <div className="border-t mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          logout();
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent transition-colors"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:block">Sign in</span>
            </Link>
          )}

          {/* Mobile menu button */}
          <button
            className="md:hidden rounded-md p-2 hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Mobile menu"
          >
            <div className="space-y-1.5">
              <span className={cn(
                "block h-0.5 w-5 bg-current transition-transform",
                mobileMenuOpen && "translate-y-2 rotate-45"
              )} />
              <span className={cn(
                "block h-0.5 w-5 bg-current transition-opacity",
                mobileMenuOpen && "opacity-0"
              )} />
              <span className={cn(
                "block h-0.5 w-5 bg-current transition-transform",
                mobileMenuOpen && "-translate-y-2 -rotate-45"
              )} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-3 space-y-1">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="relative mb-3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </form>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith(link.href)
                    ? "bg-accent text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}