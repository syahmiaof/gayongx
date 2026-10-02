import React, { useState } from 'react';
import { DataProvenanceBadge } from '../../components/common/DataProvenanceBadge';
import { LATEST_NEWS } from '../../data/seedData';
import { NewsRecord } from '../../types';
import { Newspaper, Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';

export const NewsView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsRecord | null>(null);

  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 text-left">
        <button
          type="button"
          onClick={() => setSelectedArticle(null)}
          className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Senarai Warta</span>
        </button>

        <div className="space-y-4 border-b border-stone-800 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <span className="text-[#FFF100] font-semibold">{selectedArticle.category}</span>
            <span>·</span>
            <span>{selectedArticle.date}</span>
            <span>·</span>
            <span>{selectedArticle.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
            {selectedArticle.title}
          </h1>

          <div className="flex items-center justify-between pt-2 text-xs text-stone-400">
            <span>Disediakan oleh: {selectedArticle.author}</span>
            <DataProvenanceBadge provenance={selectedArticle.dataProvenance} />
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-stone-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p className="text-base sm:text-lg font-medium text-stone-200 leading-relaxed border-l-2 border-[#D71F26] pl-4 py-1">
            {selectedArticle.excerpt}
          </p>
          <p>{selectedArticle.content}</p>
          <p>
            Sebarang maklumat lanjut berkaitan kenyataan ini boleh diajukan kepada Urusetia Pentadbiran
            Pertubuhan Silat Seni Gayong Malaysia Bahagian Negeri Perak melalui saluran rasmi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-left">
      {/* Header */}
      <div className="space-y-4 border-b border-stone-800 pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
          <Newspaper className="w-4 h-4 text-[#D71F26]" />
          <span>Warta Rasmi &amp; Penerbitan</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
          Warta &amp; Kenyataan Rasmi Gayong Perak
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-3xl">
          Pengumuman rasmi badan pentadbiran negeri, liputan aktiviti cawangan dan gelanggang, serta
          arkib penyelidikan sejarah Air Kuning Taiping.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {LATEST_NEWS.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedArticle(item)}
            className="p-5 bg-[#111216] border border-stone-800 hover:border-stone-700 rounded-xl space-y-3 cursor-pointer flex flex-col justify-between transition-all group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span className="text-[#FFF100]">{item.category}</span>
                <span>{item.date}</span>
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-[#FFF100] transition-colors leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                {item.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-500">
              <span>{item.readTime}</span>
              <span className="text-stone-300 group-hover:text-white font-medium">
                Baca Penuh &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
