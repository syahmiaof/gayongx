import { useState } from "react";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { Logo } from "../common/Logo";
import { SiteSearch } from "../ui/DemoUI";
const links = [
  ["Utama", "/"],
  ["Sejarah & Air Kuning", "/sejarah"],
  ["Organisasi", "/organisasi"],
  ["Cawangan", "/cawangan"],
  ["Cari Gelanggang", "/gelanggang"],
  ["Bengkong", "/bengkong"],
  ["Program", "/program"],
  ["Warta", "/berita"],
];
export function PublicNavbar({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate: (path: string) => void;
}) {
  const [open, setOpen] = useState(false),
    [search, setSearch] = useState(false);
  return (
    <header className="public-nav">
      <div className="public-container">
        <button
          aria-label="PSSGM — Utama"
          className="brand-link"
          onClick={() => onNavigate("/")}
        >
          <Logo size="lg" />
        </button>
        <nav aria-label="Navigasi utama" className={open ? "is-open" : ""}>
          {links.map(([label, path]) => (
            <button
              key={path}
              className={currentPath === path ? "active" : ""}
              onClick={() => {
                onNavigate(path);
                setOpen(false);
              }}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          className="icon-button search-toggle"
          aria-label="Cari laman"
          onClick={() => setSearch(!search)}
        >
          <Search />
        </button>
        <button
          className="button red nav-join"
          onClick={() => onNavigate("/sertai")}
        >
          Sertai Gayong
          <ArrowRight />
        </button>
        <button
          className="icon-button mobile-menu"
          aria-label="Buka navigasi"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {search && (
        <div className="public-search">
          <SiteSearch onNavigate={onNavigate} />
        </div>
      )}
    </header>
  );
}
