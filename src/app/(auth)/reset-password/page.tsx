"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useResetPassword } from "@/module/auth/hooks/use-reset-password";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, KeyRound, CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    mutate: resetPassword,
    isPending,
    error: apiError,
  } = useResetPassword();

  if (!token) {
    return (
      <div className="space-y-6 text-center">
        <h1 className="font-serif text-3xl font-semibold text-text-main">
          Invalid Link
        </h1>
        <p className="text-text-muted">
          No reset token found. Please request a new password reset link.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-lg px-8 py-3 text-sm font-semibold text-text-main transition-colors border border-border-color hover:bg-surface"
        >
          Return to Login
        </Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="space-y-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-4xl italic font-light tracking-tight text-slate-900 dark:text-slate-50">
            Password Reset
          </h1>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 max-w-[280px] mx-auto leading-relaxed">
            Your password has been successfully updated. You may now sign in
            using your new credentials.
          </p>
        </div>
        <Link
          href="/login"
          className="inline-flex h-14 w-full items-center justify-center bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 rounded-none font-bold text-xs tracking-widest uppercase hover:bg-primary transition-all duration-300 border border-transparent"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    resetPassword(
      { token, newPassword: password },
      {
        onSuccess: () => {
          setIsSuccess(true);
        },
        onError: (error) => {
          setError(
            (error as Error)?.message ||
              "Failed to reset password. Link may be expired.",
          );
        },
      },
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
          <KeyRound className="h-6 w-6 text-primary" />
        </div>
        <h1 className="font-serif text-3xl font-light tracking-tight text-slate-900 dark:text-slate-50 italic">
          New Password
        </h1>
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500">
          Please enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label
            htmlFor="new-password"
            className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            New Password
          </label>
          <Input
            id="new-password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-none border-t-0 border-x-0 border-b border-slate-300 dark:border-slate-700 focus-visible:ring-0 focus-visible:border-primary bg-transparent px-0 py-6 text-base transition-colors"
            required
            disabled={isPending}
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="confirm-password"
            className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400"
          >
            Confirm Password
          </label>
          <Input
            id="confirm-password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="rounded-none border-t-0 border-x-0 border-b border-slate-300 dark:border-slate-700 focus-visible:ring-0 focus-visible:border-primary bg-transparent px-0 py-6 text-base transition-colors"
            required
            disabled={isPending}
          />
        </div>

        {error && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-red-500">
            {error}
          </p>
        )}

        {apiError && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-red-500 text-center">
            {(apiError as Error)?.message ||
              "Failed to reset password. Link may be expired."}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending || !password || !confirmPassword}
          className="w-full h-14 bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 rounded-none font-bold text-xs tracking-widest uppercase hover:bg-primary transition-all duration-300 border border-transparent mt-8"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-20 bg-background-light">
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center h-40">
              <Loader2 className="h-8 w-8 animate-spin text-primary opacity-50" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
