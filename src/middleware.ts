// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Public routes — login chadao access ache
const publicRoutes = [
  "/",
  "/login",
  "/register",
];

// Auth routes — logged in thakle access nai
const authOnlyRoutes = [
  "/login",
  "/register",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // ── Public route check ──────────────────
  // Check if current path is exactly "/" or starts with other public routes
  const isPublic = publicRoutes.some((route) =>
    route === "/" ? pathname === "/" : pathname.startsWith(route)
  );

  // Unauthenticated user trying to access non-public route
  if (!isPublic && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Auth route check ───────────────────────
  // Already logged in thakle login/register e gele home e pathao
  const isAuthRoute = authOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ── Security headers add ───────────────────
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options",           "DENY");
  response.headers.set("X-Content-Type-Options",    "nosniff");
  response.headers.set("Referrer-Policy",           "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};