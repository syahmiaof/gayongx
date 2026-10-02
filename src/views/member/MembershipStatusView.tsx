import React, { useState } from 'react';
import { SYNTHETIC_PRIMARY_MEMBER } from '../../data/seedData';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { CheckCircle2, ShieldCheck, CreditCard, Clock, FileText, ArrowRight } from 'lucide-react';

export const MembershipStatusView: React.FC = () => {
  const member = SYNTHETIC_PRIMARY_MEMBER;
  const [expiry, setExpiry] = useState(member.expiryDate);
  const [renewing, setRenewing] = useState(false);
  const [renewedSuccess, setRenewedSuccess] = useState(false);

  const handleRenew = () => {
    setRenewing(true);
    setTimeout(() => {
      setExpiry('2028-03-11');
      setRenewing(false);
      setRenewedSuccess(true);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6">
        <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
          Pengurusan Langganan &amp; Yuran
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
          Status Keahlian &amp; Pembaharuan
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Semak tempoh sah keahlian tahunan, sejarah transaksi yuran serta kemudahan pembaharuan dalam talian.
        </p>
      </div>

      {renewedSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-lg text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Pembaharuan Berjaya!</div>
              <div>Yuran tahunan 2027/2028 telah disahkan. Tempoh sah dilanjutkan ke {expiry}.</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRenewedSuccess(false)}
            className="text-emerald-400 hover:text-white"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Main Status Panel */}
      <div className="p-6 bg-[#121419] border border-stone-800 rounded-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-[10px] font-mono text-stone-500 uppercase">Kategori Keahlian</span>
            <div className="text-xl font-bold text-white font-serif">{member.membershipCategory}</div>
            <div className="text-xs font-mono text-[#FFF100] mt-0.5">{member.membershipNumber}</div>
          </div>

          <div className="text-right">
            <span className="px-3 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-xs font-bold font-mono">
              Status: {member.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-stone-900/60 rounded-lg border border-stone-800">
            <span className="text-stone-500 text-[10px] uppercase font-mono">Tarikh Mula Mendaftar</span>
            <div className="font-semibold text-white mt-1 font-mono">{member.joinedDate}</div>
          </div>

          <div className="p-4 bg-stone-900/60 rounded-lg border border-stone-800">
            <span className="text-stone-500 text-[10px] uppercase font-mono">Tarikh Luput Semasa</span>
            <div className="font-semibold text-emerald-400 mt-1 font-mono">{expiry}</div>
          </div>

          <div className="p-4 bg-stone-900/60 rounded-lg border border-stone-800">
            <span className="text-stone-500 text-[10px] uppercase font-mono">Kadar Yuran Tahunan</span>
            <div className="font-semibold text-white mt-1 font-mono">RM 40.00 / tahun</div>
          </div>
        </div>

        {/* Renewal Action Box */}
        <div className="p-5 bg-gradient-to-r from-stone-900 to-[#161a22] border border-stone-700/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-white">Pembaharuan Keahlian Tahunan</div>
            <div className="text-[11px] text-stone-300">
              Lakukan pembaharuan bagi memastikan perlindungan takaful latihan dan kelayakan ujian bengkong.
            </div>
          </div>

          <button
            type="button"
            disabled={renewing}
            onClick={handleRenew}
            className="px-5 py-2.5 bg-[#297E62] hover:bg-[#20664f] disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow flex items-center justify-center gap-2 transition-all shrink-0"
          >
            <CreditCard className="w-4 h-4" />
            <span>{renewing ? 'Memproses Transaksi...' : 'Bayar Pembaharuan (RM 40.00)'}</span>
          </button>
        </div>
      </div>

      {/* Transaction & Fee History Table */}
      <div className="space-y-4">
        <h3 className="text-base font-serif font-bold text-white">Sejarah Transaksi &amp; Resit Yuran</h3>

        <div className="bg-[#111216] border border-stone-800 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-900/80 border-b border-stone-800 text-stone-400 font-mono text-[11px]">
              <tr>
                <th className="p-3">Rujukan Transaksi</th>
                <th className="p-3">Keterangan</th>
                <th className="p-3">Tarikh</th>
                <th className="p-3">Jumlah</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/80 text-stone-300">
              {member.payments.map((p) => (
                <tr key={p.id} className="hover:bg-stone-900/40">
                  <td className="p-3 font-mono text-white">{p.reference}</td>
                  <td className="p-3">{p.description}</td>
                  <td className="p-3 font-mono text-stone-400">{p.date}</td>
                  <td className="p-3 font-mono font-bold text-emerald-400">
                    RM {p.amount.toFixed(2)}
                  </td>
                  <td className="p-3">
                    <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      {p.status}
                    </span>
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
