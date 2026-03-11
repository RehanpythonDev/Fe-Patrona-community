import type { ReactNode } from "react";

import Header from "@/components/Header";
import Sidebar from "@/components/sidebar";

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="pt-[90px] flex">
        <Sidebar />
        <main className="flex-1 px-6 pb-10">{children}</main>
      </div>
    </div>
  );
}
