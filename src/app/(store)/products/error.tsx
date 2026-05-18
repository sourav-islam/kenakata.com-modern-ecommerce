// src/app/(store)/products/error.tsx
"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Products page error:", error);
  }, [error]);

  return (
    <div className="container py-8">
      <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground max-w-md">
            We could not load the products. Please try again.
          </p>
        </div>
        <Button onClick={reset} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}