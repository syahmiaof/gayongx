import React, { useState } from 'react';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { UPCOMING_PROGRAMMES } from '../../data/seedData';
import { ProgrammeRecord } from '../../types';
import { Calendar, MapPin, Users, Coins, Check, ArrowRight, X } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const ProgrammesView: React.FC<Props> = ({ onNavigate }) => {
  const [selectedProg, setSelectedProg] = useState<ProgrammeRecord | null>(null);
  const [registeredSuccess, setRegisteredSuccess] = useState<string | null>(null);

  const handleRegisterSimulation = (prog: ProgrammeRecord) => {
    setRegisteredSuccess(prog.title);
    setSelectedProg(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-4 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFF100] uppercase tracking-wider">
          <Calendar className="w-4 h-4 text-[#D71F26]" />
          <span>Takwim Acara &amp; Kursus Rasmi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
          Kalendar Program PSSGM Bahagian Negeri Perak
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Jadual rasmi kursus kejurulatihan, ujian kenaikan bengkong berperingkat, majlis mandi minyak
          dan perhimpunan memperingati sejarah Air Kuning Taiping.
        </p>
      </div>

      {/* Success Banner if user registered */}
      {registeredSuccess && (
        <div className="p-4 bg-emerald-950/80 border border-emerald-800 rounded-lg flex items-center justify-between text-xs text-emerald-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>
              Pendaftaran simulasi untuk <strong>{registeredSuccess}</strong> berjaya dihantar!
            </span>
          </div>
          <button
            type="button"
            onClick={() => setRegisteredSuccess(null)}
            className="text-emerald-400 hover:text-white"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Programmes List */}
      <div className="space-y-6">
        {UPCOMING_PROGRAMMES.map((prog) => {
          const isFull = prog.registeredCount >= prog.maxParticipants;
          return (
            <div
              key={prog.id}
              className="p-6 bg-[#111216] border border-stone-800 hover:border-stone-700 rounded-xl space-y-5 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-[#FFF100] font-semibold">{prog.category}</span>
                    <span className="text-stone-600">·</span>
                    <span className="text-stone-400">Anjuran: {prog.cawanganHost}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {prog.title}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800 px-2.5 py-1 rounded">
                    {prog.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-300">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#FFF100] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Tarikh &amp; Masa:</div>
                    <div>
                      {prog.startDate} {prog.endDate ? `- ${prog.endDate}` : ''}
                    </div>
                    <div className="text-stone-400 text-[11px]">{prog.time}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#D71F26] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Lokasi &amp; Daerah:</div>
                    <div>{prog.venue}</div>
                    <div className="text-stone-400 text-[11px]">{prog.district}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Coins className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-white">Yuran Penyertaan:</div>
                    <div className="text-sm font-bold text-white font-mono">
                      RM {prog.feePerParticipant.toFixed(2)}
                    </div>
                    <div className="text-stone-400 text-[11px]">
                      {prog.registeredCount} / {prog.maxParticipants} Peserta Berdaftar
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">{prog.description}</p>

              {/* Highlights */}
              <div className="p-3 bg-stone-900/60 rounded border border-stone-800/80">
                <div className="text-[10px] font-mono uppercase text-stone-400 mb-1.5">
                  Pengisian Utama Program:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-stone-300">
                  {prog.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFF100]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <DataProvenanceBadge provenance={prog.dataProvenance} />
                <button
                  type="button"
                  onClick={() => setSelectedProg(prog)}
                  className="px-4 py-2 bg-[#D71F26] hover:bg-[#b8171d] text-white rounded text-xs font-semibold transition-colors"
                >
                  Daftar Penyertaan &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Registration Modal Simulation */}
      {selectedProg && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#15171d] border border-stone-800 rounded-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white font-serif">
                Pendaftaran Program Silat Seni Gayong
              </h3>
              <button
                type="button"
                onClick={() => setSelectedProg(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="p-3 bg-stone-900 rounded border border-stone-800 space-y-1">
                <div className="font-semibold text-white">{selectedProg.title}</div>
                <div className="text-stone-400">
                  {selectedProg.startDate} · {selectedProg.venue}
                </div>
                <div className="text-emerald-400 font-mono font-bold">
                  Yuran: RM {selectedProg.feePerParticipant.toFixed(2)}
                </div>
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Nama Penuh Pesilat / Ahli:</label>
                <input
                  type="text"
                  defaultValue="Ahmad Firdaus bin Rahman"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Nombor Keahlian PSSGM:</label>
                <input
                  type="text"
                  defaultValue="PSSGM-PK-DEMO-00281"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-400 mb-1">Cawangan / Gelanggang:</label>
                <input
                  type="text"
                  defaultValue="Cawangan Daerah Batang Padang / Gelanggang Demo Tapah"
                  className="w-full px-3 py-2 bg-stone-900 border border-stone-800 rounded text-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedProg(null)}
                className="px-3 py-2 text-xs text-stone-400 hover:text-white"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleRegisterSimulation(selectedProg)}
                className="px-4 py-2 text-xs font-semibold bg-[#297E62] hover:bg-[#20634d] text-white rounded"
              >
                Sahkan &amp; Hantar Pendaftaran
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
