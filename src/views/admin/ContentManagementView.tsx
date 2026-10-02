import React, { useState } from 'react';
import { FileCode, Plus, Check, Clock, Edit2, Trash2, Eye } from 'lucide-react';

interface ContentItem {
  id: string;
  section: 'Hero' | 'Berita' | 'Program' | 'Galeri' | 'Sejarah' | 'Organisasi' | 'Muat Turun' | 'Hubungi';
  title: string;
  status: 'Diterbitkan' | 'Draf' | 'Dijadualkan';
  lastUpdated: string;
  author: string;
}

export const ContentManagementView: React.FC = () => {
  const [items, setItems] = useState<ContentItem[]>([
    {
      id: 'cms-1',
      section: 'Hero',
      title: 'Tajuk Utama Laman: Memartabatkan Pusaka Gayong di Bumi Berdaulat Perak',
      status: 'Diterbitkan',
      lastUpdated: '2026-09-28 11:20',
      author: 'Setiausaha Negeri',
    },
    {
      id: 'cms-2',
      section: 'Sejarah',
      title: 'Sorotan Warisan: Air Kuning Taiping 1964 & 1971',
      status: 'Diterbitkan',
      lastUpdated: '2026-09-20 15:45',
      author: 'Lajnah Sejarah',
    },
    {
      id: 'cms-3',
      section: 'Berita',
      title: 'Warta Perasmian Portal Digital Berpusat Perak',
      status: 'Diterbitkan',
      lastUpdated: '2026-09-25 09:10',
      author: 'Biro Penerangan',
    },
    {
      id: 'cms-4',
      section: 'Program',
      title: 'Pengumuman Majlis Mandi Minyak Siri 2027',
      status: 'Dijadualkan',
      lastUpdated: '2026-09-29 16:00',
      author: 'Urusetia Takwim',
    },
    {
      id: 'cms-5',
      section: 'Muat Turun',
      title: 'Pindaan Borang Permohonan Kenaikan Bengkong UKB-01',
      status: 'Draf',
      lastUpdated: '2026-09-30 14:15',
      author: 'Lembaga Gurulatih',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState<'all' | 'Diterbitkan' | 'Draf' | 'Dijadualkan'>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filtered = items.filter((i) => activeFilter === 'all' || i.status === activeFilter);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus =
            item.status === 'Diterbitkan'
              ? 'Draf'
              : item.status === 'Draf'
              ? 'Dijadualkan'
              : 'Diterbitkan';
          return { ...item, status: nextStatus, lastUpdated: new Date().toLocaleString() };
        }
        return item;
      })
    );
    setSuccessToast(`Status kandungan dikemaskini.`);
    setTimeout(() => setSuccessToast(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="text-xs font-mono text-[#FFF100] uppercase tracking-wider font-bold">
            Sistem Pengurusan Kandungan Web (CMS)
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Pengurusan Kandungan Ekosistem Rasmi
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Kemaskini artikel warta, tajuk hero, galeri foto arkib, takwim dan dokumen muat turun awam.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-stone-900 p-1 rounded-lg border border-stone-800">
          {(['all', 'Diterbitkan', 'Dijadualkan', 'Draf'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setActiveFilter(st)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                activeFilter === st
                  ? 'bg-stone-800 text-white font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              {st === 'all' ? 'Semua' : st}
            </button>
          ))}
        </div>
      </div>

      {successToast && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-xs text-emerald-200">
          {successToast}
        </div>
      )}

      {/* Content Table */}
      <div className="bg-[#111216] border border-stone-800 rounded-xl overflow-hidden shadow-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-stone-900/80 border-b border-stone-800 text-stone-400 font-mono text-[11px]">
            <tr>
              <th className="p-3.5">Bahagian &amp; Tajuk Kandungan</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Penulis / Urusetia</th>
              <th className="p-3.5">Kemaskini Terakhir</th>
              <th className="p-3.5 text-right">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-800/80 text-stone-300">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-stone-900/40 transition-colors">
                <td className="p-3.5">
                  <div className="text-[10px] font-mono text-[#FFF100] uppercase font-bold">
                    {item.section}
                  </div>
                  <div className="text-sm font-bold text-white mt-0.5">{item.title}</div>
                </td>
                <td className="p-3.5">
                  <button
                    type="button"
                    onClick={() => toggleStatus(item.id)}
                    title="Klik untuk tukar status"
                    className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer transition-colors ${
                      item.status === 'Diterbitkan'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        : item.status === 'Dijadualkan'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="p-3.5 text-stone-300">{item.author}</td>
                <td className="p-3.5 font-mono text-stone-400 text-[11px]">{item.lastUpdated}</td>
                <td className="p-3.5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => toggleStatus(item.id)}
                      className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800"
                      title="Kemaskini Status"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
