import React, { useState } from 'react';
import { CAWANGAN_LIST } from '../../data/seedData';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import {
  GitBranch,
  CheckCircle2,
  Clock,
  Users,
  AlertCircle,
  FileCheck,
  Plus,
  RefreshCw,
} from 'lucide-react';

export const BranchReadinessView: React.FC = () => {
  const [provisionalList, setProvisionalList] = useState(
    CAWANGAN_LIST.filter((c) => c.status === 'Dalam Proses Penubuhan')
  );
  const [selectedBranchId, setSelectedBranchId] = useState(provisionalList[0]?.id || '');

  const activeBranch = provisionalList.find((b) => b.id === selectedBranchId) || provisionalList[0];

  const handleToggleCheckpoint = (cpId: string) => {
    setProvisionalList((prev) =>
      prev.map((b) => {
        if (b.id === activeBranch.id && b.readiness) {
          const updatedCheckpoints = b.readiness.checkpoints.map((cp) => {
            if (cp.id === cpId) {
              return {
                ...cp,
                completed: !cp.completed,
                statusNote: !cp.completed
                  ? 'Selesai disahkan oleh urusetia pentadbiran.'
                  : 'Memerlukan semakan semula dokumen.',
              };
            }
            return cp;
          });
          return {
            ...b,
            readiness: {
              ...b.readiness,
              checkpoints: updatedCheckpoints,
            },
          };
        }
        return b;
      })
    );
  };

  const handleAddDemoMember = () => {
    setProvisionalList((prev) =>
      prev.map((b) => {
        const readiness = b.readiness;
        if (b.id === activeBranch.id && readiness) {
          const newCount = readiness.currentMembers + 1;
          const metThreshold = newCount >= readiness.requiredMembers;

          const updatedCheckpoints = readiness.checkpoints.map((cp, idx) => {
            if (idx === 0) {
              return {
                ...cp,
                completed: metThreshold,
                statusNote: `${newCount} / ${readiness.requiredMembers} ahli berdaftar (${
                  metThreshold ? 'Ambang berjaya dicapai!' : `Perlu ${readiness.requiredMembers - newCount} lagi ahli`
                })`,
              };
            }
            return cp;
          });

          return {
            ...b,
            memberCount: newCount,
            readiness: {
              ...readiness,
              currentMembers: newCount,
              checkpoints: updatedCheckpoints,
            },
          };
        }
        return b;
      })
    );
  };

  if (!activeBranch || !activeBranch.readiness) {
    return <div>Tiada data kesiapsiagaan cawangan.</div>;
  }

  const completedCount = activeBranch.readiness.checkpoints.filter((c) => c.completed).length;
  const totalCount = activeBranch.readiness.checkpoints.length;
  const readinessPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
            Simulasi Kesiapsiagaan Pembentukan Cawangan Baharu
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Matriks Kesiapsiagaan Penubuhan Cawangan (ROS)
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Pantau dan sahkan kriteria penubuhan cawangan mengikut perlembagaan pertubuhan sebelum
            permohonan diserahkan kepada Pendaftar Pertubuhan Malaysia.
          </p>
        </div>

        <DataProvenanceBadge provenance={activeBranch.dataProvenance} />
      </div>

      {/* Non-negotiable Factual Warning */}
      <div className="p-4 bg-amber-950/40 border border-amber-800/80 rounded-xl flex items-start gap-3 text-xs text-amber-200">
        <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold text-amber-300">Pematuhan Pensejagatan Statutori:</div>
          <p className="leading-relaxed">
            Skrin ini adalah modul simulasi prototaip (DEMO_SYNTHETIC). Sistem ini tidak mengisytiharkan
            cawangan penaja ini sebagai cawangan yang telah sah didaftarkan di sisi undang-undang sehingga
            sijil pendaftaran rasmi berwarta dikeluarkan oleh ROS.
          </p>
        </div>
      </div>

      {/* Branch Selector Tabs */}
      <div className="flex items-center gap-2">
        {provisionalList.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => setSelectedBranchId(b.id)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeBranch.id === b.id
                ? 'bg-[#297E62] text-white font-bold shadow'
                : 'bg-[#111216] border border-stone-800 text-stone-400 hover:text-white'
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Main Readiness Gauge & KPI Panel */}
      <div className="p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase">Jawatankuasa Penaja</span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              {activeBranch.name}
            </h2>
            <div className="text-xs text-stone-400">
              Pengerusi Penaja: <strong className="text-stone-200">{activeBranch.chairmanName}</strong> ·
              Daerah: {activeBranch.district}
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-2xl font-bold font-mono text-[#FFF100]">{readinessPercent}%</div>
            <div className="text-xs text-stone-400 font-mono">
              {completedCount} daripada {totalCount} Syarat Selesai
            </div>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-stone-400">Tahap Kesiapsiagaan Berkas Pendaftaran:</span>
            <span className="text-white font-bold">{readinessPercent}% Selesai</span>
          </div>
          <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden border border-stone-800">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-[#FFF100] to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${readinessPercent}%` }}
            />
          </div>
        </div>

        {/* Member Threshold Live Counter with Interactive Demo Increment */}
        <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[#FFF100]" />
              <span>Ambang Keahlian Minimum Penubuhan (Syarat Wajib ROS)</span>
            </div>
            <div className="text-xs text-stone-300 font-mono">
              Terkumpul: <strong className="text-emerald-400 font-bold">{activeBranch.readiness.currentMembers}</strong> /{' '}
              {activeBranch.readiness.requiredMembers} Ahli
              {activeBranch.readiness.currentMembers >= activeBranch.readiness.requiredMembers ? (
                <span className="text-emerald-400 ml-2 font-sans font-bold">
                  (Ambang 30 Ahli Dicapai!)
                </span>
              ) : (
                <span className="text-amber-400 ml-2 font-sans">
                  (Perlu {activeBranch.readiness.requiredMembers - activeBranch.readiness.currentMembers} lagi ahli berdaftar)
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddDemoMember}
            className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded border border-stone-700 flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-[#FFF100]" />
            <span>Simulasi Tambah 1 Ahli Berdaftar</span>
          </button>
        </div>

        {/* The 6 Statutori Checkpoints (Interactive) */}
        <div className="space-y-3 pt-2">
          <div className="text-xs font-mono uppercase text-stone-400">
            Senarai Semak 6 Perkara Penubuhan Cawangan (Klik untuk kemaskini status):
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeBranch.readiness.checkpoints.map((cp) => (
              <div
                key={cp.id}
                onClick={() => handleToggleCheckpoint(cp.id)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all flex items-start gap-3 ${
                  cp.completed
                    ? 'bg-emerald-950/20 border-emerald-800/80 hover:border-emerald-600'
                    : 'bg-stone-900/40 border-stone-800 hover:border-stone-700'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {cp.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Clock className="w-4 h-4 text-stone-500" />
                  )}
                </div>

                <div className="space-y-0.5 text-xs">
                  <div className={`font-semibold ${cp.completed ? 'text-white' : 'text-stone-300'}`}>
                    {cp.label}
                  </div>
                  <div className="text-[11px] text-stone-400">{cp.statusNote}</div>
                  {cp.verificationDate && (
                    <div className="text-[10px] font-mono text-emerald-400 pt-0.5">
                      Disahkan pada: {cp.verificationDate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
