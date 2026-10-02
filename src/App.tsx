import { AdminProgrammesView } from "./views/admin/AdminProgrammesView";
import { MemberSettingsView } from "./views/member/MemberSettingsView";
import React, { useState, useEffect } from "react";
import { EcosystemBar, EcosystemMode } from "./components/layout/EcosystemBar";
import { PublicNavbar } from "./components/layout/PublicNavbar";
import { PublicFooter } from "./components/layout/PublicFooter";
import { MemberLayout } from "./components/layout/MemberLayout";
import { AdminLayout } from "./components/layout/AdminLayout";

// Public Views
import { HomeView } from "./views/public/HomeView";
import { HistoryView } from "./views/public/HistoryView";
import { OrganisationView } from "./views/public/OrganisationView";
import { CawanganView } from "./views/public/CawanganView";
import { GelanggangView } from "./views/public/GelanggangView";
import { BengkongView } from "./views/public/BengkongView";
import { ProgrammesView } from "./views/public/ProgrammesView";
import { NewsView } from "./views/public/NewsView";
import { JoinView } from "./views/public/JoinView";
import { VerificationView } from "./views/public/VerificationView";
import { ContactView } from "./views/public/ContactView";

// Member Views
import { MemberDashboardView } from "./views/member/MemberDashboardView";
import { MemberCardView } from "./views/member/MemberCardView";
import { MembershipStatusView } from "./views/member/MembershipStatusView";
import { BengkongJourneyView } from "./views/member/BengkongJourneyView";
import { MemberProgrammesView } from "./views/member/MemberProgrammesView";
import { MemberCertificatesView } from "./views/member/MemberCertificatesView";
import { MemberDocumentsView } from "./views/member/MemberDocumentsView";
import { MemberNotificationsView } from "./views/member/MemberNotificationsView";
import { MemberProfileView } from "./views/member/MemberProfileView";

