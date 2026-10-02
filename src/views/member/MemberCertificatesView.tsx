import React, { useState } from 'react';
import { SYNTHETIC_PRIMARY_MEMBER } from '../../data/seedData';
import { Logo } from '../../components/common/Logo';
import { FileText, Download, Award, ShieldCheck, X, Eye } from 'lucide-react';

export const MemberCertificatesView: React.FC = () => {
  const member = SYNTHETIC_PRIMARY_MEMBER;
  const [activeCert, setActiveCert] = useState<(typeof member.certificates)[0] | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      {/* Header */}
      <div className="border-b border-stone-800 pb-6">
        <div className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider">
          Repositori Tauliah Digital
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
          Sijil &amp; Pengiktirafan Rasmi
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Setiap sijil dilengkapi nombor siri keselamatan yang didaftarkan dalam arkib pangkalan data
          negeri PSSGM Bahagian Negeri Perak.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {member.certificates.map((cert) => (
          <div
            key={cert.id}
            className="p-5 bg-[#111216] border border-stone-800 hover:border-stone-700 rounded-xl space-y-4 flex flex-col justify-between transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                <span className="text-[#FFF100] uppercase font-bold">{cert.category}</span>
                <span>{cert.issueDate}</span>
              </div>

              <h3 className="text-base font-serif font-bold text-white leading-snug">{cert.title}</h3>

              <div className="space-y-1 text-xs text-stone-400">
                <div className="font-mono text-[11px] text-stone-300">
                  No. Siri: {cert.certificateNumber}
                </div>
                <div className="text-[11px] text-stone-500">
                  Pihak Mengeluarkan: {cert.issuingAuthority}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="text-xs text-[#FFF100] hover:underline font-semibold flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Lihat Sijil</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveCert(cert)}
                className="p-1.5 text-stone-400 hover:text-white rounded hover:bg-stone-800"
                title="Muat Turun PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Viewer Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#14161c] border border-stone-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-2xl">
            {/* Modal Close */}
            <button
              type="button"
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Paper Simulation Frame */}
            <div className="p-8 bg-[#faf8f2] text-stone-900 rounded-xl border-4 border-[#D4AF37] relative overflow-hidden text-center space-y-6 shadow-inner">
              <div className="flex justify-center">
                <Logo size="md" showText={false} theme="light" />
              </div>

              <div className="space-y-1">
                <div className="text-[11px] font-serif font-bold text-stone-800 tracking-widest uppercase">
                  PERTUBUHAN SILAT SENI GAYONG MALAYSIA
                </div>
                <div className="text-xs font-serif font-extrabold text-[#D71F26] tracking-wider uppercase">
                  BAHAGIAN NEGERI PERAK
                </div>
                <div className="text-[9px] font-mono text-stone-500">
                  PPM-010-04-09042013-000034
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-serif uppercase tracking-widest text-stone-600">
                  Dengan ini diperakui bahawa
                </div>
                <div className="text-xl sm:text-2xl font-serif font-extrabold text-stone-950 underline decoration-[#D4AF37] decoration-2">
                  {member.fullName}
                </div>
                <div className="text-xs font-mono text-stone-700">
                  No. Keahlian: {member.membershipNumber} · MyKad: {member.maskedIc}
                </div>
              </div>

              <div className="space-y-1 max-w-md mx-auto">
                <div className="text-sm font-serif font-bold text-stone-900">
                  Telah menyempurnakan segala syarat bagi
                </div>
                <div className="text-base font-serif font-extrabold text-[#297E62]">
                  {activeCert.title}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-300 grid grid-cols-2 gap-4 text-left text-xs font-serif">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase">Tarikh Dikeluarkan</div>
                  <div className="font-mono text-stone-800">{activeCert.issueDate}</div>
                  <div className="text-[9px] font-mono text-stone-600 mt-1">
                    Siri: {activeCert.certificateNumber}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-stone-500 uppercase">Pihak Berkuasa Pensijilan</div>
                  <div className="font-semibold text-stone-900">{activeCert.issuingAuthority}</div>
                  <div className="text-[9px] text-emerald-800 font-mono mt-1">
                    Meterai Digital Sah
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-400 font-mono text-[11px]">
                Rekod ini adalah salinan arkib rasmi.
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveCert(null)}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded font-medium"
                >
                  Tutup
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Sijil digital sedang dijana sebagai fail PDF rasmi...');
                    setActiveCert(null);
                  }}
                  className="px-4 py-2 bg-[#297E62] hover:bg-[#20664f] text-white rounded font-bold shadow"
                >
                  Muat Turun Sijil PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
