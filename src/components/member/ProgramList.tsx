import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { demoPrograms } from "../../data/dashboardData";
import { DemoDialog, MoreLink, Panel } from "../ui/DemoUI";
export function ProgramList({
  compact = false,
  onNavigate,
}: {
  compact?: boolean;
  onNavigate: (path: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null),
    [registered, setRegistered] = useState<string[]>([]);
  const program = demoPrograms.find((p) => p.id === selected);
  return (
    <Panel
      title="Program Akan Datang"
      className={compact ? "program-list compact" : "program-list"}
      action={
        <MoreLink
          onClick={() =>
            onNavigate(compact ? "/admin/program" : "/portal/program")
          }
        />
      }
    >
      <div>
        {demoPrograms.map((p) => (
          <article className="program-row" key={p.id}>
            <div className="date-tile">
              <b>{p.day}</b>
              <span>{p.month}</span>
              {!compact && <small>2026</small>}
            </div>
            {!compact && (
              <img
                src={`/images/reference/${p.image}`}
                alt="Visual program demo daripada reference"
              />
            )}
            <div className="program-info">
              <h3>{p.title}</h3>
              <p>{p.place}</p>
              {!compact && <small>{p.tags}</small>}
            </div>
            <button
              className={compact ? "icon-button" : "register-button"}
              aria-label={`Daftar ${p.title}`}
              onClick={() => setSelected(p.id)}
            >
              {!compact && (registered.includes(p.id) ? "Berdaftar" : "Daftar")}
              <ArrowRight />
            </button>
          </article>
        ))}
      </div>
      {program && (
        <DemoDialog title={program.title} onClose={() => setSelected(null)}>
          <p>
            {program.day} {program.month} 2026 · {program.place}
          </p>
          {registered.includes(program.id) ? (
            <p role="status">Pendaftaran demo anda telah direkodkan.</p>
          ) : (
            <>
              <p>
                Daftar penyertaan sebagai Ahmad Firdaus bin Rahman. Tiada
                bayaran atau penghantaran data sebenar.
              </p>
              <button
                className="button green-button"
                onClick={() => setRegistered([...registered, program.id])}
              >
                Sahkan Pendaftaran Demo
              </button>
            </>
          )}
        </DemoDialog>
      )}
    </Panel>
  );
}
