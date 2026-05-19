// src/components/cart/PromoCode.tsx
"use client";

import { useState } from "react";
import { Button }   from "@/components/ui/button";
import { cn }       from "@/lib/utils";

export function PromoCode() {
  const [code,    setCode]    = useState("");
  const [applied, setApplied] = useState(false);
  const [error,   setError]   = useState("");

  const applyPromo = () => {
    if (code.toUpperCase() === "KENKATA10") {
      setApplied(true);
      setError("");
    } else {
      setError("Invalid promo code. Try KENKATA10");
      setApplied(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value.toUpperCase());
            setError("");
            setApplied(false);
          }}
          placeholder="Promo code"
          maxLength={20}
          className={cn(
            "flex h-9 flex-1 rounded-md border bg-background px-3 text-sm",
            "placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "transition-colors",
            error   && "border-destructive",
            applied && "border-green-500"
          )}
        />
        <Button
          size="sm"
          variant="outline"
          onClick={applyPromo}
          disabled={!code.trim() || applied}
        >
          Apply
        </Button>
      </div>
      {error   && (
        <p className="text-xs text-destructive">{error}</p>
      )}
      {applied && (
        <p className="text-xs text-green-600 dark:text-green-400">
          ✓ Promo code applied successfully!
        </p>
      )}
    </div>
  );
}