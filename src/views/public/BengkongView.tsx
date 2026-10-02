import React, { useState } from 'react';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { BENGKONG_SYLLABUS } from '../../data/seedData';
import { Award, BookOpen, Clock, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const BengkongView: React.FC<Props> = ({ onNavigate }) => {
  const [selectedBengkong, setSelectedBengkong] = useState(BENGKONG_SYLLABUS[0]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-4 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFF100] uppercase tracking-wider">
          <Award className="w-4 h-4 text-[#D71F26]" />
          <span>Kurikulum Pusaka Air Kuning 1964</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
          Sistem Tingkatan Bengkong Silat Seni Gayong
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Sistem tingkatan bengkong (tali pinggang) dan sukatan pembelajaran Silat Seni Gayong yang
          disusun secara berperingkat di Air Kuning pada tahun 1964. Setiap tingkatan melambangkan
          tahap kematangan fizikal, ketajaman rohani, dan penghayatan adab persilatan Melayu.
        </p>
        <div className="pt-2">
          <DataProvenanceBadge
            provenance={{
              dataOrigin: 'DEMO_SYNTHETIC',
              sourceName: 'Sukatan Asal Air Kuning 1964 & Warta Kurikulum Rasmi PSSGM',
              lastVerifiedAt: '2024-12-31',
            }}
          />
        </div>
      </div>

      {/* Bengkong Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {BENGKONG_SYLLABUS.map((b) => {
          const isSelected = selectedBengkong.id === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => setSelectedBengkong(b)}
              className={`p-3 rounded-lg border text-left transition-all ${
                isSelected
                  ? 'bg-stone-900 border-[#FFF100] shadow-md ring-1 ring-[#FFF100]/50'
                  : 'bg-[#111216] border-stone-800 hover:border-stone-700'
              }`}
            >
              <div
                className="w-full h-2.5 rounded-full mb-2 shadow-inner border border-black/40"
                style={{ backgroundColor: b.colorHex }}
              />
              <div className="text-[10px] font-mono text-stone-500 uppercase">Tingkat {b.levelOrder}</div>
              <div className={`text-xs font-bold ${isSelected ? 'text-[#FFF100]' : 'text-white'} truncate`}>
                {b.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Syllabus View for Selected Bengkong */}
      <div className="p-6 sm:p-8 bg-[#121419] border border-stone-800 rounded-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="flex items-center gap-4">
            <div
              className="w-8 h-8 rounded-full border border-black shadow"
              style={{ backgroundColor: selectedBengkong.colorHex }}
            />
            <div>
              <span className="text-xs font-mono text-[#D4AF37] uppercase">
                Tingkatan {selectedBengkong.levelOrder} · {selectedBengkong.colorName}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                {selectedBengkong.name}
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono text-stone-400 bg-stone-900 px-3 py-1.5 rounded border border-stone-800">
              Tempoh Minima: <strong className="text-white">{selectedBengkong.minimumDurationMonths} Bulan</strong>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Deskripsi & Falsafah */}
          <div className="space-y-4">
            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase text-stone-400 tracking-wider">
                Falsafah &amp; Makna Keilmuan
              </h4>
              <p className="text-sm text-stone-200 leading-relaxed italic border-l-2 border-[#D71F26] pl-3 py-1">
                &quot;{selectedBengkong.philosophy}&quot;
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-xs font-mono uppercase text-stone-400 tracking-wider">
                Penerangan Peringkat
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedBengkong.description}
              </p>
            </div>
          </div>

          {/* Right: Sukatan Silibus & Ujian */}
          <div className="space-y-3 bg-stone-900/60 p-5 rounded-lg border border-stone-800">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Sukatan Pelajaran &amp; Bahan Ujian:</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-200">
              {selectedBengkong.keySyllabus.map((syl, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#297E62] shrink-0 mt-0.5" />
                  <span>{syl}</span>
                </li>
              ))}
            </ul>

            <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400">
              Ujian kenaikan bengkong dikendalikan secara berkala oleh Lembaga Gurulatih PSSGM Bahagian Negeri Perak.
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-stone-400">
            Pesilat berdaftar boleh menyemak kelayakan kenaikan bengkong melalui Portal Ahli.
          </span>
          <button
            type="button"
            onClick={() => onNavigate('/portal/bengkong')}
            className="text-[#FFF100] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Buka Perjalanan Bengkong di Portal Ahli</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

