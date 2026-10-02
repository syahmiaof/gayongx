import React, { useState } from 'react';
import { ORGANISATION_STRUCTURE } from '../../data/seedData';
import { OrgNode } from '../../types';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import {
  Network,
  ChevronDown,
  ChevronRight,
  Shield,
  Building2,
  Users,
  Award,
  Calendar,
  Layers,
} from 'lucide-react';

interface TreeNodeProps {
  node: OrgNode;
  depth?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ node, depth = 0 }) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const getUnitBadgeColor = (type: string) => {
    switch (type) {
      case 'Negeri':
        return 'bg-[#D71F26] text-white';
      case 'Cawangan':
        return 'bg-[#297E62] text-white';
      case 'Gelanggang':
        return 'bg-stone-800 text-stone-200 border border-stone-700';
      case 'Biro':
      default:
        return 'bg-amber-950 text-amber-300 border border-amber-800';
    }
  };

  return (
    <div className="space-y-2 text-left">
      <div
        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
          depth === 0
            ? 'bg-[#181a22] border-stone-700 shadow-md'
            : depth === 1
            ? 'bg-[#12141a] border-stone-800 ml-0 sm:ml-6'
            : 'bg-[#0e0f14] border-stone-800/80 ml-0 sm:ml-12'
        }`}
      >
        <div className="flex items-start gap-3">
          {hasChildren ? (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="p-1 mt-0.5 text-stone-400 hover:text-white rounded hover:bg-stone-800 transition-colors"
            >
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          ) : (
            <div className="w-6 shrink-0" />
          )}

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className={`px-2 py-0.2 text-[10px] font-mono font-bold rounded uppercase ${getUnitBadgeColor(
                  node.unitType
                )}`}
              >
                {node.unitType}
              </span>
              <span className="text-xs text-stone-400 font-mono">ID: {node.id}</span>
            </div>

            <h3 className="text-base font-bold text-white font-serif">{node.title}</h3>

            <div className="text-xs text-stone-300 flex flex-wrap items-center gap-2 pt-0.5">
              <span>{node.name}</span>
              {node.bengkong && (
                <>
                  <span className="text-stone-600">·</span>
                  <span className="text-[#FFF100] font-mono">{node.bengkong}</span>
                </>
              )}
              {node.role && (
                <>
                  <span className="text-stone-600">·</span>
                  <span className="text-stone-400">{node.role}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0">
          <DataProvenanceBadge provenance={node.dataProvenance} compact={true} />
        </div>
      </div>

      {/* Children Recursion */}
      {hasChildren && expanded && (
        <div className="space-y-2 border-l border-stone-800/80 pl-2 sm:pl-4 mt-2">
          {node.children!.map((child) => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const OrganisationExplorerView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left">
      <div className="border-b border-stone-800 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#FFF100] uppercase tracking-wider font-bold">
            Arkitektur Berperingkat Dinamik
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
            Penjelajah Hierarki Organisasi PSSGM Perak
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            Struktur pertubuhan parent-child boleh dikembangkan dinamik dari peringkat Bahagian Negeri,
            ke Cawangan Daerah, Dewan Gurulatih, hingga ke Gelanggang Latihan.
          </p>
        </div>

        <div className="text-xs font-mono text-stone-400 bg-stone-900 px-3 py-1.5 rounded border border-stone-800">
          Generic Parent-Child Node Model
        </div>
      </div>

      {/* Recursive Org Tree */}
      <div className="space-y-4">
        <TreeNode node={ORGANISATION_STRUCTURE} />
      </div>

      {/* Architectural Documentation */}
      <div className="p-4 bg-stone-900/60 border border-stone-800 rounded-lg text-xs text-stone-400 space-y-2 font-mono">
        <div className="text-stone-200 font-bold flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#FFF100]" />
          <span>Nota Seni Bina Data (Data Architecture Specification):</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Struktur data ini direka berasaskan model hierarki nod (OrgNode) yang menyokong penambahan unit
          organisasi perantara secara infiniti tanpa hardcoding tetap (contohnya zon daerah, sayap pemuda,
          sidang fatwa persilatan, atau jawatankuasa khas).
        </p>
      </div>
    </div>
  );
};
