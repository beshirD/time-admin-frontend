import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";
import { ProtectedLayoutContent } from "@/components/layout/ProtectedLayoutContent";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <ProtectedLayoutContent>{children}</ProtectedLayoutContent>
      </SidebarProvider>
    </ThemeProvider>
  );
}
