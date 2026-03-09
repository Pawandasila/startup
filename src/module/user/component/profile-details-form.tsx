"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera } from "lucide-react";
import Image from "next/image";

import { useProfile, useUpdateProfile } from "../hooks/use-profile";
import { Button } from "@/components/ui/button";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const ProfileDetailsForm = () => {
  const { data: user, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
      });
    }
  }, [user, reset]);

  const onSubmit = (data: ProfileFormValues) => {
    updateProfile.mutate(data);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse h-96 bg-slate-100 dark:bg-slate-900 rounded-none w-full"></div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="border-b border-slate-900/10 dark:border-slate-100/10 pb-4">
        <h2 className="font-serif text-3xl font-light italic text-slate-900 dark:text-slate-100">
          Profile Details
        </h2>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <div className="relative">
          <div className="w-40 h-52 bg-slate-100 dark:bg-slate-900/50 border border-slate-900/10 dark:border-slate-100/10 overflow-hidden relative group">
            {user?.profileImageUrl ? (
              <Image
                src={user.profileImageUrl}
                alt="Profile photo"
                fill
                className="object-cover grayscale"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <span className="text-5xl font-serif italic text-slate-900/20 dark:text-slate-100/20">
                  {(user?.firstName?.[0] || "") + (user?.lastName?.[0] || "")}
                </span>
              </div>
            )}

            <button className="absolute bottom-0 right-0 bg-slate-900 dark:bg-slate-100 p-3.5 flex items-center justify-center shadow-lg transition-colors hover:bg-white group/cam">
              <Camera
                className="h-5 w-5 text-white dark:text-slate-900 group-hover:text-slate-900  transition-colors"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 w-full"
        >
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
              First Name
            </label>
            <input
              {...register("firstName")}
              className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
              type="text"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
              Last Name
            </label>
            <input
              {...register("lastName")}
              className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
              type="text"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
              Email Address
            </label>
            <input
              value={user?.email || ""}
              disabled
              className="border-0 border-b border-slate-900/10 dark:border-slate-100/10 bg-transparent px-0 py-2 focus:ring-0 text-slate-500 dark:text-slate-400 font-medium cursor-not-allowed outline-hidden"
              type="email"
            />
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
              type="tel"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <Button
              type="submit"
              disabled={!isDirty || updateProfile.isPending}
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-10 py-6 uppercase text-xs tracking-[0.2em] font-bold border border-slate-900 dark:border-slate-100 hover:bg-transparent hover:text-slate-900 dark:hover:text-slate-100 transition-all rounded-none"
            >
              {updateProfile.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
