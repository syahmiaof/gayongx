import { type ReactNode } from "react";
import { DashboardShell } from "./DashboardShell";
export function MemberLayout({
  currentPath = "/portal",
  onNavigate = (path: string) => {
    window.location.href = path;
  },
  children,
}: {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  children: ReactNode;
}) {
  return (
    <DashboardShell
      mode="member"
      currentPath={currentPath}
      onNavigate={onNavigate}
    >
      {children}
    </DashboardShell>
  );
}
