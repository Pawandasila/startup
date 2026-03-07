import { Navbar } from "@/components/layout/shared/navbar";
import React from "react";
import { Footer } from "@/components/layout/shared/footer";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
