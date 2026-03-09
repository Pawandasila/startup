"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ShieldCheck, Eye, EyeOff } from "lucide-react";
import { useChangePassword } from "../hooks/use-profile";
import { Button } from "@/components/ui/button";

const securitySchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SecurityFormValues = z.infer<typeof securitySchema>;

export const SecuritySection = () => {
  const changePassword = useChangePassword();
  const [showOld, setShowOld] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecurityFormValues>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: SecurityFormValues) => {
    changePassword.mutate(
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-10" id="security-section">
      <div className="border-b border-slate-900/10 dark:border-slate-100/10 pb-4">
        <h2 className="font-serif text-3xl font-light italic text-slate-900 dark:text-slate-100">
          Security Settings
        </h2>
      </div>

      <div className="bg-slate-900/5 dark:bg-slate-100/5 p-8 md:p-12 border border-slate-900/10 dark:border-slate-100/10 flex flex-col md:flex-row gap-12 items-start">
        <div className="w-14 h-14 bg-slate-900 dark:bg-slate-100 flex items-center justify-center shrink-0">
          <ShieldCheck className="h-6 w-6 text-white dark:text-slate-900" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 w-full"
        >
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
              Current Password
            </label>
            <div className="relative">
              <input
                {...register("oldPassword")}
                type={showOld ? "text" : "password"}
                className="w-full border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-0 top-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showOld ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.oldPassword && (
              <p className="text-red-500 text-xs">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
              New Password
            </label>
            <div className="relative">
              <input
                {...register("newPassword")}
                type={showNew ? "text" : "password"}
                className="w-full border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-0 top-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showNew ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-xs">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
              Confirm New Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex justify-end">
            <Button
              type="submit"
              disabled={changePassword.isPending}
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-10 py-6 uppercase text-xs tracking-[0.2em] font-bold border border-slate-900 dark:border-slate-100 hover:bg-transparent hover:text-slate-900 dark:hover:text-slate-100 transition-all rounded-none"
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
