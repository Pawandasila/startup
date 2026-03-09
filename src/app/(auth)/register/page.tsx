"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RegisterForm } from "@/module/auth/component/register-form";
import { Sparkles, Circle } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";

export default function Signup() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) return null;
  if (user) return null;

  return (
    <div className="flex h-screen w-full font-serif text-slate-900 dark:text-slate-100 antialiased overflow-hidden bg-background-light dark:bg-background-dark">
      <div className="flex h-full w-full">
        <div className="w-full lg:w-1/2 flex flex-col h-full bg-background-light dark:bg-background-dark overflow-y-auto lg:overflow-hidden">
          <header className="flex items-center justify-between px-8 py-8 md:px-12 lg:px-20 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-900 dark:text-slate-100"
            >
              <Sparkles className="h-6 w-6 text-primary scale-125" />
              <h2 className="text-xl font-bold leading-tight tracking-tight uppercase">
                Luxe Rental
              </h2>
            </Link>
            <Link
              className="text-xs font-semibold tracking-widest uppercase border-b border-transparent hover:border-slate-900 dark:hover:border-slate-100 transition-all font-sans"
              href="/"
            >
              Explore
            </Link>
          </header>

          <main className="grow flex items-center justify-center px-8 md:px-12 lg:px-20 py-10">
            <div className="max-w-md w-full">
              <div className="mb-10">
                <h1 className="text-5xl md:text-6xl italic font-light tracking-tight mb-4">
                  Join the Archive
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-sans text-sm tracking-wide leading-relaxed">
                  Experience the curated collection of luxury garments and
                  timeless couture.
                </p>
              </div>

              <RegisterForm />

              <div className="mt-8 flex items-center justify-between font-sans text-[11px] tracking-widest uppercase">
                <span className="text-slate-400">Already have an account?</span>
                <Link
                  className="text-slate-900 dark:text-slate-100 font-bold border-b border-primary pb-0.5"
                  href="/login"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </main>

          <footer className="px-8 py-8 md:px-12 lg:px-20 shrink-0">
            <div className="flex gap-6 text-slate-400 font-sans text-[10px] tracking-widest uppercase">
              <Link className="hover:text-primary transition-colors" href="#">
                Privacy
              </Link>
              <Link className="hover:text-primary transition-colors" href="#">
                Terms
              </Link>
              <Link className="hover:text-primary transition-colors" href="#">
                Contact
              </Link>
            </div>
          </footer>
        </div>

        <div className="hidden lg:block lg:w-1/2 relative">
          <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply z-10 transition-colors group-hover:bg-slate-900/0"></div>
          <Image
            fill
            className="h-full w-full object-cover grayscale-20 brightness-90 transition-transform duration-1000 hover:scale-105"
            alt="Editorial fashion photography"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvipAZlUKRaJ5YgUzz_cTcXzWF-ICLSAAOs5ecriGoOJ59qLs0VKi_iJfFA2zBNgoSMUtqNX8Pr-lfF7o9zH_2vKX3cijRqq01-TLvoRDN6yLfbJB5ZXt4pG57LkTccxSeEzvcTk84rT_dDoUKD-WUHNshB5GCwBQq4wylOJcucTVV0VBlomnREtodrYabWxiqsdYFV-DyVDZBdVS4fMa8uufGncQdcBLiB3uzX61v7yixjwaDSGSdFqcBoCxoZOgHiuTCn1aRNguf"
          />

          <div className="absolute bottom-12 right-12 z-20 text-right animate-in fade-in slide-in-from-right duration-700">
            <div className="bg-background-light/90 dark:bg-background-dark/90 p-10 backdrop-blur-md shadow-2xl border border-white/10 dark:border-black/10">
              <p className="text-[10px] font-sans font-bold tracking-[0.4em] uppercase text-slate-500 mb-3">
                Editorial Issue
              </p>
              <p className="text-4xl italic font-light tracking-tight">
                A/W Collection 2024
              </p>
              <div className="mt-5 flex justify-end gap-3">
                <Circle className="h-2 w-2 fill-primary text-primary" />
                <Circle className="h-2 w-2 fill-slate-200 text-slate-200 dark:fill-slate-800 dark:text-slate-800" />
                <Circle className="h-2 w-2 fill-slate-200 text-slate-200 dark:fill-slate-800 dark:text-slate-800" />
              </div>
            </div>
          </div>

          <div className="absolute top-1/2 -left-6 -translate-y-1/2 rotate-90 z-20">
            <p className="text-[10px] font-sans font-bold tracking-[1em] uppercase text-slate-400/40 whitespace-nowrap">
              THE ARCHIVE COLLECTION • LUXE RENTAL
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
