"use client";

import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import {
  useAddresses,
  useDeleteAddress,
  useUpdateAddress,
} from "../hooks/use-addresses";
import { AddressModal } from "./address-modal";
import { Address } from "../types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const AddressSection = () => {
  const { data: addresses, isLoading } = useAddresses();
  const deleteAddress = useDeleteAddress();
  const updateAddress = useUpdateAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const handleOpenAddModal = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleSetDefault = (id: string) => {
    updateAddress.mutate({ id, data: { isDefault: true } });
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      deleteAddress.mutate(addressToDelete, {
        onSettled: () => setAddressToDelete(null),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse h-64 bg-slate-100 dark:bg-slate-900 rounded-none w-full mt-10"></div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-baseline justify-between border-b border-slate-900/10 dark:border-slate-100/10 pb-4">
        <h2 className="font-serif text-3xl font-light italic text-slate-900 dark:text-slate-100">
          Shipping Addresses
        </h2>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 hover:text-slate-500 transition-colors group"
        >
          <Plus className="h-3 w-3 stroke-3" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
            Add New
          </span>
        </button>
      </div>

      {!addresses || addresses.length === 0 ? (
        <div className="border border-dashed border-slate-900/20 dark:border-slate-100/20 p-12 flex flex-col items-center justify-center text-center">
          <p className="text-slate-500 dark:text-slate-400 font-serif italic text-lg mb-2">
            No addresses found
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Add a shipping address to receive your luxury rentals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 relative">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-8 flex flex-col gap-6 relative transition-all min-h-[220px] ${
                address.isDefault
                  ? "border border-slate-900 dark:border-slate-100 bg-slate-900/5 dark:bg-slate-100/5"
                  : "border border-slate-900/10 dark:border-slate-100/10 hover:border-slate-900/30 dark:hover:border-slate-100/30"
              }`}
            >
              {address.isDefault && (
                <div className="absolute top-0 right-0 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-1 text-[9px] uppercase tracking-[0.2em] font-bold">
                  Default
                </div>
              )}
              <div className="flex flex-col gap-3">
                <p className="text-xs uppercase tracking-widest font-black text-slate-900 dark:text-slate-100 leading-[1.8] xl:max-w-[90%]">
                  {address.street}
                </p>
                <div className="flex flex-col gap-1 mt-1">
                  <p className="text-sm font-light text-slate-500 dark:text-slate-400">
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p className="text-sm font-light text-slate-500 dark:text-slate-400 uppercase">
                    {address.country}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-auto pt-4">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => handleOpenEditModal(address)}
                    className="text-[10px] cursor-pointer uppercase tracking-widest font-bold border-b border-slate-900/20 hover:border-slate-900 dark:border-slate-100/20 dark:hover:border-slate-100 transition-all text-slate-900 dark:text-slate-100 pb-1"
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => setAddressToDelete(address.id)}
                    disabled={
                      deleteAddress.isPending &&
                      deleteAddress.variables === address.id
                    }
                    className="flex items-center gap-2 text-[10px] cursor-pointer uppercase tracking-widest font-bold border-b border-red-600/30 hover:border-red-600 dark:border-red-400/30 dark:hover:border-red-400 transition-all text-red-600 dark:text-red-400 pb-1 disabled:opacity-50"
                  >
                    {deleteAddress.isPending &&
                      deleteAddress.variables === address.id && (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      )}
                    REMOVE
                  </button>
                </div>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    disabled={
                      updateAddress.isPending &&
                      updateAddress.variables?.id === address.id
                    }
                    className="flex items-center gap-2 text-[10px] cursor-pointer uppercase tracking-widest font-bold border-b border-slate-900/20 hover:border-slate-900 dark:border-slate-100/20 dark:hover:border-slate-100 transition-all text-slate-900 dark:text-slate-100 pb-1 disabled:opacity-50"
                  >
                    {updateAddress.isPending &&
                    updateAddress.variables?.id === address.id ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        SETTING...
                      </>
                    ) : (
                      "SET DEFAULT"
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reusable modal for Add/Edit */}
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        address={editingAddress}
      />

      <AlertDialog
        open={!!addressToDelete}
        onOpenChange={(open: boolean) => !open && setAddressToDelete(null)}
      >
        <AlertDialogContent className="rounded-none border-slate-900/10 dark:border-slate-100/10 font-sans p-8 sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-serif text-2xl font-light italic text-slate-900 dark:text-slate-100">
              Remove Address
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm font-light text-slate-500 dark:text-slate-400 mt-2">
              Are you sure you want to remove this address? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-8 flex gap-4 sm:space-x-0">
            <AlertDialogCancel
              disabled={deleteAddress.isPending}
              className="flex-1 cursor-pointer rounded-none border-slate-900/20 dark:border-slate-100/20 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors uppercase tracking-widest text-xs font-bold"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                confirmDelete();
              }}
              disabled={deleteAddress.isPending}
              className="flex-1 cursor-pointer rounded-none bg-red-600 hover:bg-red-700 text-white transition-colors uppercase tracking-widest text-xs font-bold flex gap-2 items-center justify-center"
            >
              {deleteAddress.isPending ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" />
                  REMOVING...
                </>
              ) : (
                "Remove"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
