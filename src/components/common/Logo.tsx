interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  textPlacement?: "right" | "bottom";
  className?: string;
  theme?: "dark" | "light";
}
export function Logo({
  size = "md",
  showText = true,
  textPlacement = "right",
  className = "",
  theme = "dark",
}: LogoProps) {
  return (
    <div
      className={`brand brand-${size} brand-${textPlacement} brand-${theme} ${className}`}
    >
      <img src="/logo-pssgm.png" alt="Logo PSSGM yang dibekalkan" />
      {showText && (
        <div className="brand-copy">
          <strong>
            PERTUBUHAN SILAT SENI
            <br />
            GAYONG MALAYSIA
          </strong>
          <b>BAHAGIAN NEGERI PERAK</b>
          <small>PPM-010-04-09042013-000034</small>
        </div>
      )}
    </div>
  );
}
