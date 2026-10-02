import React, { useState } from 'react';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { GELANGGANG_LIST } from '../../data/seedData';
import { MapPin, Search, Phone, Calendar, Clock, UserCheck, Shield } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const GelanggangView: React.FC<Props> = ({ onNavigate }) => {
  const [districtFilter, setDistrictFilter] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = GELANGGANG_LIST.filter((g) => {
    const matchDistrict =
      districtFilter === 'all' || g.district.toLowerCase().includes(districtFilter.toLowerCase());
    const matchSearch =
      query === '' ||
      g.name.toLowerCase().includes(query.toLowerCase()) ||
      g.leadTrainer.toLowerCase().includes(query.toLowerCase()) ||
      g.locationAddress.toLowerCase().includes(query.toLowerCase());
    return matchDistrict && matchSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-4 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-[#297E62] uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-[#D71F26]" />
          <span>Pusat Latihan Rasmi</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
          Direktori Gelanggang Silat Seni Gayong Perak
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Cari pusat latihan dan gelanggang silat bertauliah di seluruh daerah Negeri Perak. Setiap
          gelanggang dikelolakan oleh gurulatih bertauliah PSSGM yang mematuhi kurikulum rasmi.
        </p>

        {/* Filter Controls */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari nama gelanggang, lokasi atau jurulatih..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-stone-900 border border-stone-800 rounded-md text-xs text-white placeholder-stone-500 focus:outline-none focus:border-stone-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setDistrictFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                districtFilter === 'all'
                  ? 'bg-white text-stone-900 font-semibold'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              Semua Daerah
            </button>
            <button
              type="button"
              onClick={() => setDistrictFilter('Batang Padang')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                districtFilter === 'Batang Padang'
                  ? 'bg-[#297E62] text-white font-semibold'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              Batang Padang (Tapah/Bidor)
            </button>
            <button
              type="button"
              onClick={() => setDistrictFilter('Manjung')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                districtFilter === 'Manjung'
                  ? 'bg-[#297E62] text-white font-semibold'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              Manjung (Seri Manjung/Sitiawan)
            </button>
            <button
              type="button"
              onClick={() => setDistrictFilter('Larut')}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                districtFilter === 'Larut'
                  ? 'bg-[#297E62] text-white font-semibold'
                  : 'bg-stone-800 text-stone-400 hover:text-white'
              }`}
            >
              Taiping / Air Kuning
            </button>
          </div>
        </div>
      </div>

      {/* Gelanggang Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((gel) => (
          <div
            key={gel.id}
            className="p-6 bg-[#111216] border border-stone-800 hover:border-stone-700 rounded-xl space-y-4 flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    {gel.cawanganName}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white">{gel.name}</h3>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-2 py-0.5 rounded">
                    {gel.status}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2 text-stone-300">
                  <MapPin className="w-4 h-4 text-[#D71F26] shrink-0 mt-0.5" />
                  <span>{gel.locationAddress}</span>
                </div>

                <div className="p-3 bg-stone-900/60 rounded border border-stone-800/80 space-y-1">
                  <div>
                    <span className="text-stone-500">Ketua Jurulatih: </span>
                    <strong className="text-white">{gel.leadTrainer}</strong>
                  </div>
                  {gel.assistantTrainer && (
                    <div>
                      <span className="text-stone-500">Penolong: </span>
                      <span className="text-stone-300">{gel.assistantTrainer}</span>
                    </div>
                  )}
                  <div className="text-[11px] text-stone-400 flex items-center gap-1.5 pt-1">
                    <Phone className="w-3.5 h-3.5 text-stone-500" />
                    <span>Hubungi Gelanggang: {gel.contactNumber}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-mono text-stone-400 uppercase">
                    Jadual Latihan Rasmi:
                  </div>
                  <div className="space-y-1">
                    {gel.trainingSchedule.map((sch, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[11px] text-stone-300 bg-stone-900/40 px-2.5 py-1 rounded"
                      >
                        <Clock className="w-3 h-3 text-[#FFF100] shrink-0" />
                        <span>{sch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-mono text-[11px]">
                {gel.activeStudentsCount} Murid Berdaftar · Ditubuhkan {gel.establishedYear}
              </span>
              <button
                type="button"
                onClick={() => onNavigate('/sertai')}
                className="px-3 py-1.5 bg-[#D71F26] hover:bg-[#b8171d] text-white rounded font-medium transition-colors"
              >
                Daftar Pelatih &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
