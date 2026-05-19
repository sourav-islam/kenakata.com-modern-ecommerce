// src/app/(auth)/login/page.tsx
import type { Metadata } from "next";
import { Suspense }      from "react";
import Link              from "next/link";
import { LoginForm }     from "@/components/auth/LoginForm";
import { Skeleton }      from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title:       "Login",
  description: "Sign in to your KenaKata account",
};

// LoginForm uses useSearchParams() internally
// Tai Suspense e wrap korte hobe
function LoginFormFallback() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-11 w-full" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        {/* ✅ Suspense wrap — useSearchParams er jonno */}
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
      </div>

      {/* Register link */}
      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary hover:underline underline-offset-4"
        >
          Create one
        </Link>
      </p>

      {/* Demo credentials */}
      <div className="rounded-lg border border-dashed bg-muted/40 p-4 text-center">
        <p className="text-xs font-medium text-muted-foreground mb-1">
          Demo credentials
        </p>
        <p className="text-xs text-muted-foreground">
          Email:{" "}
          <span className="font-mono text-foreground">john@mail.com</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Password:{" "}
          <span className="font-mono text-foreground">changeme</span>
        </p>
      </div>
    </div>
  );
}