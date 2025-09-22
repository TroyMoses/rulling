"use client";

import type React from "react";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CategoriesSidebar } from "@/components/categories-sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function MainLayout({ children, showSidebar = true }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex flex-1 relative">
        {showSidebar && (
          <div className="hidden lg:block sticky top-[120px] h-[calc(100vh-120px)] z-40">
            <CategoriesSidebar />
          </div>
        )}
        <main className="flex-1 min-h-[calc(100vh-120px)]">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
