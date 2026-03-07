"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { useRegister } from "../hooks/use-register";
import { VerificationDialog } from "./verification-dialog";

// Matches backend registerSchema exactly: { email, password, firstName, lastName }
const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50),
  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255),
  password: z
    .string()
    .trim()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { mutate: register, isPending } = useRegister();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    register(values, {
      onSuccess: () => {
        setShowDialog(true);
      },
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Alexander"
                      className="w-full bg-transparent border-t-0 border-x-0 border-b border-slate-200 dark:border-slate-800 focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 py-3 font-sans text-sm tracking-wide placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-colors"
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
              name="lastName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="McQueen"
                      className="w-full bg-transparent border-t-0 border-x-0 border-b border-slate-200 dark:border-slate-800 focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 py-3 font-sans text-sm tracking-wide placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-colors"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-slate-200 dark:border-slate-800 focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 py-3 font-sans text-sm tracking-wide placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-colors"
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
                <FormLabel className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••••••"
                    className="w-full bg-transparent border-t-0 border-x-0 border-b border-slate-200 dark:border-slate-800 focus-visible:ring-0 focus-visible:border-primary rounded-none px-0 py-3 font-sans text-sm tracking-wide placeholder:text-slate-300 dark:placeholder:text-slate-700 transition-colors"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[10px] uppercase font-bold tracking-tight" />
              </FormItem>
            )}
          />

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full cursor-pointer bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 py-7 rounded-none font-sans font-bold text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-slate-100 transition-all duration-300 shadow-none border border-transparent hover:border-slate-900 dark:hover:border-slate-100"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <VerificationDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        email={form.getValues("email")}
      />
    </>
  );
};
