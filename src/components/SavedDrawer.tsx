import React from 'react';
import { X, Trash2, ArrowRight, Bookmark } from 'lucide-react';
import { BeautyArticle } from '../types/article';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: BeautyArticle[];
  onSelectArticle: (article: BeautyArticle) => void;
  onRemoveSaved: (id: string) => void;
  onClearAll: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveSaved,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-[#FAF8F5] border-l border-[#E8E2D9] h-full shadow-2xl flex flex-col p-6 relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D9]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-stone-800" />
            <h2 className="font-editorial-serif text-xl font-medium text-stone-900">
              Personal Reading Folio ({savedArticles.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-900 transition-colors"
            aria-label="Close saved drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <Bookmark className="w-8 h-8 text-stone-300 mb-3 stroke-[1.5]" />
              <p className="text-sm font-editorial-serif text-stone-800 mb-1">
                Your folio is empty
              </p>
              <p className="text-xs font-light max-w-xs text-stone-500">
                Click the bookmark icon on any of the 10 beauty investigations to save for offline study.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 border border-[#E8E2D9] bg-white rounded-sm hover:border-stone-400 transition-colors group flex flex-col justify-between"
              >
                <div 
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="cursor-pointer"
                >
                  <div className="text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                    {article.category} · {article.readTime}
                  </div>
                  <h3 className="font-editorial-serif text-base font-medium text-stone-900 group-hover:text-stone-700 leading-snug mb-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-light line-clamp-2">
                    {article.dek}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E8E2D9]/70 mt-3 flex items-center justify-between">
                  <button
                    onClick={() => onRemoveSaved(article.id)}
                    className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="flex items-center gap-1 text-xs font-medium text-stone-900 hover:text-stone-700"
                  >
                    <span>Read</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer controls */}
        {savedArticles.length > 0 && (
          <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between">
            <button
              onClick={onClearAll}
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors"
            >
              Clear Folio
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-sm transition-colors"
            >
              Return to Journal
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
