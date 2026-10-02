import { useState, type ReactNode } from "react";
import {
  Award,
  Bell,
  BookOpen,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardCheck,
  Coins,
  FileCheck,
  FileText,
  Globe,
  GraduationCap,
  House,
  IdCard,
  MapPin,
  Menu,
  Network,
  Settings,
  ShieldCheck,
  User,
  Users,
  X,
} from "lucide-react";
import { Logo } from "../common/Logo";
import { DemoDialog, SiteSearch } from "../ui/DemoUI";
const memberNav = [
  ["Dashboard", "", House],
  ["Profil Saya", "/profil", User],
  ["Kad Ahli Digital", "/kad-ahli", IdCard],
  ["Keahlian & Yuran", "/keahlian", Coins],
  ["Perjalanan Bengkong", "/bengkong", Award],
  ["Program & Aktiviti", "/program", CalendarDays],
  ["Sijil Saya", "/sijil", FileCheck],
  ["Gelanggang Saya", "/gelanggang", Building2],
  ["Notifikasi", "/notifikasi", Bell],
  ["Dokumen", "/dokumen", FileText],
  ["Tetapan", "/tetapan", Settings],
] as const;
const adminNav = [
  ["Dashboard", "", House],
  ["Ahli", "/ahli", Users],
  ["Organisasi", "/organisasi", Network],
  ["Cawangan", "/cawangan", MapPin],
  ["Gelanggang", "/gelanggang", Building2],
  ["Gurulatih", "/gurulatih", GraduationCap],
  ["Bengkong", "/bengkong", Award],
  ["Program", "/program", CalendarDays],
  ["Kehadiran", "/kehadiran", ClipboardCheck],
  ["Kewangan", "/kewangan", Coins],
  ["Sijil", "/sijil", FileCheck],
  ["Kelulusan", "/kelulusan", ClipboardCheck],
  ["Kandungan", "/kandungan", BookOpen],
  ["Laporan", "/laporan", ChartNoAxesCombined],
  ["Audit Log", "/audit", ShieldCheck],
  ["Tetapan", "/tetapan", Settings],
] as const;
export function DashboardShell({
  mode,
  currentPath,
  onNavigate,
  children,
}: {
  mode: "member" | "admin";
  currentPath: string;
  onNavigate: (path: string) => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false),
    [account, setAccount] = useState(false),
    [notice, setNotice] = useState(false);
  const admin = mode === "admin",
    base = admin ? "/admin" : "/portal",
    nav = admin ? adminNav : memberNav;
  const navigate = (path: string) => {
    setOpen(false);
    setAccount(false);
    onNavigate(path);
  };
  return (
    <div className={`dashboard-shell ${mode}-shell`}>
      {open && (
        <button
          className="sidebar-scrim"
          aria-label="Tutup menu"
          onClick={() => setOpen(false)}
        />
      )}
      <aside className={`dashboard-sidebar ${open ? "is-open" : ""}`}>
        <button
          className="brand-link"
          aria-label="Kembali ke laman utama"
          onClick={() => navigate("/")}
        >
          <Logo />
        </button>
        <button
          className="sidebar-close icon-button"
          aria-label="Tutup menu"
          onClick={() => setOpen(false)}
        >
          <X />
        </button>
        <nav aria-label={admin ? "Navigasi pentadbiran" : "Navigasi ahli"}>
          {nav.map(([label, path, Icon]) => (
            <button
              key={path}
              className={currentPath === base + path ? "active" : ""}
              aria-current={currentPath === base + path ? "page" : undefined}
              onClick={() => navigate(base + path)}
            >
              <Icon />
              <span>{label}</span>
              {label === "Kelulusan" && <b className="nav-badge">19</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-heritage">
          <span>
            {admin ? "WARISAN" : "DISIPLIN"}
            <br />
            {admin ? "ILMU, DISIPLIN" : "ILMU"}
            <br />
            {admin ? "JATI DIRI" : "AKHLAK"}
            {!admin && (
              <>
                <br />
                JATI DIRI
              </>
            )}
          </span>
        </div>
      </aside>
      <div className="dashboard-workspace">
        <header className="dashboard-topbar">
          <button
            className="icon-button sidebar-toggle"
            aria-label="Buka sidebar"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <Menu />
          </button>
          <div className="dashboard-title">
            {admin ? (
              <>
                <ShieldCheck />
                <div>
                  <h1>CMS PENTADBIRAN</h1>
                  <p>PSSGM PERAK</p>
                </div>
                <span>Command Centre</span>
              </>
            ) : (
              <div>
                <h1>Portal Anak Gayong</h1>
                <p>Warisan · Disiplin · Jati Diri · Perak Darul Ridzuan</p>
              </div>
            )}
          </div>
          <SiteSearch onNavigate={navigate} />
          <button
            className="icon-button notification-button"
            aria-label="Lihat notifikasi"
            onClick={() =>
              admin ? setNotice(true) : navigate("/portal/notifikasi")
            }
          >
            <Bell />
            <b>3</b>
          </button>
          {admin && (
            <div className="topbar-date">
              <CalendarDays />
              <span>
                Jumaat, 2 Okt 2026<strong>10:24 AM · Demo</strong>
              </span>
            </div>
          )}
          <div className="account-menu">
            <button
              aria-expanded={account}
              onClick={() => setAccount(!account)}
            >
              <img
                src="/images/reference/member-portrait-demo.png"
                alt="Potret ahli demo"
              />
              <span>
                <b>{admin ? "Admin Negeri Perak" : "Ahmad Firdaus"}</b>
                <small>{admin ? "Pentadbir Sistem" : "Ahli Biasa"}</small>
              </span>
              <ChevronDown />
            </button>
            {account && (
              <div className="account-dropdown">
                <button onClick={() => navigate("/")}>
                  <Globe />
                  Laman Rasmi
                </button>
                <button onClick={() => navigate("/portal")}>Portal Ahli</button>
                <button onClick={() => navigate("/admin")}>
                  CMS Pentadbiran
                </button>
                <button onClick={() => navigate(base + "/tetapan")}>
                  Tetapan
                </button>
              </div>
            )}
          </div>
        </header>
        <main
          className={`dashboard-main ${currentPath === base ? "" : "inner-view"}`}
        >
          {children}
        </main>
        <footer className="dashboard-footer">
          <span>
            PERTUBUHAN SILAT SENI GAYONG MALAYSIA · BAHAGIAN NEGERI PERAK
          </span>
          <span>DEMO_SYNTHETIC · Tiada sambungan backend</span>
        </footer>
      </div>
      {notice && (
        <DemoDialog
          title="Notifikasi Pentadbiran"
          onClose={() => setNotice(false)}
        >
          <p>19 permohonan demo memerlukan semakan.</p>
          <button
            className="button gold-button"
            onClick={() => {
              setNotice(false);
              navigate("/admin/kelulusan");
            }}
          >
            Buka Pusat Kelulusan
          </button>
        </DemoDialog>
      )}
    </div>
  );
}
