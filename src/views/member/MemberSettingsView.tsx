import { useState } from "react";
export function MemberSettingsView() {
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);
  return (
    <section className="management-view">
      <header>
        <div>
          <h1>Tetapan Portal</h1>
          <p>Pilihan untuk sesi demo ini.</p>
        </div>
      </header>
      <label className="settings-toggle">
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => {
            setNotifications(e.target.checked);
            setSaved(false);
          }}
        />
        Paparkan peringatan program
      </label>
      <button className="button green-button" onClick={() => setSaved(true)}>
        Simpan Tetapan
      </button>
      {saved && (
        <p className="management-notice" role="status">
          Tetapan sesi disimpan: peringatan program{" "}
          {notifications ? "diaktifkan" : "dimatikan"}.
        </p>
      )}
    </section>
  );
}
