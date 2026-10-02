import React, { useState } from 'react';
import { DataProvenance } from '../../types';
import { ShieldCheck, Clock, FlaskConical, Info, X } from 'lucide-react';

interface Props {
  provenance: DataProvenance;
  compact?: boolean;
  className?: string;
}

export const DataProvenanceBadge: React.FC<Props> = ({
  provenance,
  compact = false,
  className = '',
}) => {
  const [showDetail, setShowDetail] = useState(false);

  const getStyle = () => {
    switch (provenance.dataOrigin) {
      case 'VERIFIED_PUBLIC':
        return {
          textColor: 'text-emerald-400',
          dotColor: 'bg-emerald-500',
          label: 'Data Rasmi ROS',
          icon: ShieldCheck,
          title: 'VERIFIED_PUBLIC',
        };
      case 'DATE_BOUND_PUBLIC':
        return {
          textColor: 'text-amber-400',
          dotColor: 'bg-amber-500',
          label: provenance.lastVerifiedAt
            ? `Disemak: ${provenance.lastVerifiedAt}`
            : 'Arkib Bertarikh',
          icon: Clock,
          title: 'DATE_BOUND_PUBLIC',
        };
      case 'DEMO_SYNTHETIC':
      default:
        return {
          textColor: 'text-stone-400',
          dotColor: 'bg-stone-500',
          label: 'Simulasi Prototaip',
          icon: FlaskConical,
          title: 'DEMO_SYNTHETIC',
        };
    }
  };

  const style = getStyle();
  const Icon = style.icon;

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setShowDetail(!showDetail);
        }}
        className={`inline-flex items-center gap-1.5 text-xs transition-colors hover:opacity-80 focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 ${style.textColor}`}
        title={`Sumber Data: ${style.title}. Klik untuk butiran audit.`}
      >
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dotColor}`} />
        <Icon className="w-3 h-3 shrink-0" />
        {!compact && (
          <span className="font-mono text-[11px] tracking-tight">
            {style.label}
          </span>
        )}
      </button>

      {/* Popover Audit Details */}
      {showDetail && (
        <div
          className="absolute z-50 bottom-full left-0 mb-2 w-72 p-3 bg-[#181a1e] border border-stone-800 rounded-lg shadow-2xl text-left text-xs text-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-stone-800">
            <span className="font-mono font-semibold text-[11px] text-[#FFF100]">
              Provenance: {provenance.dataOrigin}
            </span>
            <button
              onClick={() => setShowDetail(false)}
              className="text-stone-400 hover:text-white p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5 text-[11px] text-stone-300">
            {provenance.sourceName && (
              <div>
                <span className="text-stone-500">Rujukan Sumber: </span>
                <span className="font-medium text-stone-200">{provenance.sourceName}</span>
              </div>
            )}
            {provenance.lastVerifiedAt && (
              <div>
                <span className="text-stone-500">Tarikh Semakan: </span>
                <span className="font-mono text-stone-200">{provenance.lastVerifiedAt}</span>
              </div>
            )}
            {provenance.note && (
              <div className="text-stone-400 italic mt-1 bg-stone-900/60 p-1.5 rounded border border-stone-800/80">
                {provenance.note}
              </div>
            )}
            {provenance.dataOrigin === 'DEMO_SYNTHETIC' && (
              <div className="text-[10px] text-amber-400/90 mt-1">
                Perhatian: Rekod ini adalah ciptaan prototaip (synthetic) dan tidak melibatkan identiti peribadi sebenar.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
