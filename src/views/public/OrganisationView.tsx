import React from 'react';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { VERIFIED_ORGANISATION_INFO, ORGANISATION_STRUCTURE } from '../../data/seedData';
import { ShieldCheck, Network, Award, Calendar, CheckCircle2, ChevronRight, User } from 'lucide-react';

export const OrganisationView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-4 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
          <Network className="w-4 h-4 text-[#D71F26]" />
          <span>Struktur Kepimpinan &amp; Tadbir Urus</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
          Pertubuhan Silat Seni Gayong Malaysia Bahagian Negeri Perak
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Tadbir urus berkanun yang memayungi cawangan daerah dan gelanggang latihan di seluruh Negeri
          Perak. Setiap jawatan adalah tertakluk kepada keputusan Mesyuarat Agung Bahagian dan warta
          Jabatan Pendaftaran Pertubuhan Malaysia (ROS).
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
          <span className="text-[#FFF100] font-semibold bg-stone-900 px-3 py-1 rounded border border-stone-800">
            {VERIFIED_ORGANISATION_INFO.statePpm}
          </span>
          <span className="text-stone-400">
            Terakhir Disemak:{' '}
            <strong className="text-stone-200">{ORGANISATION_STRUCTURE.verifiedDate}</strong>
          </span>
        </div>
      </div>

      {/* State Executive Council Card */}
      <section className="p-6 sm:p-8 bg-[#121419] border border-stone-800 rounded-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-800 pb-4">
          <div>
            <div className="text-xs font-mono text-[#D71F26] uppercase">Peringkat Negeri</div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Majlis Jawatankuasa Bahagian Negeri Perak
            </h2>
          </div>
          <DataProvenanceBadge provenance={ORGANISATION_STRUCTURE.dataProvenance} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-[#FFF100] uppercase">Badan Pentadbiran</span>
            <div className="text-base font-bold text-white">Jawatankuasa Eksekutif Bahagian Perak</div>
            <p className="text-xs text-stone-400">
              Menyelaras operasi pendaftaran, hal ehwal undang-undang, kewangan dan penganjuran takwim
              tahunan negeri.
            </p>
          </div>

          <div className="p-4 bg-stone-900/80 border border-stone-800 rounded-lg space-y-1">
            <span className="text-[10px] font-mono text-emerald-400 uppercase">Badan Keilmuan &amp; Adab</span>
            <div className="text-base font-bold text-white">Lembaga Gurulatih PSSGM Bahagian Negeri Perak</div>
            <p className="text-xs text-stone-400">
              Mengawasi ketulenan silibus Gayong, pensijilan, ujian kenaikan bengkong, dan kelayakan gurulatih gelanggang.
            </p>
          </div>
        </div>
      </section>

      {/* Hierarchical Organisation Explorer */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-[#297E62] uppercase tracking-wider">
            Hierarki Bertingkat
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            Rangkaian Bahagian &amp; Cawangan Daerah
          </h3>
          <p className="text-xs text-stone-400">
            Penurunan kuasa tadbir urus dari PSSGM Bahagian Negeri Perak kepada cawangan daerah berwarta
            dan gelanggang-gelanggang naungannya.
          </p>
        </div>

        <div className="space-y-4">
          {ORGANISATION_STRUCTURE.children?.map((cawangan) => (
            <div
              key={cawangan.id}
              className="p-6 bg-[#111216] border border-stone-800 rounded-lg space-y-4 hover:border-stone-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase text-stone-400 tracking-wider">
                    {cawangan.unitType}
                  </span>
                  <h4 className="text-lg font-bold text-white font-serif">{cawangan.title}</h4>
                </div>
                <DataProvenanceBadge provenance={cawangan.dataProvenance} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="text-stone-300">
                  <span className="text-stone-500">Pucuk Pimpinan: </span>
                  <span className="text-white font-semibold">{cawangan.name}</span>
                </div>
                <div className="text-stone-300">
                  <span className="text-stone-500">Peranan: </span>
                  <span>{cawangan.role}</span>
                </div>
              </div>

              {/* Sub Gelanggang Units */}
              {cawangan.children && cawangan.children.length > 0 && (
                <div className="mt-3 pt-3 border-t border-stone-800/80">
                  <div className="text-[11px] font-mono text-stone-400 mb-2 uppercase">
                    Gelanggang Latihan Di Bawah Naungan:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cawangan.children.map((gel) => (
                      <div
                        key={gel.id}
                        className="p-2.5 bg-stone-900/60 rounded border border-stone-800 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-semibold text-white">{gel.title}</div>
                          <div className="text-[11px] text-stone-400">
                            {gel.name} ({gel.bengkong})
                          </div>
                        </div>
                        <DataProvenanceBadge provenance={gel.dataProvenance} compact={true} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Date-bound disclaimer */}
      <div className="p-4 bg-stone-900/40 border border-stone-800 rounded-md text-xs text-stone-400 space-y-1 font-mono">
        <div className="text-stone-300 font-semibold">Integriti Rekod Organisasi:</div>
        <p>
          Susunan kepimpinan dipaparkan dengan tarikh semakan (Last Verified: 2024-12-31). Sebarang pertukaran
          pemegang jawatan tertakluk kepada pengesahan rasmi ROS dan kelulusan Mesyuarat Agung.
        </p>
      </div>
    </div>
  );
};
