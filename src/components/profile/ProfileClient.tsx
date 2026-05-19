// src/components/profile/ProfileClient.tsx

"use client";

import Link from "next/link";
import { useAuth } from "@/lib/store/AuthContext";
import { Button } from "@/components/ui/button";

export function ProfileClient() {
  const { user, isLoading, isLoggedIn, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="space-y-4 rounded-2xl border bg-background p-8 shadow-sm">
        <div className="h-8 w-1/3 animate-pulse rounded bg-muted" />
        <div className="space-y-2">
          <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
          <div className="h-5 w-full max-w-sm animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !user) {
    return (
      <div className="rounded-2xl border bg-background p-8 text-center shadow-sm">
        <p className="text-lg font-semibold">You are not signed in yet.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to access your profile and order history.
        </p>
        <div className="mt-6 flex justify-center">
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-background p-8 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
              My Profile
            </p>
            <h1 className="mt-2 text-3xl font-semibold">{user.name}</h1>
            <p className="mt-2 text-sm text-muted-foreground">Manage your account details and preferences.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={logout} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Sign out
            </Button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-muted/50 p-6">
            <p className="text-sm font-medium text-muted-foreground">Email</p>
            <p className="mt-2 break-words text-base font-medium">{user.email}</p>
          </div>
          <div className="rounded-2xl border bg-muted/50 p-6">
            <p className="text-sm font-medium text-muted-foreground">Role</p>
            <p className="mt-2 text-base font-medium capitalize">{user.role}</p>
          </div>
          <div className="rounded-2xl border bg-muted/50 p-6">
            <p className="text-sm font-medium text-muted-foreground">Member since</p>
            <p className="mt-2 text-base font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}</p>
          </div>
          <div className="rounded-2xl border bg-muted/50 p-6">
            <p className="text-sm font-medium text-muted-foreground">Username</p>
            <p className="mt-2 text-base font-medium">{user.name.split(" ")[0]}</p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-background p-8 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Account actions</h2>
            <p className="text-sm text-muted-foreground mt-1">Jump straight to your recent orders or update your information.</p>
          </div>
          <Button asChild>
            <Link href="/orders">View orders</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
