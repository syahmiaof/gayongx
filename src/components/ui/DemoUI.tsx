import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, Search, X } from "lucide-react";
export function DemoDialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => d?.close();
  }, []);
  return (
    <dialog
      ref={ref}
      className="demo-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <header>
        <h2>{title}</h2>
        <button
          autoFocus
          aria-label="Tutup dialog"
          className="icon-button"
          onClick={onClose}
        >
          <X />
        </button>
      </header>
      <div className="dialog-body">{children}</div>
      <footer>DEMO_SYNTHETIC · Simulasi tempatan sahaja</footer>
    </dialog>
  );
}
export function Panel({
  title,
  children,
  action,
  className = "",
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`panel ${className}`}>
      <header className="panel-header">
        <h2>{title}</h2>
        {action}
      </header>
      {children}
    </section>
  );
}
export function MoreLink({
  onClick,
  label = "Lihat Semua",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button className="more-link" onClick={onClick}>
      {label}
      <ArrowRight />
    </button>
  );
}
const destinations = [
  ["Laman Utama", "/"],
  ["Profil Saya", "/portal/profil"],
  ["Kad Ahli Digital", "/portal/kad-ahli"],
  ["Program & Aktiviti", "/program"],
  ["Direktori Gelanggang", "/gelanggang"],
  ["Dokumen Ahli", "/portal/dokumen"],
  ["Cawangan", "/cawangan"],
  ["Portal Anak Gayong", "/portal"],
  ["CMS Pentadbiran", "/admin"],
  ["Semak Keahlian", "/semakan"],
  ["Kelulusan", "/admin/kelulusan"],
];
export function SiteSearch({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const [query, setQuery] = useState("");
  const results = destinations.filter(([name]) =>
    name.toLocaleLowerCase("ms").includes(query.toLocaleLowerCase("ms")),
  );
  return (
    <div className="site-search">
      <Search />
      <input
        aria-label="Cari program, gelanggang, dokumen"
        placeholder="Cari program, gelanggang, dokumen..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <div className="search-results">
          {results.length ? (
            results.map(([name, path]) => (
              <button
                key={path}
                onClick={() => {
                  setQuery("");
                  onNavigate(path);
                }}
              >
                {name}
                <ArrowRight />
              </button>
            ))
          ) : (
            <p>Tiada hasil untuk “{query}”.</p>
          )}
        </div>
      )}
    </div>
  );
}
export function downloadText(
  filename: string,
  content: string,
  type = "text/plain;charset=utf-8",
) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
