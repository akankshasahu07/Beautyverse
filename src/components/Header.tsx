import React from 'react';
import { Bookmark, Sparkles, Search } from 'lucide-react';
import { BeautyCategory } from '../types/article';

interface HeaderProps {
  onNavigateHome: () => void;
  onSelectCategory: (category: BeautyCategory | 'All') => void;
  onOpenRoutineMatcher: () => void;
  onOpenLexicon: () => void;
  onOpenSavedDrawer: () => void;
  savedCount: number;
  currentCategory: BeautyCategory | 'All';
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
  onSelectCategory,
  onOpenRoutineMatcher,
  onOpenLexicon,
  onOpenSavedDrawer,
  savedCount,
  currentCategory,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Editorial Utility Strip */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-[11px] uppercase tracking-widest text-stone-500 border-b border-[#E8E2D9]/60 font-editorial-sans">
        <div>
          <span>Vol. XXVIII · Autumn 2026 Edition</span>
          <span className="mx-2">·</span>
          <span>Cutaneous Biology & Cosmetic Formulation</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={onOpenLexicon}
            className="hover:text-stone-900 transition-colors"
          >
            Ingredient Lexicon (10 Actives)
          </button>
          <span>·</span>
          <button 
            onClick={onOpenRoutineMatcher}
            className="hover:text-stone-900 transition-colors"
          >
            Skin Routine Matcher
          </button>
          <span>·</span>
          <span>Dermatologist Peer-Reviewed</span>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button 
          onClick={onNavigateHome}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="font-editorial-serif text-2xl lg:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 block">
            ÉLIXIR & DERMA
          </span>
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-xs uppercase tracking-wider font-medium text-stone-600">
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('All');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
              currentCategory === 'All' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
          >
            All Essays
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Active Skincare');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
              currentCategory === 'Active Skincare' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
          >
            Active Skincare
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Barrier Repair');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
              currentCategory === 'Barrier Repair' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
          >
            Barrier Science
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Suncare & Photoprotection');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
              currentCategory === 'Suncare & Photoprotection' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
          >
            Photoprotection
          </button>
          <button
            onClick={onOpenLexicon}
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Lexicon
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden sm:block w-44 lg:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-[#F3EFEA] border border-[#E8E2D9] text-xs text-stone-800 placeholder-stone-400 pl-8 pr-3 py-1.5 rounded-sm focus:outline-none focus:border-stone-400 transition-colors"
            />
          </div>

          <button
            onClick={onOpenSavedDrawer}
            aria-label="View saved reading list"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-[#E8E2D9] hover:border-stone-400 rounded-sm transition-colors whitespace-nowrap"
          >
            <Bookmark className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Saved</span>
            <span className="font-mono text-[11px] tabular-nums font-medium text-stone-500">
              ({savedCount})
            </span>
          </button>

          <button
            onClick={onOpenRoutineMatcher}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-sm transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Routine Matcher</span>
          </button>
        </div>
      </div>
    </header>
  );
};
