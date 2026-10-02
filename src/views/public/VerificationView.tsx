import React, { useState } from 'react';
import { SYNTHETIC_MEMBERS_LIST } from '../../data/seedData';
import { MemberRecord } from '../../types';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { Search, ShieldCheck, AlertCircle, UserCheck, Calendar, Award } from 'lucide-react';

interface Props {
  onNavigate: (path: string) => void;
}

export const VerificationView: React.FC<Props> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('PSSGM-PK-DEMO-00281');
  const [searchResult, setSearchResult] = useState<MemberRecord | null>(
    SYNTHETIC_MEMBERS_LIST[0]
  );
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    const clean = searchTerm.trim().toLowerCase();
    const found = SYNTHETIC_MEMBERS_LIST.find(
      (m) =>
        m.membershipNumber.toLowerCase().includes(clean) ||
        m.fullName.toLowerCase().includes(clean) ||
        m.maskedIc.includes(clean)
    );
    setSearchResult(found || null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10 text-left">
      {/* Header */}
      <div className="space-y-3 border-b border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#FFF100] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verifikasi Keabsahan Dalam Talian</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
          Semakan Status Keahlian &amp; Tauliah Silat Seni Gayong Perak
        </h1>
        <p className="text-stone-300 text-sm leading-relaxed max-w-2xl">
          Sistem semakan berpusat bagi mengesahkan kesahihan nombor keahlian pesilat dan status
          bengkong rasmi di bawah naungan PSSGM Bahagian Negeri Perak.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="p-6 bg-[#111216] border border-stone-800 rounded-xl space-y-4">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-stone-300">
            Masukkan Nombor Keahlian atau Nama Penuh:
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-500 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Contoh: PSSGM-PK-DEMO-00281 atau Ahmad Firdaus"
                className="w-full pl-9 pr-4 py-2.5 bg-stone-900 border border-stone-800 rounded-md text-white font-mono text-xs focus:outline-none focus:border-stone-600"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#D71F26] hover:bg-[#b8171d] text-white text-xs font-bold rounded-md transition-colors"
            >
              Semak Rekod
            </button>
          </div>
        </div>

        <div className="text-[11px] text-stone-500 flex flex-wrap items-center gap-2">
          <span>Contoh Nombor Demo:</span>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('PSSGM-PK-DEMO-00281');
              setSearchResult(SYNTHETIC_MEMBERS_LIST[0]);
            }}
            className="text-[#FFF100] underline font-mono"
          >
            PSSGM-PK-DEMO-00281 (Aktif)
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('PSSGM-PK-DEMO-00211');
              const item = SYNTHETIC_MEMBERS_LIST.find((m) => m.membershipNumber === 'PSSGM-PK-DEMO-00211');
              setSearchResult(item || null);
            }}
            className="text-stone-400 underline font-mono"
          >
            PSSGM-PK-DEMO-00211 (Tamat Tempoh)
          </button>
        </div>
      </form>

      {/* Search Result Output */}
      {searched && searchResult && (
        <div className="p-6 bg-[#13151b] border border-stone-800 rounded-xl space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-800 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#D4AF37] uppercase">
                Rekod Sah Ditemui
              </span>
              <h2 className="text-2xl font-serif font-bold text-white">
                {searchResult.fullName}
              </h2>
              <div className="text-xs font-mono text-stone-400">
                No. Keahlian: <strong className="text-white">{searchResult.membershipNumber}</strong>
              </div>
            </div>

            <div className="text-right space-y-1">
              <span
                className={`inline-block px-3 py-1 rounded text-xs font-bold font-mono ${
                  searchResult.status === 'Aktif'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}
              >
                Status: {searchResult.status}
              </span>
              <div className="text-[11px] text-stone-500 font-mono">
                Sah Sehingga: {searchResult.expiryDate}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
              <span className="text-stone-500">Taraf Keahlian:</span>
              <div className="font-semibold text-white">{searchResult.membershipCategory}</div>
            </div>

            <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
              <span className="text-stone-500">Bengkong Semasa:</span>
              <div className="font-semibold text-[#FFF100]">{searchResult.currentBengkongName}</div>
            </div>

            <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
              <span className="text-stone-500">Cawangan:</span>
              <div className="font-semibold text-white">{searchResult.cawanganName}</div>
            </div>

            <div className="p-3 bg-stone-900/60 rounded border border-stone-800 space-y-1">
              <span className="text-stone-500">Pusat Latihan (Gelanggang):</span>
              <div className="font-semibold text-white">{searchResult.gelanggangName}</div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-xs">
            <DataProvenanceBadge provenance={searchResult.dataProvenance} />
            <button
              type="button"
              onClick={() => onNavigate('/portal')}
              className="text-[#FFF100] hover:underline font-semibold"
            >
              Akses Portal Ahli &rarr;
            </button>
          </div>
        </div>
      )}

      {searched && !searchResult && (
        <div className="p-8 bg-stone-900/40 border border-stone-800 rounded-xl text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="text-base font-bold text-white">Tiada Rekod Ditemui</h3>
          <p className="text-xs text-stone-400 max-w-sm mx-auto">
            Nombor keahlian atau nama yang dimasukkan tiada dalam pangkalan data. Sila pastikan ejaan
            betul atau hubungi urusetia cawangan anda.
          </p>
        </div>
      )}
    </div>
  );
};
