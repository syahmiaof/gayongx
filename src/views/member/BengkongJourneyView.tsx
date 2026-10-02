import React, { useState } from 'react';
import { SYNTHETIC_PRIMARY_MEMBER, BENGKONG_SYLLABUS } from '../../data/seedData';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import {
  Award,
  CheckCircle2,
  Lock,
  Clock,
  BookOpen,
  Calendar,
  Send,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

interface Props {
  onRequestPromotion?: () => void;
}

export const BengkongJourneyView: React.FC<Props> = ({ onRequestPromotion }) => {
  const member = SYNTHETIC_PRIMARY_MEMBER;
  const [requested, setRequested] = useState(false);

  const handleRequestPromotion = () => {
    setRequested(true);
    if (onRequestPromotion) {
      onRequestPromotion();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
            Laluan Peningkatan Martabat Gayong
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Perjalanan Bengkong &amp; Sukatan Silibus
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Rekod kemajuan penilaian dan pentauliahan tingkatan bengkong anda mengikut sukatan rasmi Air Kuning 1964.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#297E62] text-white rounded text-xs font-bold font-mono shadow">
            Tingkatan Semasa: Pelangi Hijau
          </span>
        </div>
      </div>

      {requested && (
        <div className="p-4 bg-amber-950/80 border border-amber-800 rounded-lg text-xs text-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-white">Permohonan Ujian Dihantar!</div>
              <div>
                Permohonan penilaian bagi <strong>Pelangi Merah</strong> telah dimajukan ke Lembaga
                Gurulatih PSSGM Bahagian Negeri Perak (ID Permohonan: APPR-002).
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRequested(false)}
            className="text-amber-400 hover:text-white"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Stepper Timeline: Completed, Current, Locked */}
      <div className="space-y-6">
        {member.bengkongJourney.map((step, idx) => {
          const isCompleted = step.status === 'COMPLETED';
          const isCurrent = step.status === 'CURRENT';
          const isLocked = step.status === 'LOCKED';
          const syllabusData = BENGKONG_SYLLABUS.find((b) => b.id === step.bengkongId);

          return (
            <div
              key={idx}
              className={`p-6 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-gradient-to-r from-[#111c16] via-[#12171c] to-[#121319] border-emerald-500 shadow-xl ring-1 ring-emerald-500/40'
                  : isCompleted
                  ? 'bg-[#111216] border-stone-800'
                  : 'bg-stone-950/60 border-stone-900 opacity-60'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full border border-black flex items-center justify-center font-bold text-xs shadow"
                    style={{
                      backgroundColor: syllabusData?.colorHex || '#333',
                      color: step.bengkongId === 'awan-putih' ? '#000' : '#fff',
                    }}
                  >
                    {idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-serif font-bold text-white">{step.name}</h3>
                      {isCurrent && (
                        <span className="px-2 py-0.2 text-[10px] font-bold bg-[#297E62] text-white rounded font-mono">
                          BENGKONG SEMASA
                        </span>
                      )}
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Disahkan Lulus</span>
                        </span>
                      )}
                      {isLocked && (
                        <span className="flex items-center gap-1 text-[11px] text-stone-500 font-mono">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Terkunci</span>
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-400 font-mono mt-0.5">
                      {syllabusData?.philosophy}
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs font-mono">
                  {step.attainedDate && (
                    <div className="text-emerald-400 font-bold">Tarikh: {step.attainedDate}</div>
                  )}
                  {step.certificateNo && (
                    <div className="text-stone-400 text-[11px]">Sijil: {step.certificateNo}</div>
                  )}
                </div>
              </div>

              {/* Syllabus Criteria & Examiner Info */}
              <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    Sukatan Mata Ujian:
                  </span>
                  <ul className="space-y-1.5 text-stone-300">
                    {syllabusData?.keySyllabus.map((syl, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 ${
                            isCompleted || isCurrent ? 'text-emerald-400' : 'text-stone-600'
                          }`}
                        />
                        <span>{syl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    Butiran Pengesahan / Lembaga Penilai:
                  </span>
                  <div className="p-3 bg-stone-900/60 rounded border border-stone-800 text-stone-300 space-y-1">
                    {step.examinerName && (
                      <div>
                        <span className="text-stone-500">Ketua Penguji: </span>
                        <span className="text-white font-medium">{step.examinerName}</span>
                      </div>
                    )}
                    {step.location && (
                      <div>
                        <span className="text-stone-500">Tempat Ujian: </span>
                        <span>{step.location}</span>
                      </div>
                    )}
                    {isCurrent && (
                      <div className="text-[11px] text-emerald-300 pt-1">
                        Status Latihan: Telah menyempurnakan tempoh matang 12 bulan dan memenuhi kriteria
                        untuk pencalonan Pelangi Merah.
                      </div>
                    )}
                    {isLocked && !step.attainedDate && (
                      <div className="text-[11px] text-stone-500">
                        Tertakluk kepada kelulusan ujian peringkat sebelumnya dan pentauliahan dewan gurulatih.
                      </div>
                    )}
                  </div>

                  {/* Interactive Button to Request Next Promotion */}
                  {isCurrent && (
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleRequestPromotion}
                        className="w-full py-2.5 bg-[#D71F26] hover:bg-[#b8171d] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                      >
                        <Award className="w-4 h-4" />
                        <span>Mohon Pencalonan Ujian Kenaikan Bengkong (Pelangi Merah)</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
