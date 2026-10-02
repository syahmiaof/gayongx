import React, { useState } from 'react';
import { SYNTHETIC_PRIMARY_MEMBER, UPCOMING_PROGRAMMES } from '../../data/seedData';
import { Calendar, MapPin, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export const MemberProgrammesView: React.FC = () => {
  const member = SYNTHETIC_PRIMARY_MEMBER;
  const [activeTab, setActiveTab] = useState<'registered' | 'explore'>('registered');
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            Pengurusan Aktiviti Ahli
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Program &amp; Kursus Saya
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Semak rekod kehadiran acara latihan, kursus kejurulatihan, dan daftar program rasmi seterusnya.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-[#121316] p-1 rounded-lg border border-stone-800">
          <button
            type="button"
            onClick={() => setActiveTab('registered')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'registered'
                ? 'bg-stone-800 text-white font-semibold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Program Berdaftar ({member.programmes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('explore')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              activeTab === 'explore'
                ? 'bg-[#297E62] text-white font-semibold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            Daftar Acara Baharu
          </button>
        </div>
      </div>

      {checkedIn && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-md text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Pengesahan kehadiran QR gelanggang berjaya direkodkan dalam buku log digital.</span>
        </div>
      )}

      {activeTab === 'registered' ? (
        <div className="space-y-4">
          {member.programmes.map((p) => (
            <div
              key={p.id}
              className="p-5 bg-[#111216] border border-stone-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span
                    className={`font-bold ${
                      p.status === 'Berdaftar' ? 'text-[#FFF100]' : 'text-emerald-400'
                    }`}
                  >
                    {p.status}
                  </span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-400">{p.role}</span>
                </div>
                <h3 className="text-base font-bold text-white">{p.title}</h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-500" />
                    <span>{p.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>{p.venue}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {p.status === 'Berdaftar' && (
                  <button
                    type="button"
                    onClick={() => setCheckedIn(true)}
                    className="px-3 py-2 bg-[#297E62] hover:bg-[#20664f] text-white text-xs font-bold rounded shadow transition-colors"
                  >
                    Daftar Masuk (Check-in)
                  </button>
                )}
                <span className="text-xs text-stone-500 font-mono">ID: {p.id}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-stone-400">
            Berikut adalah takwim program terbuka untuk penyertaan pesilat berstatus aktif:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {UPCOMING_PROGRAMMES.map((prog) => (
              <div
                key={prog.id}
                className="p-5 bg-[#121418] border border-stone-800 rounded-xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#FFF100]">{prog.category}</div>
                  <h4 className="text-sm font-bold text-white leading-snug">{prog.title}</h4>
                  <p className="text-xs text-stone-400 line-clamp-2">{prog.description}</p>
                </div>

                <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-400">
                    RM {prog.feePerParticipant.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => alert(`Pendaftaran untuk "${prog.title}" berjaya dihantar!`)}
                    className="px-3 py-1.5 bg-[#D71F26] hover:bg-[#b8171d] text-white rounded font-medium"
                  >
                    Daftar Sekarang &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