// Admin CMS Views
import { AdminDashboardView } from "./views/admin/AdminDashboardView";
import { MemberManagementView } from "./views/admin/MemberManagementView";
import { OrganisationExplorerView } from "./views/admin/OrganisationExplorerView";
import { BranchReadinessView } from "./views/admin/BranchReadinessView";
import { ApprovalCentreView } from "./views/admin/ApprovalCentreView";
import { ContentManagementView } from "./views/admin/ContentManagementView";
import { GelanggangManagementView } from "./views/admin/GelanggangManagementView";
import { TrainerManagementView } from "./views/admin/TrainerManagementView";
import { AuditTrailView } from "./views/admin/AuditTrailView";
import { FinanceView } from "./views/admin/FinanceView";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined" && window.location.pathname) {
      return window.location.pathname;
    }
    return "/";
  });

  const getEcosystemModeFromPath = (path: string): EcosystemMode => {
    if (path.startsWith("/portal")) return "member";
    if (path.startsWith("/admin")) return "admin";
    return "public";
  };

  const [ecosystemMode, setEcosystemMode] = useState<EcosystemMode>(() =>
    getEcosystemModeFromPath(currentPath),
  );

  // Sync browser url with history popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      setEcosystemMode(getEcosystemModeFromPath(path));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    const newMode = getEcosystemModeFromPath(path);
    setEcosystemMode(newMode);
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
    }
  };

  // Render Public Section
  const renderPublicContent = () => {
    switch (currentPath) {
      case "/":
        return <HomeView onNavigate={navigateTo} />;
      case "/sejarah":
        return <HistoryView />;
      case "/organisasi":
        return <OrganisationView />;
      case "/cawangan":
        return <CawanganView onNavigate={navigateTo} />;
      case "/gelanggang":
        return <GelanggangView onNavigate={navigateTo} />;
      case "/bengkong":
        return <BengkongView onNavigate={navigateTo} />;
      case "/program":
        return <ProgrammesView onNavigate={navigateTo} />;
      case "/berita":
        return <NewsView />;
      case "/sertai":
        return (
          <JoinView
            onNavigate={navigateTo}
            onApplicationSubmitted={() => {
              // Could also update pending state
            }}
          />
        );
      case "/semakan":
        return <VerificationView onNavigate={navigateTo} />;
      case "/hubungi":
        return <ContactView />;
      default:
        return <HomeView onNavigate={navigateTo} />;
    }
  };

  // Render Member Section
  const renderMemberContent = () => {
    switch (currentPath) {
      case "/portal":
        return <MemberDashboardView onNavigate={navigateTo} />;
      case "/portal/kad-ahli":
        return <MemberCardView />;
      case "/portal/keahlian":
        return <MembershipStatusView />;
      case "/portal/bengkong":
        return (
          <BengkongJourneyView
            onRequestPromotion={() => {
              // Simulates promo submission
            }}
          />
        );
      case "/portal/program":
        return <MemberProgrammesView />;
      case "/portal/sijil":
        return <MemberCertificatesView />;
      case "/portal/dokumen":
        return <MemberDocumentsView />;
      case "/portal/notifikasi":
        return <MemberNotificationsView />;
      case "/portal/gelanggang":
        return <GelanggangView onNavigate={navigateTo} />;
      case "/portal/tetapan":
        return <MemberSettingsView />;
      case "/portal/profil":
        return <MemberProfileView />;
      default:
        return <MemberDashboardView onNavigate={navigateTo} />;
    }
  };

  // Render Admin Section
  const renderAdminContent = () => {
    switch (currentPath) {
      case "/admin":
        return <AdminDashboardView onNavigate={navigateTo} />;
      case "/admin/ahli":
        return <MemberManagementView />;
      case "/admin/organisasi":
        return <OrganisationExplorerView />;
      case "/admin/cawangan":
        return <BranchReadinessView />;
      case "/admin/gelanggang":
        return <GelanggangManagementView />;
      case "/admin/gurulatih":
        return <TrainerManagementView />;
      case "/admin/kelulusan":
        return <ApprovalCentreView />;
      case "/admin/kandungan":
        return <ContentManagementView />;
      case "/admin/audit":
        return <AuditTrailView />;
      case "/admin/kewangan":
        return <FinanceView />;
      case "/admin/bengkong":
        return <BengkongView onNavigate={navigateTo} />;
      case "/admin/program":
        return <AdminProgrammesView />;
      case "/admin/kehadiran":
        return <MemberProgrammesView />;
      case "/admin/sijil":
        return <MemberCertificatesView />;
      case "/admin/laporan":
        return <AdminDashboardView onNavigate={navigateTo} />;
      case "/admin/tetapan":
        return (
          <div className="max-w-4xl mx-auto p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-4 text-left">
            <h2 className="text-xl font-bold font-serif text-white">
              Tetapan Sistem PSSGM Perak
            </h2>
            <p className="text-xs text-stone-400">
              Tetapan persembahan demo PSSGM Perak. Semua tindakan menggunakan
              state tempatan, tanpa pelayan atau pemprosesan bayaran.
            </p>
            <div className="p-4 bg-stone-900 rounded border border-stone-800 text-xs font-mono text-stone-300">
              DEMO_SYNTHETIC · Frontend sahaja · Tiada sambungan backend
            </div>
          </div>
        );
      default:
        return <AdminDashboardView onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090a0c] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#D71F26] selection:text-white">
      {/* 1. Global Unified Ecosystem Switcher */}
      <EcosystemBar
        currentMode={ecosystemMode}
        onSelectMode={(mode) => setEcosystemMode(mode)}
        currentPath={currentPath}
        onNavigate={navigateTo}
      />

      {/* 2. Primary Ecosystem Content Router */}
      {ecosystemMode === "public" && (
        <div className="flex-1 flex flex-col">
          <PublicNavbar currentPath={currentPath} onNavigate={navigateTo} />
          <main className="flex-1">
            {currentPath !== "/" && (
              <div className="demo-provenance-notice">
                DEMO_SYNTHETIC · Rekod contoh; nama, angka dan sejarah dalam
                demo belum disahkan sebagai data rasmi.
              </div>
            )}
            {renderPublicContent()}
          </main>
          <PublicFooter onNavigate={navigateTo} />
        </div>
      )}

      {ecosystemMode === "member" && (
        <MemberLayout currentPath={currentPath} onNavigate={navigateTo}>
          {renderMemberContent()}
        </MemberLayout>
      )}

      {ecosystemMode === "admin" && (
        <AdminLayout currentPath={currentPath} onNavigate={navigateTo}>
          {renderAdminContent()}
        </AdminLayout>
      )}
    </div>
  );
}
