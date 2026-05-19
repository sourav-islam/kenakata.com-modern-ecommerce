// src/components/auth/RegisterForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm }   from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus, Check, X } from "lucide-react";
import { registerSchema, RegisterFormData } from "@/lib/validations/auth";
import { useAuth }  from "@/lib/store/AuthContext";
import { Button }   from "@/components/ui/button";
import { Input }    from "@/components/ui/input";
import { cn }       from "@/lib/utils";

// Password strength indicator
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "At least 6 characters", valid: password.length >= 6             },
    { label: "Uppercase letter",       valid: /[A-Z]/.test(password)           },
    { label: "Lowercase letter",       valid: /[a-z]/.test(password)           },
    { label: "Number",                 valid: /\d/.test(password)              },
  ];

  const score = checks.filter((c) => c.valid).length;

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][score];
  const strengthColor = [
    "",
    "bg-destructive",
    "bg-amber-500",
    "bg-yellow-500",
    "bg-green-500",
  ][score];

  if (!password) return null;

  return (
    <div className="space-y-2 mt-2">
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-300",
              strengthColor
            )}
            style={{ width: `${(score / 4) * 100}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground min-w-[40px]">
          {strengthLabel}
        </span>
      </div>

      {/* Checklist */}
      <ul className="space-y-1">
        {checks.map((check) => (
          <li
            key={check.label}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              check.valid ? "text-green-600 dark:text-green-400" : "text-muted-foreground"
            )}
          >
            {check.valid
              ? <Check className="h-3 w-3" />
              : <X     className="h-3 w-3" />
            }
            {check.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RegisterForm() {
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const [showPassword,        setShowPassword]        = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError,         setServerError]         = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const passwordValue = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      await registerUser({
        name:     data.name,
        email:    data.email,
        password: data.password,
      });
      router.push("/");
      router.refresh();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Registration failed";
      if (message.includes("already")) {
        setServerError("This email is already registered. Try logging in.");
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

      {/* Name */}
      <Input
        label="Full name"
        type="text"
        placeholder="John Doe"
        autoComplete="name"
        error={errors.name?.message}
        {...register("name")}
      />

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
      <div>
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          autoComplete="new-password"
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
        {/* Password strength */}
        <PasswordStrength password={passwordValue} />
      </div>

      {/* Confirm Password */}
      <Input
        label="Confirm password"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="••••••••"
        autoComplete="new-password"
        error={errors.confirmPassword?.message}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword((v) => !v)}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword
              ? <EyeOff className="h-4 w-4" />
              : <Eye    className="h-4 w-4" />
            }
          </button>
        }
        {...register("confirmPassword")}
      />

      {/* Terms */}
      <p className="text-xs text-muted-foreground">
        By creating an account, you agree to our{" "}
        <a href="/terms" className="text-primary hover:underline underline-offset-4">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="/privacy" className="text-primary hover:underline underline-offset-4">
          Privacy Policy
        </a>.
      </p>

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {!isSubmitting && <UserPlus className="h-4 w-4" />}
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}