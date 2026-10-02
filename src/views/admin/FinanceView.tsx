import React from 'react';
import { Coins, Download, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

export const FinanceView: React.FC = () => {
  const cawanganFinance = [
    {
      cawangan: 'Cawangan Daerah Batang Padang (PPM-010-04-09042013-000017)',
      activeMembers: 142,
      collectedAnnual: 5680.0,
      stateLevy: 1136.0,
      status: 'Akaun Disahkan',
    },
    {
      cawangan: 'Cawangan Seladang Berjuang, Manjung (PPM-010-04-09042013-000018)',
      activeMembers: 188,
      collectedAnnual: 7520.0,
      stateLevy: 1504.0,
      status: 'Akaun Disahkan',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
            Penyata Kewangan &amp; Kutipan Yuran
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Pengurusan Kewangan &amp; Yuran Tahunan
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Pemantauan kutipan yuran pendaftaran ahli biasa (RM 40.00/thn) dan sumbangan tabung pembangunan
            kejurulatihan negeri.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Laporan kewangan tahunan sedang dimuat turun sebagai fail PDF...')}
          className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-md border border-stone-700 flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#FFF100]" />
          <span>Muat Turun Penyata</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 bg-[#111216] border border-stone-800 rounded-xl space-y-2">
          <span className="text-[10px] font-mono uppercase text-stone-400">Jumlah Kutipan 2026</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">RM 13,200.00</div>
          <div className="text-[10px] text-stone-500 font-mono">Berasaskan 330 bayaran ahli</div>
        </div>

        <div className="p-5 bg-[#111216] border border-stone-800 rounded-xl space-y-2">
          <span className="text-[10px] font-mono uppercase text-stone-400">Caruman Tabung Negeri (20%)</span>
          <div className="text-2xl font-bold font-mono text-white">RM 2,640.00</div>
          <div className="text-[10px] text-emerald-400 font-mono">Penyelenggaraan &amp; Ujian</div>
        </div>

        <div className="p-5 bg-[#111216] border border-stone-800 rounded-xl space-y-2">
          <span className="text-[10px] font-mono uppercase text-stone-400">Status Audit Akaun</span>
          <div className="text-2xl font-bold font-mono text-[#FFF100]">TERTIB</div>
          <div className="text-[10px] text-stone-400 font-mono">Disahkan Bendahari Kehormat</div>
        </div>
      </div>

      {/* Breakdown by Branch */}
      <div className="space-y-4">
        <h3 className="text-base font-serif font-bold text-white">Pecahan Kutipan Mengikut Cawangan Rasmi</h3>

        <div className="bg-[#111216] border border-stone-800 rounded-xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-900/80 border-b border-stone-800 text-stone-400 font-mono text-[11px]">
              <tr>
                <th className="p-3.5">Cawangan Berdaftar</th>
                <th className="p-3.5">Ahli Membayar</th>
                <th className="p-3.5">Jumlah Yuran (RM)</th>
                <th className="p-3.5">Syer Bahagian Negeri</th>
                <th className="p-3.5 text-right">Status Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-300">
              {cawanganFinance.map((cf, idx) => (
                <tr key={idx} className="hover:bg-stone-900/40">
                  <td className="p-3.5 font-medium text-white">{cf.cawangan}</td>
                  <td className="p-3.5 font-mono text-stone-300">{cf.activeMembers} Orang</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-400">
                    RM {cf.collectedAnnual.toFixed(2)}
                  </td>
                  <td className="p-3.5 font-mono text-[#FFF100]">
                    RM {cf.stateLevy.toFixed(2)}
                  </td>
                  <td className="p-3.5 text-right font-mono text-emerald-400 text-[10px]">
                    {cf.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
