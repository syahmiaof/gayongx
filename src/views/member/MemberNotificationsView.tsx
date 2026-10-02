import React, { useState } from 'react';
import { Bell, Check, Clock, Award, ShieldAlert, FileText } from 'lucide-react';

export const MemberNotificationsView: React.FC = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Kelulusan Kenaikan Bengkong Pelangi Hijau Disahkan',
      date: '2026-09-22 10:30',
      category: 'Bengkong',
      message:
        'Tahniah, sijil kenaikan bengkong Pelangi Hijau anda telah ditandatangani dan boleh dimuat turun dari repositori sijil.',
      unread: true,
    },
    {
      id: 2,
      title: 'Peringatan Pembaharuan Keahlian Tahunan (2027)',
      date: '2026-09-15 08:45',
      category: 'Keahlian',
      message:
        'Keahlian anda akan tamat pada 11 Mac 2027. Sila pastikan urusan pembaharuan dibuat tepat pada masanya.',
      unread: true,
    },
    {
      id: 3,
      title: 'Jadual Kursus Senjata Tradisional Siri 2 Perak',
      date: '2026-08-30 14:00',
      category: 'Takwim',
      message:
        'Pendaftaran bagi Kursus Pemantapan Parang Lading & Lembing telah dibuka untuk pesilat Pelangi Hijau dan ke atas.',
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      <div className="border-b border-stone-800 pb-6 flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            Pusat Mesej &amp; Makluman
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Notifikasi Pentadbiran
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Makluman rasmi berhubung status keahlian, takwim latihan dan warta negeri.
          </p>
        </div>

        <button
          type="button"
          onClick={markAllRead}
          className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Tandakan Semua Dibaca</span>
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-5 rounded-xl border transition-all ${
              n.unread
                ? 'bg-[#15171e] border-stone-700 shadow-md'
                : 'bg-[#101115] border-stone-800/80'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#FFF100] font-semibold">{n.category}</span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-400">{n.date}</span>
                  {n.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#D71F26]" />
                  )}
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{n.title}</h3>
                <p className="text-xs text-stone-300 leading-relaxed">{n.message}</p>
              </div>

              <span className="text-[10px] font-mono text-stone-500 uppercase shrink-0">
                Rasmi PSSGM
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
