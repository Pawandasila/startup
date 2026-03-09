"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import { Suspense } from "react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: async () => {
      if (!token) throw new Error("No verification token found.");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/auth/verify-email?token=${encodeURIComponent(token)}`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Verification failed.");
      }
      return data;
    },
    enabled: !!token,
    retry: false,
  });

  return (
    <div className="w-full max-w-md text-center">
      {/* Loading */}
      {isLoading && !!token && (
        <div className="space-y-4">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-border-color border-t-brand-primary" />
          <p className="font-serif text-lg text-text-muted">
            Verifying your email...
          </p>
        </div>
      )}

      {/* No Token */}
      {!token && (
        <div className="space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <svg
              className="h-8 w-8 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-text-main">
            Missing Token
          </h1>
          <p className="text-text-muted">
            No verification token found in the URL.
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg border border-border-color px-8 py-3 text-sm font-semibold text-text-main transition-colors hover:bg-surface"
          >
            Go to Home
          </Link>
        </div>
      )}

      {/* Success */}
      {data && (
        <div className="space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <svg
              className="h-8 w-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-text-main">
            Email Verified
          </h1>
          <p className="text-text-muted">
            {data.message || "Your email has been verified successfully!"}
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-foreground px-8 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Continue to Home
          </Link>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
            <svg
              className="h-8 w-8 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="font-serif text-3xl font-semibold text-text-main">
            Verification Failed
          </h1>
          <p className="text-text-muted">
            {error instanceof Error
              ? error.message
              : "Verification failed. The link may have expired."}
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg border border-border-color px-8 py-3 text-sm font-semibold text-text-main transition-colors hover:bg-surface"
          >
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4 py-20">
      <Suspense
        fallback={
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-border-color border-t-brand-primary" />
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </main>
  );
}
