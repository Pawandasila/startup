"use client";

import React from "react";
import { ProfileSidebar } from "@/module/user/component/profile-sidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gallery  text-obsidian min-h-screen mt-24">
      <main className="flex flex-col md:flex-row max-w-[1400px] mx-auto w-full px-6 md:px-12 py-12 gap-16 relative">
        <ProfileSidebar />
        <section className="flex-1 max-w-3xl flex flex-col gap-20">
          {children}
        </section>
      </main>
    </div>
  );
};

export default ProfileLayout;
