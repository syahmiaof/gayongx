import { type ReactNode } from "react";
import { DashboardShell } from "./DashboardShell";
export function AdminLayout({
  currentPath = "/admin",
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
      mode="admin"
      currentPath={currentPath}
      onNavigate={onNavigate}
    >
      {children}
    </DashboardShell>
  );
}
