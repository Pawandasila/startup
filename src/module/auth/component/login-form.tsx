"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLogin } from "../hooks/use-login";
import { VerificationDialog } from "./verification-dialog";
import { AxiosError } from "axios";
import { ApiError } from "../types";

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    login(values, {
      onError: (error: AxiosError<ApiError>) => {
        if (
          error.response?.data?.data?.errorCode === "AUTH_EMAIL_NOT_VERIFIED"
        ) {
          setShowVerifyDialog(true);
        }
      },
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@example.com"
                    className="rounded-none border-t-0 border-x-0 border-b border-slate-300 dark:border-slate-700 focus-visible:ring-0 focus-visible:border-primary bg-transparent px-0 py-6 text-base transition-colors"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex justify-between items-center">
                  <FormLabel className="text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Password
                  </FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-[10px] font-bold uppercase tracking-widest text-primary hover:opacity-80 transition-opacity"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="rounded-none border-t-0 border-x-0 border-b border-slate-300 dark:border-slate-700 focus-visible:ring-0 focus-visible:border-primary bg-transparent px-0 py-6 text-base transition-colors"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-slate-950 dark:bg-slate-100 text-white dark:text-slate-950 h-14 rounded-none font-bold text-sm tracking-[0.2em] uppercase hover:bg-white hover:text-slate-950 dark:hover:bg-slate-950 dark:hover:text-slate-100 transition-all duration-300 shadow-none border border-transparent hover:border-slate-950 dark:hover:border-slate-100"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="flex items-center gap-4 py-2">
            <div className="h-px grow bg-slate-200 dark:bg-slate-800"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Or
            </span>
            <div className="h-px grow bg-slate-200 dark:bg-slate-800"></div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-14 rounded-none border-slate-300 dark:border-slate-700 flex items-center justify-center gap-3 text-sm font-bold tracking-widest uppercase hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
            disabled={isPending}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              ></path>
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              ></path>
            </svg>
            Google
          </Button>
        </form>
      </Form>

      <VerificationDialog
        open={showVerifyDialog}
        onOpenChange={setShowVerifyDialog}
        email={form.getValues("email")}
      />
    </>
  );
};
