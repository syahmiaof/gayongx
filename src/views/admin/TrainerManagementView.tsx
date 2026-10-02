import React from 'react';
import { GraduationCap, Award, MapPin, CheckCircle2, Shield } from 'lucide-react';

export const TrainerManagementView: React.FC = () => {
  const trainers = [
    {
      id: 'g-01',
      name: 'Cikgu Mohd Razif bin Hassan',
      bengkong: 'Cula Merah (Pelangi Merah Cula 2)',
      cawangan: 'Cawangan Daerah Batang Padang',
      gelanggang: 'Gelanggang Demo Tapah',
      qualification: 'Tauliah Jurulatih Kanan Negeri Perak (Siri 2018)',
      yearsExperience: 14,
      status: 'Bertauliah Aktif',
    },
    {
      id: 'g-02',
      name: 'Cikgu Kamaruddin bin Othman',
      bengkong: 'Cula Hitam Harimau (Tertinggi)',
      cawangan: 'Cawangan Seladang Berjuang, Manjung',
      gelanggang: 'Gelanggang Sri Seladang Seri Manjung',
      qualification: 'Tauliah Dewan Gurulatih PSSGM Pusat & Negeri',
      yearsExperience: 28,
      status: 'Bertauliah Aktif',
    },
    {
      id: 'g-03',
      name: 'Cikgu Hashim bin Ahmad',
      bengkong: 'Pelangi Merah',
      cawangan: 'Cawangan Daerah Batang Padang',
      gelanggang: 'Gelanggang Komuniti Bidor',
      qualification: 'Tauliah Jurulatih Asas Gelanggang',
      yearsExperience: 9,
      status: 'Bertauliah Aktif',
    },
    {
      id: 'g-04',
      name: 'Cikgu Megat Abdullah',
      bengkong: 'Pelangi Kuning',
      cawangan: 'Jawatankuasa Penaja Larut Matang',
      gelanggang: 'Gelanggang Warisan Air Kuning',
      qualification: 'Pemegang Amanah Warisan Air Kuning Taiping',
      yearsExperience: 22,
      status: 'Bertauliah Aktif',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider font-bold">
            Dewan Gurulatih &amp; Penilai
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Direktori Gurulatih Bertauliah PSSGM Perak
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Senarai gurulatih yang memegang tauliah mengajar rasmi daripada Lembaga Gurulatih PSSGM
            Bahagian Negeri Perak.
          </p>
        </div>

        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded">
          14 Gurulatih Bertauliah
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainers.map((t) => (
          <div
            key={t.id}
            className="p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono text-[#FFF100] uppercase font-bold">
                    {t.bengkong}
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif">{t.name}</h3>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 rounded">
                  {t.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-stone-300">
                <div>
                  <span className="text-stone-500">Cawangan: </span>
                  <span className="text-white font-medium">{t.cawangan}</span>
                </div>
                <div>
                  <span className="text-stone-500">Pusat Latihan: </span>
                  <span>{t.gelanggang}</span>
                </div>
                <div>
                  <span className="text-stone-500">Kelayakan Tauliah: </span>
                  <span className="text-stone-300">{t.qualification}</span>
                </div>
                <div className="text-[11px] font-mono text-stone-400 pt-1">
                  Pengalaman Mengajar: {t.yearsExperience} Tahun
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-500 font-mono text-[10px]">ID: {t.id}</span>
              <button
                type="button"
                onClick={() => alert(`Rekod tauliah rasmi ${t.name} disahkan sah.`)}
                className="text-xs text-[#FFF100] hover:underline font-semibold"
              >
                Semak Dokumen Tauliah &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
