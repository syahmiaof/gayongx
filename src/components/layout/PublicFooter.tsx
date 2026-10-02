import { useState } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { Logo } from "../common/Logo";
import { DemoDialog } from "../ui/DemoUI";
export function PublicFooter({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const [info, setInfo] = useState("");
  return (
    <footer className="public-footer">
      <div className="public-container">
        <Logo size="sm" />
        <div className="footer-links">
          {["Dasar Privasi", "Terma Penggunaan", "Soalan Lazim"].map((x) => (
            <button key={x} onClick={() => setInfo(x)}>
              {x}
            </button>
          ))}
          <button onClick={() => onNavigate("/hubungi")}>Hubungi Kami</button>
        </div>
        <div className="social-links">
          {[Facebook, Youtube, Instagram].map((Icon, i) => (
            <button
              key={i}
              aria-label={["Facebook", "YouTube", "Instagram"][i]}
              onClick={() => setInfo("Saluran sosial")}
            >
              <Icon />
            </button>
          ))}
        </div>
        <small>
          PSSGM Perak Digital Ecosystem
          <br />© 2026 · Demo frontend
        </small>
      </div>
      {info && (
        <DemoDialog title={info} onClose={() => setInfo("")}>
          <p>
            Ini ialah demonstrasi frontend. Semua rekod ahli, tindakan dan
            statistik ialah DEMO_SYNTHETIC. Tiada data dihantar ke pelayan dan
            tiada bayaran diproses.
          </p>
          <p>
            Untuk pertanyaan, gunakan halaman Hubungi Kami. Saluran sosial rasmi
            belum disambungkan dalam demo ini.
          </p>
        </DemoDialog>
      )}
    </footer>
  );
}
