"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Address } from "../types";
import { useAddAddress, useUpdateAddress } from "../hooks/use-addresses";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  country: z.string().min(1, "Country is required"),
  zipCode: z.string().min(1, "Zip/Postal Code is required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  address?: Address | null;
}

export const AddressModal = ({
  isOpen,
  onClose,
  address,
}: AddressModalProps) => {
  const addAddress = useAddAddress();
  const updateAddress = useUpdateAddress();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: "",
      city: "",
      state: "",
      country: "INDIA",
      zipCode: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (address) {
        reset({
          street: address.street,
          city: address.city,
          state: address.state,
          country: address.country,
          zipCode: address.zipCode,
        });
      } else {
        reset({
          street: "",
          city: "",
          state: "",
          country: "INDIA",
          zipCode: "",
        });
      }
    }
  }, [isOpen, address, reset]);

  const onSubmit = (data: AddressFormValues) => {
    if (address) {
      updateAddress.mutate(
        { id: address.id, data },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      addAddress.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isPending = addAddress.isPending || updateAddress.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] rounded-none border-slate-900/10 dark:border-slate-100/10 font-sans p-8">
        <DialogHeader>
          <DialogTitle className="font-serif text-3xl font-light italic mb-4">
            {address ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
              Street Address
            </label>
            <input
              {...register("street")}
              className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
            />
            {errors.street && (
              <p className="text-red-500 text-xs">{errors.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
                City
              </label>
              <input
                {...register("city")}
                className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
              />
              {errors.city && (
                <p className="text-red-500 text-xs">{errors.city.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
                State / Province
              </label>
              <input
                {...register("state")}
                className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
              />
              {errors.state && (
                <p className="text-red-500 text-xs">{errors.state.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
                Zip Code
              </label>
              <input
                {...register("zipCode")}
                className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
              />
              {errors.zipCode && (
                <p className="text-red-500 text-xs">{errors.zipCode.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2" aria-readonly>
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-900/40 dark:text-slate-100/40">
                Country
              </label>
              <input
                {...register("country")}
                className="border-0 border-b border-slate-900/20 dark:border-slate-100/20 bg-transparent px-0 py-2 focus:ring-0 focus:border-primary text-slate-900 dark:text-slate-100 font-medium transition-colors outline-hidden"
                readOnly
              />
              {errors.country && (
                <p className="text-red-500 text-xs">{errors.country.message}</p>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-8 py-6 uppercase text-xs tracking-[0.2em] font-bold border border-slate-900 dark:border-slate-100 hover:bg-transparent hover:text-slate-900 dark:hover:text-slate-100 transition-all rounded-none w-full"
            >
              {isPending
                ? "Saving..."
                : address
                  ? "Save Changes"
                  : "Save Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
