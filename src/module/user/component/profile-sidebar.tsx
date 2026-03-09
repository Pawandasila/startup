"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, Shield, Sparkles, Bell, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth.context";
import { useRouter } from "next/navigation";

export const ProfileSidebar = () => {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await logout();
    router.push("/login");
  };

  const navItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Addresses", href: "/profile/addresses", icon: MapPin },
    { name: "Security", href: "/profile/security", icon: Shield },
    { name: "Rentals", href: "/profile/rentals", icon: Sparkles },
    { name: "Notifications", href: "/profile/notifications", icon: Bell },
  ];

  return (
    <aside className="w-full md:w-64 flex flex-col gap-10 md:sticky md:top-32 self-start">
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-slate-900 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-[10px] text-slate-900/40 dark:text-slate-100/40 uppercase tracking-[0.2em] font-bold">
          Digital Haute Couture
        </p>
      </div>

      <nav className="flex flex-col gap-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-4 py-3.5 px-5 transition-all group ${
                isActive
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "bg-transparent text-slate-900/60 dark:text-slate-100/60 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-900/5 dark:hover:bg-slate-100/5"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${
                  isActive
                    ? "text-white dark:text-slate-900"
                    : "text-slate-900/60 dark:text-slate-100/60 group-hover:text-slate-900 dark:group-hover:text-slate-100"
                } transition-colors shrink-0`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-colors ${
                  isActive ? "text-white dark:text-slate-900" : ""
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t border-slate-900/10 dark:border-slate-100/10">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-4 px-5 text-slate-900/40 dark:text-slate-100/40 hover:text-red-600 dark:hover:text-red-400 transition-colors uppercase text-[10px] tracking-[0.2em] font-bold group"
        >
          <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};
