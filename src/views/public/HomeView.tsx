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
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Logo } from "../../components/common/Logo";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function motionWords(text: string, className = "reveal-word") {
  const words = text.split(/\s+/).filter(Boolean);
  return words.flatMap((word, index) => [
    <span className={className} aria-hidden="true" key={`${word}-${index}`}>
      {word}
    </span>,
    ...(index < words.length - 1 ? [" "] : []),
  ]);
}

export function HomeView({
  onNavigate,
  animate,
}: {
  onNavigate: (path: string) => void;
  animate: boolean;
}) {
  const homeMotionScope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = homeMotionScope.current;
      if (
        !root ||
        !animate ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }
      const heritageTrigger = root.querySelector(".heritage-section");
      const ecosystemTrigger = root.querySelector(".ecosystem-section");

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .fromTo(
          ".hero-copy .eyebrow",
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: 0.48 },
        )
        .fromTo(
          ".hero-word",
          {
            autoAlpha: 0,
            y: 34,
            rotateX: -24,
            transformPerspective: 500,
            transformOrigin: "50% 100%",
          },
          {
            autoAlpha: 1,
            y: 0,
            rotateX: 0,
            duration: 0.72,
            stagger: 0.055,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.12",
        )
        .fromTo(
          ".hero-copy > p .reveal-word",
          { autoAlpha: 0, y: 12 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.018,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.22",
        )
        .fromTo(
          ".hero-actions .button",
          { autoAlpha: 0, y: 18, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.48,
            stagger: 0.11,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.08",
        )
        .fromTo(
          ".hero-actions .reveal-word",
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.04,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.32",
        )
        .fromTo(
          ".verification-card",
          { autoAlpha: 0, y: 28, scale: 0.96, rotateY: -5 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateY: 0,
            duration: 0.72,
            clearProps: "transform,opacity,visibility",
          },
          0.12,
        )
        .fromTo(
          ".verification-card .reveal-word, .verification-card .verified-check",
          { autoAlpha: 0, y: 10, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.38,
            stagger: 0.028,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.35",
        );

      gsap.fromTo(
        ".hero-art",
        { scale: 1.075, transformOrigin: "58% 50%" },
        {
          scale: 1,
          duration: 2.1,
          ease: "power3.out",
          clearProps: "transform",
        },
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: heritageTrigger,
            start: "top 88%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .fromTo(
          ".heritage-copy .reveal-word, .heritage-caption .reveal-word",
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.48,
            stagger: 0.025,
            clearProps: "transform,opacity,visibility",
          },
        )
        .fromTo(
          ".heritage-card",
          { autoAlpha: 0, y: 26, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.56,
            stagger: 0.12,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.16",
        )
        .fromTo(
          ".heritage-card .reveal-word, .heritage-card > svg",
          { autoAlpha: 0, y: 9 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.34,
            stagger: 0.018,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.28",
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: ecosystemTrigger,
            start: "top 88%",
            once: true,
          },
          defaults: { ease: "power3.out" },
        })
        .fromTo(
          ".ecosystem-section header .reveal-word, .ecosystem-section header a",
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            stagger: 0.045,
            clearProps: "transform,opacity,visibility",
          },
        )
        .fromTo(
          ".ecosystem-section .module",
          { autoAlpha: 0, y: 24, scale: 0.97 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.52,
            stagger: 0.1,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.1",
        )
        .fromTo(
          ".ecosystem-section .module .reveal-word, .ecosystem-section .module-icon",
          { autoAlpha: 0, y: 8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            stagger: 0.016,
            clearProps: "transform,opacity,visibility",
          },
          "-=0.28",
        );

      ScrollTrigger.refresh();
    },
    {
      scope: homeMotionScope,
      dependencies: [animate],
      revertOnUpdate: true,
    },
  );

  const modules = [
    {
      name: "Portal Ahli",
      text: "Pengurusan keahlian, profil, latihan dan rekod pencapaian.",
      icon: UserRound,
      path: "/login",
      tone: "rose",
    },
    {
      name: "CMS Pentadbiran",
      text: "Pengurusan cawangan, dokumen, sijil dan pentadbiran organisasi.",
      icon: ShieldCheck,
      path: "/login",
      tone: "mint",
    },
    {
      name: "Command Centre",
      text: "Statistik, laporan dan pemantauan ekosistem PSSGM Perak.",
      icon: BarChart3,
      path: "/login",
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
    <div className="home-page" ref={homeMotionScope}>
      <section className="public-hero">
        <div
          className="hero-art"
          role="img"
          aria-label="Komposit silat dan seni bina Perak, diekstrak daripada reference untuk demo"
        />
        <div className="public-container hero-content">
          <div className="hero-copy">
            <div className="eyebrow">SILAT · SENI · WARISAN · JATI DIRI</div>
            <h1
              className="whitespace-normal"
              style={{ whiteSpace: "normal" }}
              aria-label="Memartabatkan warisan Silat Seni Gayong di bumi berdaulat Perak"
            >
              <span className="hero-word" aria-hidden="true">MEMARTABATKAN</span>
              <br />
              <em aria-hidden="true">
                {motionWords("WARISAN SILAT SENI GAYONG", "hero-word")}
              </em>
              <br />
              <span aria-hidden="true">
                {motionWords("DI BUMI BERDAULAT PERAK", "hero-word")}
              </span>
            </h1>
            <p aria-label="Ekosistem digital rasmi bagi menyelaras keabsahan cawangan, direktori gelanggang, latihan, perakuan sijil serta perjalanan tingkatan Bengkong berasaskan sukatan rasmi.">
              {motionWords("Ekosistem digital rasmi bagi menyelaras keabsahan cawangan, direktori gelanggang, latihan, perakuan sijil serta perjalanan tingkatan Bengkong berasaskan sukatan rasmi.")}
            </p>
            <div className="hero-actions">
              <button
                className="button outline"
                aria-label="Semak keahlian"
                onClick={() => onNavigate("/semakan")}
              >
                <Search />
                <span aria-hidden="true">{motionWords("Semak Keahlian")}</span>
                <ChevronRight />
              </button>
              <button
                className="button red"
                aria-label="Sertai Gayong"
                onClick={() => onNavigate("/sertai")}
              >
                <UserPlus />
                <span aria-hidden="true">{motionWords("Sertai Gayong")}</span>
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
                <b aria-label="Warisan berkanun Negeri Perak Darul Ridzuan">
                  <span aria-hidden="true">{motionWords("WARISAN BERKANUN")}</span>
                  <br />
                  <em aria-hidden="true">{motionWords("NEGERI PERAK DARUL RIDZUAN")}</em>
                </b>
                <p aria-label="Identiti organisasi seperti dalam rujukan yang dibekalkan.">
                  {motionWords("Identiti organisasi seperti dalam rujukan yang dibekalkan.")}
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
            <div className="eyebrow gold" aria-label="Warisan Air Kuning">
              <span aria-hidden="true">{motionWords("WARISAN AIR KUNING")}</span>
            </div>
            <h2 aria-label="Dari Air Kuning, Taiping ke dunia">
              <span aria-hidden="true">{motionWords("DARI AIR KUNING,")}</span>
              <br />
              <span aria-hidden="true">{motionWords("TAIPING KE DUNIA")}</span>
            </h2>
            <p aria-label="Lahir di bumi Air Kuning, Taiping, Silat Seni Gayong membentuk jati diri, disiplin dan kesatuan ummah serta menjadi warisan kebanggaan Negeri Perak.">
              {motionWords("Lahir di bumi Air Kuning, Taiping, Silat Seni Gayong membentuk jati diri, disiplin dan kesatuan ummah serta menjadi warisan kebanggaan Negeri Perak.")}
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
          <div
            className="heritage-caption"
            aria-label="Air Kuning, Taiping, Negeri Perak"
          >
            <span aria-hidden="true">{motionWords("AIR KUNING, TAIPING")}</span>
            <br />
            <span aria-hidden="true">{motionWords("NEGERI PERAK")}</span>
          </div>
          <button
            className="heritage-card green"
            onClick={() => onNavigate("/gelanggang")}
          >
            <Users />
            <h3 aria-label="Cawangan dan gelanggang">
              <span aria-hidden="true">{motionWords("Cawangan & Gelanggang")}</span>
            </h3>
            <p aria-label="Cari cawangan berdaftar dan gelanggang latihan berhampiran anda di seluruh Negeri Perak.">
              {motionWords("Cari cawangan berdaftar dan gelanggang latihan berhampiran anda di seluruh Negeri Perak.")}
            </p>
            <ArrowRight className="round-arrow" />
          </button>
          <button
            className="heritage-card crimson"
            onClick={() => onNavigate("/program")}
          >
            <FileText />
            <h3 aria-label="Program dan warta">
              <span aria-hidden="true">{motionWords("Program & Warta")}</span>
            </h3>
            <p aria-label="Maklumat terkini program, aktiviti dan hebahan rasmi PSSGM Perak.">
              {motionWords("Maklumat terkini program, aktiviti dan hebahan rasmi PSSGM Perak.")}
            </p>
            <ArrowRight className="round-arrow" />
          </button>
        </div>
      </section>
      <section className="ecosystem-section" id="modul">
        <div className="public-container">
          <header>
            <h2 aria-label="Ekosistem digital PSSGM Perak">
              <span aria-hidden="true">{motionWords("EKOSISTEM DIGITAL PSSGM PERAK")}</span>
            </h2>
            <p aria-label="Satu platform bersepadu untuk ahli, pentadbiran dan pengurusan organisasi.">
              {motionWords("Satu platform bersepadu untuk ahli, pentadbiran dan pengurusan organisasi.")}
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
                  <b aria-label={m.name}>
                    <span aria-hidden="true">{motionWords(m.name)}</span>
                  </b>
                  <small aria-label={m.text}>
                    <span aria-hidden="true">{motionWords(m.text)}</span>
                  </small>
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
