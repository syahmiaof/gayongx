import { ArrowLeft, ArrowRight, ShieldCheck, UserRound } from "lucide-react";
import { Logo } from "../../components/common/Logo";

export function LoginView({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const roles = [
    {
      title: "Saya Ahli",
      description:
        "Lihat profil, status keahlian, perjalanan bengkong dan program.",
      icon: UserRound,
      path: "/portal",
      action: "Masuk Portal Ahli",
    },
    {
      title: "Saya Pentadbir",
      description:
        "Terokai dashboard pengurusan dan simulasi operasi PSSGM Perak.",
      icon: ShieldCheck,
      path: "/admin",
      action: "Masuk CMS Pentadbiran",
    },
  ];

  return (
    <main className="login-page">
      <button className="login-back" onClick={() => onNavigate("/")}>
        <ArrowLeft aria-hidden="true" /> Kembali ke laman utama
      </button>

      <section className="login-panel" aria-labelledby="login-title">
        <Logo size="lg" textPlacement="bottom" />
        <p className="login-kicker">PSSGM PERAK · EKOSISTEM DIGITAL</p>
        <h1 id="login-title">Pilih akses anda</h1>
        <p className="login-intro">
          Pilih peranan untuk meneruskan ke ruang demonstrasi yang berkaitan.
        </p>

        <div className="login-roles">
          {roles.map(({ title, description, icon: Icon, path, action }) => (
            <button
              className="login-role"
              key={path}
              onClick={() => onNavigate(path)}
            >
              <span className="login-role-icon">
                <Icon aria-hidden="true" />
              </span>
              <span className="login-role-copy">
                <strong>{title}</strong>
                <small>{description}</small>
                <b>
                  {action} <ArrowRight aria-hidden="true" />
                </b>
              </span>
            </button>
          ))}
        </div>

        <p className="login-demo-note" role="note">
          Mod demo sahaja. Tiada akaun atau kata laluan diperlukan; data yang
          dipaparkan ialah data simulasi dan perubahan tidak disimpan sebagai
          rekod rasmi.
        </p>
      </section>
    </main>
  );
}
