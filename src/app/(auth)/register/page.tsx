// src/app/(auth)/register/page.tsx
import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title:       "Register",
  description: "Create your KenaKata account",
};

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Join KenaKata and start shopping today
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-xl border bg-background p-6 shadow-sm">
        <RegisterForm />
      </div>

      {/* Login link */}
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline underline-offset-4"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}