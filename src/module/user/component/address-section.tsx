"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  useAddresses,
  useDeleteAddress,
  useUpdateAddress,
} from "../hooks/use-addresses";
import { AddressModal } from "./address-modal";
import { Address } from "../types";

export const AddressSection = () => {
  const { data: addresses, isLoading } = useAddresses();
  const deleteAddress = useDeleteAddress();
  const updateAddress = useUpdateAddress();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to remove this address?")) {
      deleteAddress.mutate(id);
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
          className="flex items-center gap-2 text-primary hover:text-slate-900 dark:hover:text-slate-100 transition-colors group"
        >
          <Plus className="h-4 w-4" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`p-8 flex flex-col gap-6 relative transition-all ${
                address.isDefault
                  ? "border border-slate-900 dark:border-slate-100 bg-slate-900/5 dark:bg-slate-100/5 shadow-inner"
                  : "border border-slate-900/10 dark:border-slate-100/10 hover:border-slate-900/30 dark:hover:border-slate-100/30"
              }`}
            >
              {address.isDefault && (
                <div className="absolute top-0 right-0 bg-primary text-slate-900 px-3 py-1 text-[8px] uppercase tracking-[0.2em] font-black">
                  Primary
                </div>
              )}
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-widest font-black text-slate-900 dark:text-slate-100">
                  {address.street}
                </p>
                <p className="text-sm font-light leading-relaxed text-slate-900/70 dark:text-slate-100/70">
                  {address.city}, {address.state} {address.zipCode}
                  <br />
                  {address.country}
                </p>
              </div>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleOpenEditModal(address)}
                  className="text-[10px] uppercase tracking-widest font-bold border-b border-slate-900/20 hover:border-slate-900 dark:border-slate-100/20 dark:hover:border-slate-100 transition-all text-slate-900 dark:text-slate-100 pb-0.5"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="text-[10px] uppercase tracking-widest font-bold border-b border-slate-900/20 hover:border-red-600 dark:border-slate-100/20 dark:hover:border-red-400 transition-all text-red-800 dark:text-red-400 pb-0.5"
                >
                  Remove
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="text-[10px] uppercase tracking-widest font-bold border-b border-slate-900/20 hover:border-slate-900 dark:border-slate-100/20 dark:hover:border-slate-100 transition-all ml-auto text-primary pb-0.5"
                  >
                    Set Default
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
    </div>
  );
};
