import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { demoBelts } from "../../data/dashboardData";
import { DemoDialog, MoreLink, Panel } from "../ui/DemoUI";
export function Belt({
  color,
  striped = false,
}: {
  color: string;
  striped?: boolean;
}) {
  return (
    <svg className="belt-graphic" viewBox="0 0 110 70" aria-hidden="true">
      <path
        d="M16 23Q55 34 94 23L93 38Q55 48 17 37Z"
        fill={color}
        stroke="#ffffff40"
      />
      <path
        d="M49 35L25 60 13 49 43 30M61 35L84 61 95 48 68 30"
        fill={color}
        stroke="#ffffff30"
      />
      <path d="M43 26L63 26 66 42 45 43Z" fill={color} stroke="#ffffff55" />
      <path
        d="M18 28Q55 40 93 29M18 32Q55 44 92 33"
        stroke={striped ? "#eabd39" : "#ffffff20"}
        fill="none"
      />
      <path d="M48 29L49 40M58 28L60 40" stroke="#00000060" />
    </svg>
  );
}
export function BeltJourney({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <Panel
      title="Perjalanan Bengkong Saya"
      className="journey-panel"
      action={
        <MoreLink
          label="Lihat Butiran"
          onClick={() => onNavigate("/portal/bengkong")}
        />
      }
    >
      <p className="panel-subtitle">
        Jejak langkah, disiplin dan pencapaian dalam Silat Seni Gayong
      </p>
      <div className="belt-grid">
        {demoBelts.map((b, i) => (
          <button
            className={`belt-card ${b.status}`}
            key={b.name}
            onClick={() => setSelected(i)}
          >
            <Belt color={b.color} striped={i === 4} />
            {b.status === "locked" ? (
              <Lock className="belt-status" />
            ) : (
              <Check className="belt-status" />
            )}
            <strong>{b.name}</strong>
            <span>
              {b.status === "current"
                ? "Semasa"
                : b.status === "completed"
                  ? "Disahkan"
                  : "Belum Dibuka"}
            </span>
            <small>{b.status === "locked" ? "" : b.date}</small>
          </button>
        ))}
      </div>
      {selected !== null && (
        <DemoDialog
          title={demoBelts[selected].name}
          onClose={() => setSelected(null)}
        >
          <Belt color={demoBelts[selected].color} striped={selected === 4} />
          <p>
            {demoBelts[selected].status === "locked"
              ? "Peringkat ini belum dibuka. Lengkapkan latihan dan penilaian peringkat semasa."
              : `Rekod pencapaian demo: ${demoBelts[selected].date}.`}
          </p>
        </DemoDialog>
      )}
    </Panel>
  );
}
