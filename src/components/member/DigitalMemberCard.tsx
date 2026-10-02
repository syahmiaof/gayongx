import { downloadMemberCard } from "./downloadMemberCard";
import { useState } from "react";
import { Download, QrCode } from "lucide-react";
import { SYNTHETIC_PRIMARY_MEMBER as member } from "../../data/seedData";
import { Logo } from "../common/Logo";
import { DemoDialog, Panel } from "../ui/DemoUI";
export function DemoQR() {
  return (
    <svg
      viewBox="0 0 29 29"
      className="demo-qr"
      aria-label="QR placeholder demo, bukan kod pengesahan"
    >
      <rect width="29" height="29" fill="white" />
      {[2, 20].flatMap((x, i) =>
        (i === 0 ? [2, 20] : [2]).map((y) => (
          <g key={x + "-" + y}>
            <rect x={x} y={y} width="7" height="7" fill="black" />
            <rect x={x + 1} y={y + 1} width="5" height="5" fill="white" />
            <rect x={x + 2} y={y + 2} width="3" height="3" fill="black" />
          </g>
        )),
      )}
      {Array.from({ length: 100 }, (_, i) => {
        const x = 10 + (i % 9),
          y = 2 + Math.floor(i / 9) * 2;
        return (i * 7 + (i % 3)) % 5 < 3 ? (
          <rect key={i} x={x} y={y} width="1" height="1" fill="black" />
        ) : null;
      })}
      <text x="15" y="28" fontSize="3" textAnchor="middle">
        DEMO
      </text>
    </svg>
  );
}
export function DigitalMemberCard() {
  const [qr, setQr] = useState(false),
    [downloading, setDownloading] = useState(false),
    [downloadError, setDownloadError] = useState("");
  const handleDownload = async () => {
    setDownloading(true);
    setDownloadError("");
    try {
      await downloadMemberCard();
    } catch (error) {
      setDownloadError(
        error instanceof Error ? error.message : "Muat turun gagal. Cuba lagi.",
      );
    } finally {
      setDownloading(false);
    }
  };
  return (
    <Panel title="Kad Ahli Digital" className="digital-card-panel">
      <div className="physical-card">
        <div className="card-brand">
          <Logo size="sm" />
          <span>AKTIF</span>
        </div>
        <div className="card-details">
          <div>
            <h3>{member.fullName}</h3>
            <b>{member.membershipNumber}</b>
            <strong>Ahli Biasa</strong>
            <p>
              Cawangan Daerah Batang Padang
              <br />
              {member.gelanggangName}
              <br />
              Sah sehingga: 31 Dis 2026
            </p>
            <small>DEMO_SYNTHETIC</small>
          </div>
          <div>
            <img
              className="card-photo"
              src="/images/reference/member-portrait-demo.png"
              alt="Potret ahli sintetik"
            />
            <DemoQR />
          </div>
        </div>
      </div>
      <div className="card-buttons">
        <button
          className="button outline small"
          disabled={downloading}
          onClick={handleDownload}
        >
          <Download />
          {downloading ? "Menjana…" : "Muat Turun"}
        </button>
        <button className="button outline small" onClick={() => setQr(true)}>
          <QrCode />
          Paparkan QR
        </button>
      </div>
      {downloadError && (
        <p role="alert" className="download-error">
          {downloadError}
        </p>
      )}
      {qr && (
        <DemoDialog title="QR Kad Ahli — Demo" onClose={() => setQr(false)}>
          <DemoQR />
          <p>{member.membershipNumber}</p>
          <p>
            QR placeholder untuk persembahan visual sahaja. Bukan pengesahan
            keahlian sebenar.
          </p>
        </DemoDialog>
      )}
    </Panel>
  );
}
