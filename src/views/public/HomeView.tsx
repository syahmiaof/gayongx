import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  FileText,
  Search,
  ShieldCheck,
  UserRound,
  Users,
  UserPlus,
} from "lucide-react";
import { Logo } from "../../components/common/Logo";
export function HomeView({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const modules = [
    {
      name: "Portal Ahli",
      text: "Pengurusan keahlian, profil, latihan dan rekod pencapaian.",
      icon: UserRound,
      path: "/portal",
      tone: "rose",
    },
    {
      name: "CMS Pentadbiran",
      text: "Pengurusan cawangan, dokumen, sijil dan pentadbiran organisasi.",
      icon: ShieldCheck,
      path: "/admin",
      tone: "mint",
    },
    {
      name: "Command Centre",
      text: "Statistik, laporan dan pemantauan ekosistem PSSGM Perak.",
      icon: BarChart3,
      path: "/admin",
      tone: "cream",
    },
    {
      name: "Direktori Gelanggang",
      text: "Cari gelanggang latihan rasmi berhampiran anda.",
      icon: FileText,
      path: "/gelanggang",
      tone: "blue",
    },
  ];
  return (
    <div className="home-page">
      <section className="public-hero">
        <div
          className="hero-art"
          role="img"
          aria-label="Komposit silat dan seni bina Perak, diekstrak daripada reference untuk demo"
        />
        <div className="public-container hero-content">
          <div className="hero-copy">
            <div className="eyebrow">SILAT · SENI · WARISAN · JATI DIRI</div>
            <h1>
              MEMARTABATKAN
              <br />
              <em>WARISAN SILAT SENI</em>
              <br />
              GAYONG DI BUMI
              <br />
              BERDAULAT PERAK
            </h1>
            <p>
              Ekosistem digital rasmi bagi menyelaras keabsahan cawangan,
              direktori gelanggang, latihan, perakuan sijil serta perjalanan
              tingkatan Bengkong berasaskan sukatan rasmi.
            </p>
            <div className="hero-actions">
              <button
                className="button outline"
                onClick={() => onNavigate("/semakan")}
              >
                <Search />
                Semak Keahlian
                <ChevronRight />
              </button>
              <button
                className="button red"
                onClick={() => onNavigate("/sertai")}
              >
                <UserPlus />
                Sertai Gayong
                <ChevronRight />
              </button>
            </div>
          </div>
          <aside className="verification-card">
            <Logo size="xl" textPlacement="bottom" />
            <div className="verified-panel">
              <span className="verified-check">
                <Check />
              </span>
              <div>
                <b>
                  WARISAN BERKANUN
                  <br />
                  <em>NEGERI PERAK DARUL RIDZUAN</em>
                </b>
                <p>
                  Identiti organisasi seperti dalam reference yang dibekalkan.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className="heritage-section">
        <div className="heritage-art" />
        <div className="public-container heritage-grid">
          <div className="heritage-copy">
            <div className="eyebrow gold">WARISAN AIR KUNING</div>
            <h2>
              DARI AIR KUNING,
              <br />
              TAIPING KE DUNIA
            </h2>
            <p>
              Lahir di bumi Air Kuning, Taiping, Silat Seni Gayong membentuk
              jati diri, disiplin dan kesatuan ummah serta menjadi warisan
              kebanggaan Negeri Perak.
            </p>
            <button
              className="button outline small"
              onClick={() => onNavigate("/sejarah")}
            >
              <BookOpen />
              Ketahui Sejarah & Warisan
              <ArrowRight />
            </button>
          </div>
          <div className="heritage-caption">
            AIR KUNING, TAIPING
            <br />
            NEGERI PERAK
          </div>
          <button
            className="heritage-card green"
            onClick={() => onNavigate("/gelanggang")}
          >
            <Users />
            <h3>Cawangan & Gelanggang</h3>
            <p>
              Cari cawangan berdaftar dan gelanggang latihan berhampiran anda di
              seluruh Negeri Perak.
            </p>
            <ArrowRight className="round-arrow" />
          </button>
          <button
            className="heritage-card crimson"
            onClick={() => onNavigate("/program")}
          >
            <FileText />
            <h3>Program & Warta</h3>
            <p>
              Maklumat terkini program, aktiviti dan hebahan rasmi PSSGM Perak.
            </p>
            <ArrowRight className="round-arrow" />
          </button>
        </div>
      </section>
      <section className="ecosystem-section" id="modul">
        <div className="public-container">
          <header>
            <h2>EKOSISTEM DIGITAL PSSGM PERAK</h2>
            <p>
              Satu platform bersepadu untuk ahli, pentadbiran dan pengurusan
              organisasi.
            </p>
            <a href="#modul">
              Terokai Semua Modul
              <ArrowRight />
            </a>
          </header>
          <div className="ecosystem-modules">
            {modules.map((m) => (
              <button
                key={m.name}
                className={`module ${m.tone}`}
                onClick={() => onNavigate(m.path)}
              >
                <span className="module-icon">
                  <m.icon />
                </span>
                <span>
                  <b>{m.name}</b>
                  <small>{m.text}</small>
                </span>
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
