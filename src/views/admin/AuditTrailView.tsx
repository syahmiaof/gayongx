import React, { useState } from 'react';
import { ShieldCheck, Filter, Clock, Search, User } from 'lucide-react';

export const AuditTrailView: React.FC = () => {
  const [logs] = useState([
    {
      id: 'log-109',
      timestamp: '2026-10-01 09:14:22',
      operator: 'Setiausaha Cawangan BP',
      action: 'Pengesahan Pendaftaran Ahli Baru',
      target: 'Ahmad Luqman bin Zainal (PSSGM-PK-DEMO-00412)',
      provenance: 'DEMO_SYNTHETIC',
      ip: '175.142.18.9',
    },
    {
      id: 'log-108',
      timestamp: '2026-09-30 16:40:11',
      operator: 'Pentadbir Negeri Perak',
      action: 'Pindaan Status Cawangan LMS',
      target: 'Kesiapsiagaan Larut Matang dikemaskini ke 90%',
      provenance: 'DEMO_SYNTHETIC',
      ip: '210.195.84.14',
    },
    {
      id: 'log-107',
      timestamp: '2026-09-28 14:05:00',
      operator: 'Lembaga Gurulatih Perak',
      action: 'Kelulusan Kenaikan Bengkong',
      target: 'Ahmad Firdaus bin Rahman (Pelangi Hijau)',
      provenance: 'DEMO_SYNTHETIC',
      ip: '115.164.88.2',
    },
    {
      id: 'log-106',
      timestamp: '2026-09-22 11:30:19',
      operator: 'Sistem Gerbang Bayaran',
      action: 'Penerimaan Yuran Tahunan (RM 40.00)',
      target: 'Resit Rasmi RESIT-PK-2026-0819',
      provenance: 'DEMO_SYNTHETIC',
      ip: 'SYSTEM_AUTOPAY',
    },
    {
      id: 'log-105',
      timestamp: '2026-09-15 10:00:00',
      operator: 'Lajnah Sejarah & Dokumen',
      action: 'Pengesahan Dokumen Warta Air Kuning 1971',
      target: 'Pengesahan Rekod Statutori ROS PPM-010-04-09042013-000034',
      provenance: 'DEMO_SYNTHETIC',
      ip: 'OFFICIAL_ARCHIVE',
    },
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="text-xs font-mono text-[#D71F26] uppercase tracking-wider font-bold">
            Keselamatan &amp; Akauntabiliti
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Log Jejak Audit Sistem PSSGM Perak
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Rekod catatan aktiviti pentadbir, transaksi pembaharuan yuran dan pensijilan yang tidak boleh dipadamkan.
          </p>
        </div>

        <span className="text-xs font-mono text-stone-400 bg-stone-900 px-3 py-1 rounded border border-stone-800">
          Integriti Jejak Audit Terpelihara
        </span>
      </div>

      <div className="bg-[#111216] border border-stone-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-900/80 border-b border-stone-800 text-stone-400 font-mono text-[11px]">
            <tr>
              <th className="p-3.5">Masa &amp; ID</th>
              <th className="p-3.5">Pegawai / Operator</th>
              <th className="p-3.5">Aktiviti &amp; Tindakan</th>
              <th className="p-3.5">Sasaran Rekod</th>
              <th className="p-3.5 text-right">Klasifikasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/80 text-stone-300 font-mono">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-stone-900/40 text-[11px]">
                <td className="p-3.5">
                  <div className="text-stone-300 font-semibold">{log.timestamp}</div>
                  <div className="text-[10px] text-stone-500">#{log.id}</div>
                </td>
                <td className="p-3.5 text-white font-sans font-medium">{log.operator}</td>
                <td className="p-3.5 text-[#FFF100] font-sans">{log.action}</td>
                <td className="p-3.5 text-stone-300 font-sans">{log.target}</td>
                <td className="p-3.5 text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.provenance === 'DEMO_SYNTHETIC'
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800'
                        : 'text-stone-400 bg-stone-900 border border-stone-800'
                    }`}
                  >
                    {log.provenance}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

