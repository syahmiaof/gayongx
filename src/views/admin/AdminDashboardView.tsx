import { useState } from "react";
import {
  ArrowUp,
  Award,
  Building2,
  CalendarDays,
  CalendarPlus,
  ClipboardCheck,
  Download,
  FileText,
  Globe,
  MoreHorizontal,
  Network,
  UserPlus,
  Users,
} from "lucide-react";
import { demoApprovals, demoBranches } from "../../data/dashboardData";
import { DashboardCharts } from "../../components/charts/DashboardCharts";
import {
  DemoDialog,
  MoreLink,
  Panel,
  downloadText,
} from "../../components/ui/DemoUI";
import { ProgramList } from "../../components/member/ProgramList";
const metrics = [
  {
    title: "Ahli Aktif",
    value: "2,847",
    previous: "2,545",
    change: "12%",
    icon: Users,
    tone: "emerald",
  },
  {
    title: "Pembaharuan Menunggu",
    value: "256",
    previous: "217",
    change: "18%",
    icon: FileText,
    tone: "amber",
  },
  {
    title: "Cawangan Berdaftar",
    value: "24",
    previous: "23",
    change: "4%",
    icon: Network,
    tone: "red",
  },
  {
    title: "Gelanggang Aktif",
    value: "38",
    previous: "35",
    change: "9%",
    icon: Building2,
    tone: "emerald",
  },
  {
    title: "Program Bulan Ini",
    value: "12",
    previous: "9",
    change: "33%",
    icon: CalendarDays,
    tone: "amber",
  },
  {
    title: "Kelulusan Tertunggak",
    value: "19",
    previous: "15",
    change: "27%",
    icon: FileText,
    tone: "red",
  },
];
export function AdminDashboardView({
  onNavigate = (path: string) => {
    window.location.href = path;
  },
}: {
  onNavigate?: (path: string) => void;
}) {
  const [approvals, setApprovals] = useState(demoApprovals),
    [selected, setSelected] = useState<string | null>(null),
    [message, setMessage] = useState("");
  const approval = approvals.find((a) => a.id === selected);
  const update = (status: string) => {
    setApprovals(
      approvals.map((a) => (a.id === selected ? { ...a, status } : a)),
    );
    setSelected(null);
    setMessage(
      `Permohonan ${selected} ditandakan ${status.toLowerCase()} dalam demo.`,
    );
  };
  const exportReport = () => {
    downloadText(
      "laporan-cawangan-demo.csv",
      "DEMO_SYNTHETIC\nCawangan,Ahli,Gelanggang\n" +
        demoBranches
          .map((b) => `"${b.name}",${b.members},${b.venues}`)
          .join("\n"),
      "text/csv;charset=utf-8",
    );
    setMessage("Laporan CSV demo telah dimuat turun.");
  };
  return (
    <div className="admin-dashboard">
      <section className="admin-hero">
        <div>
          <p>Selamat Datang ke</p>
          <h2>
            COMMAND CENTRE
            <br />
            <em>PSSGM PERAK</em>
          </h2>
          <p>
            Pengurusan berpusat untuk memperkasa keahlian, organisasi, cawangan,
            <br className="desktop-break" /> program dan kelulusan Pertubuhan
            Silat Seni Gayong Malaysia Negeri Perak.
          </p>
        </div>
        <aside>
          SATU WARISAN
          <br />
          SATU NEGERI
          <br />
          SATU UMMAH
        </aside>
      </section>
      <section className="admin-metrics" aria-label="Statistik demo">
        {metrics.map((m, i) => (
          <article className={`metric-card ${m.tone}`} key={m.title}>
            <span className="metric-icon">
              <m.icon />
            </span>
            <div>
              <h3>{m.title}</h3>
              <div>
                <b>{m.value}</b>
                <span className={i === 1 || i === 5 ? "negative" : "positive"}>
                  <ArrowUp />
                  {m.change}
                </span>
              </div>
              <p>daripada {m.previous}</p>
            </div>
          </article>
        ))}
      </section>
      <DashboardCharts />
      <div className="admin-lower-grid">
        <div className="admin-operations">
          <div className="admin-tables">
            <Panel
              title="Kelulusan Terkini"
              action={
                <MoreLink onClick={() => onNavigate("/admin/kelulusan")} />
              }
            >
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Tarikh</th>
                      <th>Jenis Permohonan</th>
                      <th>Nama / Organisasi</th>
                      <th>Status</th>
                      <th>Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvals.map((a) => (
                      <tr key={a.id}>
                        <td>{a.date}</td>
                        <td>{a.type}</td>
                        <td>{a.name}</td>
                        <td>
                          <span
                            className={`table-status ${a.status === "Perlu Tindakan" || a.status === "Ditolak" ? "red" : a.status === "Disemak" ? "blue" : a.status === "Diluluskan" ? "green" : "gold"}`}
                          >
                            {a.status}
                          </span>
                        </td>
                        <td>
                          <button
                            className="table-action"
                            aria-label={`Semak permohonan ${a.name}`}
                            onClick={() => setSelected(a.id)}
                          >
                            <MoreHorizontal />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
            <Panel
              title="Status Cawangan & Gelanggang"
              action={
                <MoreLink onClick={() => onNavigate("/admin/cawangan")} />
              }
            >
              <div className="table-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Cawangan</th>
                      <th>Ahli</th>
                      <th>Gelanggang</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {demoBranches.slice(0, 6).map((b) => (
                      <tr key={b.name}>
                        <td>
                          <span className="branch-name">
                            <img src="/logo-pssgm.png" alt="" />
                            {b.name}
                          </span>
                        </td>
                        <td>{b.members}</td>
                        <td>{b.venues}</td>
                        <td>
                          <span
                            className={
                              b.status === "Aktif" ? "positive" : "gold-text"
                            }
                          >
                            ● {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>
          <Panel title="Tindakan Pantas" className="quick-actions">
            <div>
              {[
                {
                  label: "Daftar Ahli",
                  text: "Pendaftaran keahlian baharu secara rasmi",
                  icon: UserPlus,
                  tone: "emerald",
                  action: () => onNavigate("/sertai"),
                },
                {
                  label: "Semak Kelulusan",
                  text: "Urus permohonan menunggu kelulusan",
                  icon: ClipboardCheck,
                  tone: "amber",
                  action: () => onNavigate("/admin/kelulusan"),
                },
                {
                  label: "Cipta Program",
                  text: "Tambah program dan aktiviti baharu",
                  icon: CalendarPlus,
                  tone: "red",
                  action: () => onNavigate("/admin/program"),
                },
                {
                  label: "Muat Turun Laporan",
                  text: "Laporan statistik dan analitik terkini",
                  icon: Download,
                  tone: "navy",
                  action: exportReport,
                },
                {
                  label: "Urus Kandungan Website",
                  text: "Kemaskini berita, galeri dan halaman portal",
                  icon: Globe,
                  tone: "neutral",
                  action: () => onNavigate("/admin/kandungan"),
                },
              ].map((a) => (
                <button key={a.label} className={a.tone} onClick={a.action}>
                  <a.icon />
                  <span>
                    <b>{a.label}</b>
                    <small>{a.text}</small>
                  </span>
                  <span>›</span>
                </button>
              ))}
            </div>
          </Panel>
        </div>
        <div className="admin-right">
          <ProgramList compact onNavigate={onNavigate} />
          <Panel
            title="Aktiviti Terkini"
            action={<MoreLink onClick={() => onNavigate("/admin/audit")} />}
          >
            <div className="admin-activity">
              {[
                [
                  "Ahmad Faris bin Ismail",
                  "menghantar permohonan keahlian baharu",
                ],
                ["PSSGM Cawangan Kinta", "mengemas kini maklumat gelanggang"],
                ["Siti Aisyah binti Kamal", "menghantar pembaharuan keahlian"],
              ].map(([name, action], i) => (
                <p key={name}>
                  <Award />
                  <span>
                    <b>{name}</b> {action}
                  </span>
                  <small>{i + 2} min lalu</small>
                </p>
              ))}
            </div>
          </Panel>
        </div>
      </div>
      {message && (
        <div className="toast" role="status">
          {message}
          <button onClick={() => setMessage("")} aria-label="Tutup makluman">
            ×
          </button>
        </div>
      )}
      {approval && (
        <DemoDialog
          title="Semakan Permohonan"
          onClose={() => setSelected(null)}
        >
          <dl className="approval-details">
            <dt>Rujukan</dt>
            <dd>{approval.id}</dd>
            <dt>Nama</dt>
            <dd>{approval.name}</dd>
            <dt>Permohonan</dt>
            <dd>{approval.type}</dd>
            <dt>Status</dt>
            <dd>{approval.status}</dd>
          </dl>
          <div className="dialog-actions">
            <button
              className="button outline"
              onClick={() => update("Ditolak")}
            >
              Tolak
            </button>
            <button
              className="button green-button"
              onClick={() => update("Diluluskan")}
            >
              Luluskan Demo
            </button>
          </div>
        </DemoDialog>
      )}
    </div>
  );
}
