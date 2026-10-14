import React, { useState } from 'react';
import { X, Search, Check, Key, ExternalLink } from 'lucide-react';
import { STEP_2_KEYWORD_MAP, PageKeywordMapping } from '../data/keywordMap';
import { navigateTo } from '../utils/seoRouter';

interface SeoKeywordMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticleBySlug?: (slug: string) => void;
}

export const SeoKeywordMapModal: React.FC<SeoKeywordMapModalProps> = ({
  isOpen,
  onClose,
  onSelectArticleBySlug
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const entries = Object.values(STEP_2_KEYWORD_MAP);

  const filtered = entries.filter((item) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      item.pageName.toLowerCase().includes(q) ||
      item.mainKeyword.toLowerCase().includes(q) ||
      item.relatedKeyword1.toLowerCase().includes(q) ||
      item.relatedKeyword2.toLowerCase().includes(q) ||
      item.pageUrl.toLowerCase().includes(q) ||
      item.productCategory.toLowerCase().includes(q)
    );
  });

  const handleCopyKeywords = (item: PageKeywordMapping) => {
    const text = `Main: "${item.mainKeyword}" | Related: "${item.relatedKeyword1}", "${item.relatedKeyword2}"`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(item.pageId);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const handleNavigatePage = (url: string) => {
    navigateTo(url);
    if (onSelectArticleBySlug) {
      if (url === '/lipstick') {
        onSelectArticleBySlug('lipstick');
      } else if (url === '/serum') {
        onSelectArticleBySlug('serum');
      } else if (url === '/sunscreen') {
        onSelectArticleBySlug('sunscreen');
      } else {
        const match = url.match(/^\/article\/([a-z0-9-]+)/);
        if (match) {
          onSelectArticleBySlug(match[1]);
        }
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-xs">
      <div 
        className="bg-[#FAF8F5] border border-[#E8E2D9] w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl rounded-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="keyword-map-title"
      >
        {/* Header Strip */}
        <div className="p-6 border-b border-[#E8E2D9] bg-[#F7F4EE] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-editorial-sans mb-1">
              <Key className="w-3.5 h-3.5 text-stone-800" />
              <span>Step 2 Keyword Map & SEO Architecture</span>
            </div>
            <h2 id="keyword-map-title" className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900">
              Assigned Page-by-Page Keyword Map
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light mt-1 max-w-2xl">
              Each page is assigned a dedicated main keyword and two related keywords. Keywords are woven naturally into titles, meta descriptions, primary H1s, section headings (H2s), and editorial content without duplication or forced stuffing.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 border border-[#E8E2D9] bg-white text-stone-500 hover:text-stone-900 hover:border-stone-400 rounded-sm transition-colors cursor-pointer shrink-0"
            aria-label="Close keyword map"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 border-b border-[#E8E2D9] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Filter by keyword, product, or URL..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E8E2D9] rounded-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500"
            />
          </div>

          <div className="text-[11px] text-stone-500 uppercase tracking-wider font-editorial-sans self-start sm:self-auto">
            <span>Showing {filtered.length} of {entries.length} Pages Mapped</span>
          </div>
        </div>

        {/* Content Table / Cards */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-4 flex-1">
          <div className="grid grid-cols-1 gap-4">
            {filtered.map((item) => (
              <div
                key={item.pageId}
                className="border border-[#E8E2D9] bg-white p-5 hover:border-stone-400 transition-colors rounded-sm"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[#E8E2D9]/70">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-stone-100 text-stone-800 border border-stone-200 rounded-xs">
                        {item.productCategory}
                      </span>
                      <span className="text-xs font-semibold text-stone-900 font-editorial-sans">
                        {item.pageName}
                      </span>
                      <span className="text-stone-300">·</span>
                      <span className="text-[11px] text-stone-500">
                        Intent: {item.searchIntent}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-stone-600 truncate max-w-xl">
                      URL: <span className="text-stone-900 font-semibold">{item.pageUrl}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleCopyKeywords(item)}
                      className="px-2.5 py-1 text-[11px] border border-[#E8E2D9] hover:border-stone-400 text-stone-700 bg-stone-50 rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                      title="Copy keyword cluster"
                    >
                      {copiedId === item.pageId ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <span>Copy Keywords</span>
                      )}
                    </button>

                    <button
                      onClick={() => handleNavigatePage(item.pageUrl)}
                      className="px-2.5 py-1 text-[11px] bg-stone-900 hover:bg-stone-800 text-white rounded-xs transition-colors flex items-center gap-1 cursor-pointer"
                      title="Open page in blog"
                    >
                      <span>Open Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Keyword Assignment Strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 py-3 border-b border-[#E8E2D9]/70 text-xs">
                  <div className="bg-[#F7F4EE] p-2.5 rounded-xs border border-[#E8E2D9]/60">
                    <div className="text-[10px] uppercase font-bold text-amber-900 tracking-wider mb-0.5">
                      ★ Main Keyword (Primary)
                    </div>
                    <div className="font-semibold text-stone-900 font-mono text-[11px]">
                      "{item.mainKeyword}"
                    </div>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-xs border border-stone-200/60">
                    <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-0.5">
                      Related Keyword 1
                    </div>
                    <div className="font-medium text-stone-800 font-mono text-[11px]">
                      "{item.relatedKeyword1}"
                    </div>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-xs border border-stone-200/60">
                    <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-0.5">
                      Related Keyword 2
                    </div>
                    <div className="font-medium text-stone-800 font-mono text-[11px]">
                      "{item.relatedKeyword2}"
                    </div>
                  </div>
                </div>

                {/* Title & Meta Description Previews */}
                <div className="pt-3 space-y-2 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 mr-2">
                      Target SEO Title:
                    </span>
                    <span className="font-medium text-stone-900">
                      {item.seoTitle}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 mr-2">
                      Target Meta Description:
                    </span>
                    <span className="text-stone-600 font-light leading-relaxed">
                      {item.metaDescription}
                    </span>
                  </div>

                  <div className="pt-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 mr-2">
                      Primary H1 & H2 Headings:
                    </span>
                    <span className="font-editorial-serif text-sm text-stone-800 italic block mt-0.5">
                      H1: "{item.primaryHeadingH1}"
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-stone-600 font-light mt-1 space-y-0.5 pl-1">
                      {item.sectionHeadingsH2.map((h2, idx) => (
                        <li key={idx}>H2: {h2}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-[#E8E2D9] bg-[#F7F4EE] flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Zero duplication: 100% distinct keyword mappings across all 12 pages.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xs text-xs font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
