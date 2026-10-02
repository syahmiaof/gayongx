import { ShieldCheck, UserRound } from "lucide-react";
export type EcosystemMode = "public" | "member" | "admin";
interface Props {
  currentMode: EcosystemMode;
  onSelectMode: (mode: EcosystemMode) => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}
export function EcosystemBar({ currentMode, onNavigate }: Props) {
  if (currentMode !== "public") return null;
  return (
    <div className="utility-bar">
      <div className="public-container">
        <span className="utility-motto">
          <i /> WARISAN BERKANUN NEGERI PERAK DARUL RIDZUAN
        </span>
        <div>
          <small>PPM-010-04-09042013-000034</small>
          <button onClick={() => onNavigate("/portal")}>
            <UserRound />
            Portal Ahli
          </button>
          <button onClick={() => onNavigate("/admin")}>
            <ShieldCheck />
            CMS Pentadbiran
          </button>
          <button onClick={() => onNavigate("/admin")}>
            <ShieldCheck />
            Command Centre
          </button>
        </div>
      </div>
    </div>
  );
}
