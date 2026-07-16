"use client";

import type { ReactNode } from "react";
import { HomepageHeader } from "@/components/home/HomepageHeader";
import { VisualFooter } from "@/components/layout/VisualFooter";
import { useHeaderMode } from "@/hooks/useHeaderMode";

interface PublicPageShellProps {
  children: ReactNode;
}

export function PublicPageShell({ children }: PublicPageShellProps) {
  const headerMode = useHeaderMode();

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <HomepageHeader mode={headerMode} />
      <main>{children}</main>
      <VisualFooter />
    </div>
  );
}
