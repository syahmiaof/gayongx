import { useState } from "react";
import {
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  Copy,
  FileText,
  Volume2,
} from "lucide-react";
import { SYNTHETIC_PRIMARY_MEMBER as member } from "../../data/seedData";
import { demoAnnouncements } from "../../data/dashboardData";
import { Belt, BeltJourney } from "../../components/member/BeltJourney";
import { DigitalMemberCard } from "../../components/member/DigitalMemberCard";
import { ProgramList } from "../../components/member/ProgramList";
import { DemoDialog, MoreLink, Panel } from "../../components/ui/DemoUI";
export function MemberDashboardView({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  const [announcement, setAnnouncement] = useState<number | null>(null),
    [copied, setCopied] = useState(false);
  return (
    <div className="member-dashboard">
      <section className="member-welcome">
        <img
          className="member-avatar"
          src="/images/reference/member-portrait-demo.png"
          alt="Ahmad Firdaus, potret demo"
        />
        <div className="welcome-copy">
          <p>Selamat Datang,</p>
          <h2>{member.fullName}</h2>
          <div className="member-badges">
            <span>Ahli Biasa</span>
            <span className="status-active">Aktif</span>
          </div>
          <dl>
            <div>
              <dt>No. Ahli</dt>
              <dd>
                {member.membershipNumber}
                <button
                  aria-label="Salin nombor ahli"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        member.membershipNumber,
                      );
                      setCopied(true);
                    } catch {
                      setCopied(false);
                    }
                  }}
                >
                  {copied ? <Check /> : <Copy />}
                </button>
              </dd>
            </div>
            <div>
              <dt>Cawangan</dt>
              <dd>Daerah Batang Padang</dd>
            </div>
            <div>
              <dt>Gelanggang</dt>
              <dd>{member.gelanggangName}</dd>
            </div>
            <div>
              <dt>Gurulatih</dt>
              <dd>Mejar (B) Ahmad Sulaiman</dd>
            </div>
          </dl>
        </div>
        <div className="heritage-script">
          Warisan Gayong
          <br />
          <span>Tetap Hidup</span>
        </div>
      </section>
      <section className="member-summary" aria-label="Ringkasan keahlian">
        <article className="summary-card amber">
          <CalendarDays />
          <div>
            <small>Tarikh Tamat Keahlian</small>
            <h3>31 Disember 2026</h3>
            <p>Masih 90 hari lagi</p>
          </div>
          <button
            className="button green-button"
            onClick={() => onNavigate("/portal/keahlian")}
          >
            Perbaharui Keahlian
            <ArrowRight />
          </button>
        </article>
        <article className="summary-card emerald">
          <Award />
          <div>
            <small>Bengkong Semasa</small>
            <h3>Pelangi Hijau</h3>
            <p>
              Disahkan pada
              <br />
              12 Mac 2024
            </p>
          </div>
          <Belt color="#008654" />
        </article>
        <article className="summary-card navy">
          <CalendarDays />
          <div>
            <small>Program Akan Datang</small>
            <h3 className="summary-number">3</h3>
            <p>Program</p>
          </div>
          <div className="avatar-stack">
            {[0, 1, 2].map((x) => (
              <img
                key={x}
                src="/images/reference/member-portrait-demo.png"
                alt="Peserta demo"
              />
            ))}
            <span>+12</span>
          </div>
          <button
            className="button outline"
            onClick={() => onNavigate("/portal/program")}
          >
            Lihat Program
            <ArrowRight />
          </button>
        </article>
        <article className="summary-card navy">
          <FileText />
          <div>
            <small>Sijil Diperoleh</small>
            <h3 className="summary-number">4</h3>
            <p>Sijil</p>
          </div>
          <div className="certificate-stack">
            {[1, 2, 3].map((x) => (
              <span key={x}>
                <Award />
                <i />
                <i />
              </span>
            ))}
          </div>
          <button
            className="button outline"
            onClick={() => onNavigate("/portal/sijil")}
          >
            Lihat Sijil Saya
            <ArrowRight />
          </button>
        </article>
      </section>
      <div className="member-content-grid">
        <div className="member-primary">
          <BeltJourney onNavigate={onNavigate} />
          <div className="member-lower-grid">
            <ProgramList onNavigate={onNavigate} />
            <Panel
              title="Pengumuman Terkini"
              className="announcement-panel"
              action={
                <MoreLink onClick={() => onNavigate("/portal/notifikasi")} />
              }
            >
              {demoAnnouncements.map((a, i) => (
                <button
                  key={a.title}
                  className="announcement-row"
                  onClick={() => setAnnouncement(i)}
                >
                  <span className="announcement-icon">
                    <Volume2 />
                  </span>
                  <span>
                    <b>{a.title}</b>
                    <small className={i === 0 ? "important" : ""}>
                      {a.tag}
                    </small>
                  </span>
                  <time>{a.date}</time>
                </button>
              ))}
            </Panel>
          </div>
        </div>
        <div className="member-secondary">
          <DigitalMemberCard />
          <Panel title="Aktiviti Terakhir" className="activity-panel">
            {[
              [
                "Penyertaan program",
                "Latihan mingguan · Demo Tapah",
                "2 Okt 2026, 8:30 malam",
              ],
              ["Bayaran keahlian", "Resit #RCPK202600281", "1 Okt 2026"],
              ["Muat turun sijil", "Sijil Penyertaan Program", "15 Sep 2026"],
              [
                "Kemas kini profil",
                "Maklumat peribadi dikemas kini",
                "10 Sep 2026",
              ],
            ].map(([title, desc, date], i) => (
              <div className="activity-row" key={title}>
                <span className={`activity-icon tone-${i}`}>
                  {i === 0 ? <Award /> : <FileText />}
                </span>
                <div>
                  <b>{title}</b>
                  <p>{desc}</p>
                  <small>{date}</small>
                </div>
              </div>
            ))}
          </Panel>
        </div>
      </div>
      {announcement !== null && (
        <DemoDialog
          title={demoAnnouncements[announcement].title}
          onClose={() => setAnnouncement(null)}
        >
          <p>{demoAnnouncements[announcement].body}</p>
        </DemoDialog>
      )}
    </div>
  );
}
