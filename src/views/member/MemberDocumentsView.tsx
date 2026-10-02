import React, { useState } from 'react';
import { FolderOpen, Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export const MemberDocumentsView: React.FC = () => {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const docs = [
    {
      id: 'doc-1',
      title: 'Buku Panduan Adab & Etika Gelanggang Silat Seni Gayong',
      code: 'GUIDE-GAYONG-PERAK-V2',
      size: '3.4 MB',
      type: 'PDF',
      category: 'Garis Panduan',
    },
    {
      id: 'doc-2',
      title: 'Borang Pencalonan Ujian Kenaikan Bengkong (Borang UKB-01)',
      code: 'FORM-UKB-01-PK',
      size: '820 KB',
      type: 'PDF',
      category: 'Borang Rasmi',
    },
    {
      id: 'doc-3',
      title: 'Buku Log Latihan & Kehadiran Pesilat (Salinan Digital)',
      code: 'LOG-PESILAT-PERAK',
      size: '1.2 MB',
      type: 'PDF',
      category: 'Buku Log',
    },
    {
      id: 'doc-4',
      title: 'Ringkasan Perlembagaan PSSGM Bahagian Negeri Perak',
      code: 'CONST-PSSGM-PK-0034',
      size: '2.1 MB',
      type: 'PDF',
      category: 'Perlembagaan',
    },
  ];

  const handleDownload = (title: string) => {
    setDownloadMsg(`Memuat turun salinan rasmi: ${title}`);
    setTimeout(() => setDownloadMsg(null), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      <div className="border-b border-stone-800 pb-6">
        <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
          Pusat Sumber &amp; Rujukan
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
          Dokumen, Borang &amp; Garis Panduan
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Muat turun borang rasmi pentadbiran cawangan, modul latihan adab dan buku perlembagaan.
        </p>
      </div>

      {downloadMsg && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-md text-xs text-emerald-200 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{downloadMsg}</span>
        </div>
      )}

      <div className="space-y-4">
        {docs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 bg-[#111216] border border-stone-800 hover:border-stone-700 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-start gap-3">
              <div className="p-2.5 bg-stone-900 rounded-lg border border-stone-800 text-[#FFF100] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-mono text-stone-400 uppercase">
                  {doc.category} · {doc.code}
                </div>
                <h3 className="text-sm font-bold text-white leading-snug">{doc.title}</h3>
                <div className="text-[11px] text-stone-500 font-mono">
                  Format: {doc.type} · Saiz: {doc.size}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDownload(doc.title)}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-md border border-stone-700 flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Download className="w-3.5 h-3.5 text-[#FFF100]" />
              <span>Muat Turun</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
