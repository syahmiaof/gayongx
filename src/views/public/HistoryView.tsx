import React from 'react';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { HISTORICAL_TIMELINE, VERIFIED_ORGANISATION_INFO } from '../../data/seedData';
import { ShieldCheck, Calendar, MapPin, Landmark, Award, BookOpen, Quote } from 'lucide-react';

export const HistoryView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-16 text-left">
      {/* Editorial Header */}
      <div className="space-y-4 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
          <Landmark className="w-4 h-4 text-[#D71F26]" />
          <span>Arkib Warisan &amp; Pensejarahan Gayong</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight text-balance">
          Sejarah Silat Seni Gayong di Negeri Perak: Mercu Tanda Air Kuning 1964 &amp; 1971
        </h1>
        <p className="text-stone-300 text-base leading-relaxed max-w-3xl">
          Perak Darul Ridzuan menduduki kedudukan teristimewa dalam lipatan sejarah Silat Seni Gayong.
          Di Air Kuning, Taiping inilah sistem tingkatan bengkong disusun secara berperingkat pada tahun 1964,
          dan di sini jugalah berdirinya Pusat Latihan Tertinggi Silat Seni Gayong Malaysia dan Serantau
          yang dirasmikan pada 27 Januari 1971.
        </p>
        <div className="pt-2">
          <DataProvenanceBadge
            provenance={{
              dataOrigin: 'DEMO_SYNTHETIC',
              sourceName: 'Warta Perasmian Rasmi 1971 & Catatan Statutori Gayong Perak',
              lastVerifiedAt: '2024-12-31',
            }}
          />
        </div>
      </div>

      {/* Featured Editorial Story: Air Kuning 1964 & 1971 */}
      <section className="bg-[#121419] border border-stone-800 rounded-xl p-6 sm:p-10 space-y-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFF100]">
          <Award className="w-4 h-4" />
          <span>Fakta Bersejarah Utama</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
          Pusat Latihan Tertinggi Silat Seni Gayong Malaysia dan Serantau
        </h2>

        <div className="prose prose-invert max-w-none text-stone-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            Sebelum tahun 1964, pengajaran seni silat di Nusantara lazimnya disampaikan secara tidak
            berjadual dan bergantung kepada petua lisan gurulatih. Walau bagaimanapun, perkembangan pesat
            Silat Seni Gayong menuntut satu sistem penilaian keilmuan yang adil, bertaraf dunia, dan tersusun.
          </p>

          <p>
            Maka pada tahun <strong className="text-white">1964 di Air Kuning, Taiping</strong>, sistem pemakaian
            bengkong berasaskan warna dan cula telah dimantapkan secara formal. Setiap warna bengkong bermula dari
            Hitam Mulus, Awan Putih, Pelangi Hijau, Pelangi Merah, Pelangi Kuning, hinggalah ke peringkat Harimau
            Berantai dan Cula Tertinggi membawa maksud falsafah tersendiri yang memandu rohani dan fizikal murid.
          </p>

          <div className="my-6 p-5 bg-stone-900/90 border-l-4 border-[#D71F26] rounded-r-lg">
            <Quote className="w-5 h-5 text-[#D71F26] mb-2" />
            <p className="text-sm font-serif italic text-stone-200">
              &quot;Pada 27 Januari 1971, bumi Air Kuning Taiping sekali lagi memahat sejarah apabila Pusat Latihan
              Tertinggi Silat Seni Gayong Malaysia dan Serantau dirasmikan secara rasmi sebagai pangkalan latihan
              induk serantau, melahirkan puluhan ribu pendekar dan gurulatih yang berbakti kepada tanah air.&quot;
            </p>
            <div className="text-[11px] text-stone-400 font-mono mt-2">
              — Catatan Warta Perasmian Pusat Latihan Tertinggi Air Kuning (27 Januari 1971)
            </div>
          </div>

          <p>
            Kini, di bawah tadbir urus moden Pertubuhan Silat Seni Gayong Malaysia Bahagian Negeri Perak
            (PPM-010-04-09042013-000034), legasi Air Kuning terus dipelihara melalui pengekalan ketulenan
            sukatan pelajaran, pentauliahan guru bertauliah, dan penganjuran majlis-majlis peringatan warisan
            secara berkala.
          </p>
        </div>
      </section>

      {/* Interactive Chronology Timeline */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono text-[#297E62] uppercase tracking-wider">
            Garis Masa Kronologi
          </div>
          <h3 className="text-2xl font-serif font-bold text-white">
            Rentetan Peristiwa Bersejarah Gayong di Perak
          </h3>
        </div>

        <div className="space-y-4">
          {HISTORICAL_TIMELINE.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-[#111216] border border-stone-800 rounded-lg space-y-3 hover:border-stone-700 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-serif font-bold text-[#FFF100] font-mono">
                    {item.year}
                  </span>
                  {item.dateExact && (
                    <span className="text-xs text-stone-400 font-mono bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                      {item.dateExact}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#D71F26]" />
                  <span>{item.location}</span>
                </div>
              </div>

              <h4 className="text-base font-bold text-white">{item.title}</h4>
              <p className="text-xs text-stone-300 leading-relaxed">{item.fullNarrative}</p>

              <div className="pt-2 text-xs text-[#D4AF37] font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Kepentingan: {item.significance}</span>
              </div>

              <div className="pt-2 flex justify-end">
                <DataProvenanceBadge provenance={item.dataProvenance} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Factual Disclaimer */}
      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-md text-xs text-stone-400 space-y-1 font-mono">
        <div className="text-stone-300 font-bold">Nota Ketetapan Fakta Sejarah:</div>
        <p>
          Maklumat pensejarahan di laman ini terhad khusus kepada perkembangan Silat Seni Gayong di Negeri
          Perak dan peranan Air Kuning mengikut rekod berwarta. Rekod ini tidak mencampuradukkan entiti
          atau cawangan luar yang bukan di bawah bidang kuasa Pertubuhan Silat Seni Gayong Malaysia
          Bahagian Negeri Perak (PPM-010-04-09042013-000034).
        </p>
      </div>
    </div>
  );
};

