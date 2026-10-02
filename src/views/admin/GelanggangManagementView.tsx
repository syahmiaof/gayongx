import React, { useState } from 'react';
import { GELANGGANG_LIST } from '../../data/seedData';
import { GelanggangRecord } from '../../types';
import { Building2, Plus, MapPin, Users, Phone, Clock, Eye, X } from 'lucide-react';

export const GelanggangManagementView: React.FC = () => {
  const [list, setList] = useState<GelanggangRecord[]>(GELANGGANG_LIST);
  const [selectedGelanggang, setSelectedGelanggang] = useState<GelanggangRecord | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="text-xs font-mono text-[#297E62] uppercase tracking-wider font-bold">
            Pusat Latihan Berkanun
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Pengurusan Gelanggang Silat Seni Gayong
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Pentauliahan tapak latihan, pelantikan ketua jurulatih gelanggang, dan pemantauan jumlah pelatih aktif.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert('Borang permohonan pembukaan gelanggang baru dibuka.')}
          className="px-4 py-2 bg-[#297E62] hover:bg-[#20664f] text-white text-xs font-bold rounded-md shadow flex items-center gap-1.5 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tauliah Gelanggang Baharu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((gel) => (
          <div
            key={gel.id}
            className="p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between border-b border-stone-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    {gel.cawanganName}
                  </span>
                  <h3 className="text-lg font-bold text-white font-serif">{gel.name}</h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  {gel.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D71F26] shrink-0 mt-0.5" />
                  <span>{gel.locationAddress}</span>
                </div>
                <div className="p-2.5 bg-stone-900/60 rounded border border-stone-800">
                  <div>
                    <span className="text-stone-500">Ketua Jurulatih: </span>
                    <strong className="text-white">{gel.leadTrainer}</strong>
                  </div>
                  <div className="text-[11px] text-stone-400 pt-0.5">
                    Hubungi: {gel.contactNumber}
                  </div>
                </div>

                <div className="text-[11px] text-stone-400">
                  <div className="text-stone-500 uppercase font-mono text-[10px]">Jadual Mingguan:</div>
                  <ul className="list-disc list-inside mt-0.5 space-y-0.5">
                    {gel.trainingSchedule.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold">{gel.activeStudentsCount} Murid Aktif</span>
              <button
                type="button"
                onClick={() => setSelectedGelanggang(gel)}
                className="text-[#FFF100] hover:underline flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Maklumat Penuh</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedGelanggang && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#14161c] border border-stone-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-bold text-white font-serif">
                {selectedGelanggang.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedGelanggang(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div>
                <span className="text-stone-500">Cawangan Naungan:</span>
                <div className="font-semibold text-white">{selectedGelanggang.cawanganName}</div>
              </div>
              <div>
                <span className="text-stone-500">Lokasi:</span>
                <div className="text-stone-200">{selectedGelanggang.locationAddress}</div>
              </div>
              <div>
                <span className="text-stone-500">Ketua Jurulatih:</span>
                <div className="text-white font-bold">{selectedGelanggang.leadTrainer}</div>
              </div>
              <div>
                <span className="text-stone-500">Tahun Ditubuhkan:</span>
                <div className="font-mono text-stone-300">{selectedGelanggang.establishedYear}</div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedGelanggang(null)}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
