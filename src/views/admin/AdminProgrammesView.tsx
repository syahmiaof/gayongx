import { useState, type FormEvent } from "react";
import { CalendarPlus, MapPin } from "lucide-react";
import { demoPrograms } from "../../data/dashboardData";
import { DemoDialog, Panel } from "../../components/ui/DemoUI";

interface LocalProgram {
  id: string;
  title: string;
  place: string;
  date: string;
}

export function AdminProgrammesView() {
  const [programs, setPrograms] = useState<LocalProgram[]>(
    demoPrograms.map((p, index) => ({
      id: p.id,
      title: p.title,
      place: p.place,
      date: ["2026-11-15", "2026-11-28", "2026-12-12"][index],
    })),
  );
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  function createProgram(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const title = String(fields.get("title") ?? "").trim();
    const place = String(fields.get("place") ?? "").trim();
    const date = String(fields.get("date") ?? "");
    if (!title || !place || !date) return;
    setPrograms((previous) => [
      ...previous,
      { id: crypto.randomUUID(), title, place, date },
    ]);
    setQuery("");
    setCreating(false);
    setMessage(`Program “${title}” dicipta dalam sesi demo ini.`);
  }

  return (
    <div className="management-view">
      <header>
        <div>
          <h1>Program & Aktiviti</h1>
          <p>DEMO_SYNTHETIC · Urus takwim program negeri dalam sesi ini.</p>
        </div>
        <button
          className="button gold-button"
          onClick={() => setCreating(true)}
        >
          <CalendarPlus />
          Cipta Program
        </button>
      </header>
      <label className="management-search">
        Cari program
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Nama program atau lokasi"
        />
      </label>
      {message && (
        <p className="management-notice" role="status">
          {message}
        </p>
      )}
      <div className="management-grid">
        {programs
          .filter((p) =>
            `${p.title} ${p.place}`.toLowerCase().includes(query.toLowerCase()),
          )
          .map((p) => (
            <Panel key={p.id} title={p.title}>
              <div className="management-program">
                <p>
                  {new Intl.DateTimeFormat("ms-MY", {
                    dateStyle: "long",
                  }).format(new Date(p.date + "T12:00:00"))}
                </p>
                <p>
                  <MapPin />
                  {p.place}
                </p>
                <span className="table-status green">Dijadualkan · Demo</span>
              </div>
            </Panel>
          ))}
      </div>
      {!programs.some((p) =>
        `${p.title} ${p.place}`.toLowerCase().includes(query.toLowerCase()),
      ) && <p>Tiada program sepadan. Cuba carian lain.</p>}
      {creating && (
        <DemoDialog
          title="Cipta Program Demo"
          onClose={() => setCreating(false)}
        >
          <form className="demo-form" onSubmit={createProgram}>
            <label>
              Nama program
              <input name="title" required maxLength={120} />
            </label>
            <label>
              Lokasi
              <input name="place" required maxLength={160} />
            </label>
            <label>
              Tarikh
              <input type="date" name="date" required min="2026-10-02" />
            </label>
            <button className="button green-button" type="submit">
              Simpan Program
            </button>
          </form>
        </DemoDialog>
      )}
    </div>
  );
}
