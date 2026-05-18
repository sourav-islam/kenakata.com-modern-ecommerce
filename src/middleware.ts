// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/checkout", "/orders", "/profile"];
const authRoutes      = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookie theke token check
  const token = request.cookies.get("access_token")?.value;

  // Protected route e token nai → login e redirect
  const isProtected = protectedRoutes.some((r) =>
    pathname.startsWith(r)
  );

  if (isProtected && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Already logged in → login/register e gele home e pathao
  const isAuthRoute = authRoutes.some((r) => pathname.startsWith(r));
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
};