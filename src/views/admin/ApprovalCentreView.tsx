import React, { useState } from 'react';
import { APPROVAL_INBOX } from '../../data/seedData';
import { ApprovalItem, ApprovalStatus } from '../../types';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import {
  Inbox,
  CheckCircle2,
  XCircle,
  RotateCcw,
  FileText,
  Clock,
  Shield,
  Eye,
  X,
  AlertTriangle,
  Download,
} from 'lucide-react';

export const ApprovalCentreView: React.FC = () => {
  const [items, setItems] = useState<ApprovalItem[]>(APPROVAL_INBOX);
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleUpdateStatus = (id: string, newStatus: ApprovalStatus) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updatedTimeline = [
            ...item.timeline,
            {
              stage: `Tindakan Status: ${newStatus}`,
              timestamp: new Date().toLocaleString(),
              note: `Keputusan dibuat di Pusat Kawalan Pentadbiran Negeri.`,
              actor: 'Pentadbir Negeri Perak',
            },
          ];
          return {
            ...item,
            status: newStatus,
            timeline: updatedTimeline,
          };
        }
        return item;
      })
    );

    setFeedbackMessage(`Permohonan #${id} telah dikemaskini kepada: ${newStatus}`);
    setTimeout(() => setFeedbackMessage(null), 3500);
    setSelectedItem(null);
  };

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-6">
        <div>
          <div className="text-xs font-mono text-[#D71F26] uppercase tracking-wider font-bold">
            Alur Kerja &amp; Kelulusan Berpusat
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Pusat Kelulusan &amp; Pengesahan Pentadbiran
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Peti masuk permohonan keahlian baharu, ujian kenaikan bengkong, tauliah gelanggang dan
            pengesahan cawangan berwarta.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-stone-900 border border-stone-800 rounded text-xs font-mono text-stone-300">
            {items.filter((i) => i.status === 'Menunggu').length} Menunggu Tindakan
          </span>
        </div>
      </div>

      {feedbackMessage && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-lg text-xs text-emerald-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{feedbackMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            className="text-emerald-400 hover:text-white"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Authority Level Disclaimer */}
      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-lg text-xs text-stone-400 space-y-1">
        <div className="text-stone-300 font-semibold flex items-center gap-1.5">
          <AlertTriangle className="w-3.5 h-3.5 text-[#FFF100]" />
          <span>Matriks Kuasa Pengesahan Rasmi:</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Kenaikan Bengkong tertakluk kepada semakan Lembaga Gurulatih. Permohonan cawangan memerlukan
          kelulusan akhir Jabatan Pendaftaran Pertubuhan (ROS). Tindakan pentadbiran negeri berperanan
          sebagai tapisan dan sokongan statutori.
        </p>
      </div>

      {/* Approval Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-6 bg-[#111216] border border-stone-800 hover:border-stone-700 rounded-xl space-y-4 transition-all"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#FFF100] font-bold">{item.requestType}</span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-400">ID: {item.id}</span>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-400">Dihantar: {item.submissionDate}</span>
                </div>
                <h3 className="text-lg font-bold text-white font-serif">{item.requesterName}</h3>
                <div className="text-xs text-stone-300">{item.organisationUnit}</div>
              </div>

              <div className="text-right space-y-1">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                    item.status === 'Menunggu'
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : item.status === 'Diluluskan'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : item.status === 'Dipulangkan'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'bg-red-950 text-red-300 border border-red-800'
                  }`}
                >
                  {item.status}
                </span>
                <div className="text-[11px] text-stone-400 font-mono">
                  Peringkat: {item.currentStage}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-stone-500">Penilai Yang Diperlukan:</span>
                <div className="text-stone-200 font-medium">{item.requiredReviewer}</div>
                {item.notes && <p className="text-stone-400 text-[11px] mt-1">{item.notes}</p>}
              </div>

              <div className="space-y-1">
                <span className="text-stone-500">Dokumen Sokongan ({item.supportingDocuments.length}):</span>
                <div className="space-y-1">
                  {item.supportingDocuments.map((doc, idx) => (
                    <div
                      key={idx}
                      className="p-1.5 bg-stone-900/60 rounded flex items-center justify-between text-[11px] text-stone-300 font-mono"
                    >
                      <span className="truncate">{doc.name}</span>
                      <span className="text-stone-500">{doc.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="pt-3 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3">
              <DataProvenanceBadge provenance={item.dataProvenance} />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedItem(item)}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Jejak Garis Masa</span>
                </button>

                {item.status === 'Menunggu' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(item.id, 'Dipulangkan')}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-medium rounded flex items-center gap-1 border border-amber-900/40"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Pulang Pembetulan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(item.id, 'Ditolak')}
                      className="px-3 py-1.5 bg-stone-800 hover:bg-red-950 text-red-400 text-xs font-medium rounded flex items-center gap-1 border border-red-900/40"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Tolak</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleUpdateStatus(item.id, 'Diluluskan')}
                      className="px-3.5 py-1.5 bg-[#297E62] hover:bg-[#20664f] text-white text-xs font-bold rounded shadow flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Luluskan</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Item Timeline & Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="bg-[#14161c] border border-stone-700 rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-[#FFF100] uppercase">
                  Kronologi &amp; Dokumen Permohonan
                </span>
                <h3 className="text-base font-bold text-white font-serif">
                  {selectedItem.requestType} - {selectedItem.requesterName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline Stepper */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono text-stone-400 uppercase">Garis Masa Alur Kerja:</span>
              <div className="space-y-3 border-l-2 border-stone-800 pl-3">
                {selectedItem.timeline.map((t, idx) => (
                  <div key={idx} className="space-y-0.5 text-xs">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-[#FFF100] font-bold">{t.stage}</span>
                      <span className="text-stone-500">{t.timestamp}</span>
                    </div>
                    <div className="text-stone-300">{t.note}</div>
                    <div className="text-stone-500 text-[10px]">Oleh: {t.actor}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-stone-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
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
