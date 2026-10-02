import React, { useState } from 'react';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { CAWANGAN_LIST, GELANGGANG_LIST } from '../../data/seedData';
import { ShieldCheck, GitBranch, MapPin, Users, CheckCircle, Clock, ChevronRight } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const CawanganView: React.FC<Props> = ({ onNavigate }) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'rasmi' | 'penaja'>('all');

  const filtered = CAWANGAN_LIST.filter((c) => {
    if (filterStatus === 'rasmi') return c.status === 'Rasmi Berdaftar';
    if (filterStatus === 'penaja') return c.status === 'Dalam Proses Penubuhan';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-4 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
          <GitBranch className="w-4 h-4 text-[#D71F26]" />
          <span>Direktori Statutori Cawangan</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
          Cawangan PSSGM Bahagian Negeri Perak
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Senarai cawangan daerah yang berwarta sah di bawah Jabatan Pendaftaran Pertubuhan Malaysia (ROS)
          serta inisiatif jawatankuasa penaja cawangan dalam proses kelulusan statutori.
        </p>

        {/* Filter Tabs */}
        <div className="pt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              filterStatus === 'all'
                ? 'bg-stone-200 text-stone-900 font-semibold'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Semua ({CAWANGAN_LIST.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('rasmi')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              filterStatus === 'rasmi'
                ? 'bg-emerald-600 text-white font-semibold'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Rasmi Berdaftar ROS (2)
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('penaja')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              filterStatus === 'penaja'
                ? 'bg-amber-600 text-white font-semibold'
                : 'bg-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            Dalam Proses Penubuhan (2)
          </button>
        </div>
      </div>

      {/* Cawangan Cards List */}
      <div className="space-y-6">
        {filtered.map((caw) => {
          const isOfficial = caw.status === 'Rasmi Berdaftar';
          const gelCount = GELANGGANG_LIST.filter((g) => g.cawanganId === caw.id).length;

          return (
            <div
              key={caw.id}
              className="p-6 bg-[#111216] border border-stone-800 hover:border-stone-700 rounded-xl space-y-5 transition-all"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span
                      className={`font-semibold ${
                        isOfficial ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {caw.status}
                    </span>
                    <span className="text-stone-600">·</span>
                    <span className="text-stone-400">Daerah: {caw.district}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                    {caw.name}
                  </h3>
                  {caw.registrationNumber && (
                    <div className="text-xs font-mono text-[#FFF100] font-semibold">
                      No. Pendaftaran ROS: {caw.registrationNumber}
                    </div>
                  )}
                </div>

                <div className="text-right space-y-1">
                  <DataProvenanceBadge provenance={caw.dataProvenance} />
                  <div className="text-xs text-stone-400 font-mono">
                    {caw.memberCount} Ahli Berdaftar · {gelCount || caw.gelanggangCount} Gelanggang
                  </div>
                </div>
              </div>

              {/* Committee & Location Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <span className="text-stone-500">Pengerusi / Penyelaras:</span>
                  <div className="text-stone-200 font-semibold">{caw.chairmanName}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-stone-500">Pusat Operasi Cawangan:</span>
                  <div className="text-stone-200">{caw.headquarters}</div>
                </div>
              </div>

              {/* Branch Formation Readiness Screen (If In Progress) */}
              {caw.readiness && (
                <div className="p-4 bg-stone-900/90 border border-stone-800 rounded-lg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-mono text-amber-400 font-bold uppercase">
                      Status Kesiapsiagaan Penubuhan Cawangan (Simulasi Prototaip)
                    </div>
                    <div className="text-xs font-mono text-white font-bold">
                      {caw.readiness.currentMembers} / {caw.readiness.requiredMembers} Ahli Minima (
                      {Math.round(
                        (caw.readiness.currentMembers / caw.readiness.requiredMembers) * 100
                      )}
                      %)
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (caw.readiness.currentMembers / caw.readiness.requiredMembers) * 100
                        )}%`,
                      }}
                    />
                  </div>

                  {/* 6-Point Checklist */}
                  <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {caw.readiness.checkpoints.map((cp) => (
                      <div
                        key={cp.id}
                        className="flex items-start gap-2 p-2 bg-stone-950/60 rounded border border-stone-800/80"
                      >
                        {cp.completed ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <div
                            className={`font-medium ${
                              cp.completed ? 'text-stone-200' : 'text-stone-400'
                            }`}
                          >
                            {cp.label}
                          </div>
                          <div className="text-[10px] text-stone-500 mt-0.5">{cp.statusNote}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-stone-500 italic">
                    Perhatian: Modul kesiapsiagaan adalah konsep prototaip dan tidak mengisytiharkan
                    cawangan ini sah berdaftar sehingga sijil ROS dikeluarkan.
                  </div>
                </div>
              )}

              {/* Gelanggang List under this Branch */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onNavigate('/gelanggang')}
                  className="text-xs text-[#FFF100] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Lihat Gelanggang di bawah {caw.name}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/sertai')}
                  className="text-xs text-stone-300 hover:text-white"
                >
                  Daftar Ahli Cawangan Ini &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
