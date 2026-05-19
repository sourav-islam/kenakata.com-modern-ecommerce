// src/components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { loginSchema, LoginFormData } from "@/lib/validations/auth";
import { useAuth } from "@/lib/store/AuthContext";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";

export function LoginForm() {
  const { login }    = useAuth();
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirect     = searchParams.get("redirect") || "/";

  const [showPassword, setShowPassword] = useState(false);
  const [serverError,  setServerError]  = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await login(data);
      router.push(redirect);
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      // Platzi API specific error handle
      if (message.includes("401") || message.includes("Unauthorized")) {
        setServerError("Invalid email or password. Please try again.");
      } else if (message.includes("fetch")) {
        setServerError("Network error. Please check your connection.");
      } else {
        setServerError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>

      {/* Server error */}
      {serverError && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {serverError}
        </div>
      )}

      {/* Email */}
      <Input
        label="Email address"
        type="email"
        placeholder="you@example.com"
        autoComplete="email"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Password */}
      <div className="space-y-1.5">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword
                ? <EyeOff className="h-4 w-4" />
                : <Eye    className="h-4 w-4" />
              }
            </button>
          }
          {...register("password")}
        />
        <div className="flex justify-end">
          <button
            type="button"
            className="text-xs text-primary hover:underline underline-offset-4"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {!isSubmitting && <LogIn className="h-4 w-4" />}
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}