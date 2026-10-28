export type EcosystemMode = "public" | "member" | "admin";
interface Props {
  currentMode: EcosystemMode;
}
export function EcosystemBar({ currentMode }: Props) {
  if (currentMode !== "public") return null;
  return (
    <div className="utility-bar">
      <div className="public-container">
        <span className="utility-motto">
          <i /> WARISAN BERKANUN NEGERI PERAK DARUL RIDZUAN
        </span>
        <small>PPM-010-04-09042013-000034</small>
      </div>
    </div>
  );
}
