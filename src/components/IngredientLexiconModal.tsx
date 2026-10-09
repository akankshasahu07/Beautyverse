import React, { useState } from 'react';
import { X, Search, Beaker, Check } from 'lucide-react';
import { INGREDIENT_GLOSSARY } from '../data/articles';

interface IngredientLexiconModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IngredientLexiconModal: React.FC<IngredientLexiconModalProps> = ({
  isOpen,
  onClose
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  if (!isOpen) return null;

  const filtered = INGREDIENT_GLOSSARY.filter(item => 
    item.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.class.toLowerCase().includes(filterQuery.toLowerCase()) ||
    item.primaryFunction.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-[#E8E2D9] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 mb-2 font-editorial-sans">
          <Beaker className="w-3.5 h-3.5 text-stone-700" />
          <span>Cutaneous Pharmacopeia</span>
        </div>

        <h2 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-2">
          The 10 Core Cosmetic Actives Lexicon
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-light mb-6">
          A peer-reviewed formulation reference detailing ideal transdermal pH values, optimal daily layering positions, and cellular pathways.
        </p>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search active molecule (e.g. Ceramide, Retinal, Copper, Zinc)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full text-xs p-2.5 pl-9 bg-white border border-[#E8E2D9] rounded-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500"
          />
        </div>

        {/* Lexicon Items */}
        <div className="space-y-4">
          {filtered.map((item, idx) => (
            <div key={idx} className="p-4 sm:p-5 border border-[#E8E2D9] bg-white rounded-sm hover:border-stone-400 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div>
                  <h3 className="font-editorial-serif text-lg font-medium text-stone-900">
                    {item.name}
                  </h3>
                  <div className="text-[11px] uppercase tracking-wider text-stone-500">
                    {item.class}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <div className="bg-[#F3EFEA] px-2.5 py-1 rounded-sm text-stone-700 font-mono text-[11px]">
                    Ideal pH: {item.idealPh}
                  </div>
                  <div className="bg-stone-900 text-white px-2.5 py-1 rounded-sm text-[11px]">
                    {item.layerOrder}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                {item.primaryFunction}
              </p>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="py-8 text-center text-xs text-stone-500">
              No cosmetic active found matching "{filterQuery}".
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-[#E8E2D9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-sm transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
