import React from 'react';
import { Bookmark, Sparkles, Search, Compass, BookOpen, Key } from 'lucide-react';
import { BeautyProductType } from '../types/article';
import { getHomeUrl, getArticlesHubUrl } from '../utils/seoRouter';

interface HeaderProps {
  currentView: 'home' | 'articles' | 'detail';
  onNavigateHome: () => void;
  onNavigateArticles: () => void;
  onSelectProductType: (pType: BeautyProductType | 'All') => void;
  selectedProductType: BeautyProductType | 'All';
  onOpenRoutineMatcher: () => void;
  onOpenLexicon: () => void;
  onOpenSavedDrawer: () => void;
  savedCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenKeywordMap?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigateHome,
  onNavigateArticles,
  onSelectProductType,
  selectedProductType,
  onOpenRoutineMatcher,
  onOpenLexicon,
  onOpenSavedDrawer,
  savedCount,
  searchQuery,
  onSearchChange,
  onOpenKeywordMap
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Editorial Utility Strip */}
      <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-[11px] uppercase tracking-widest text-stone-500 border-b border-[#E8E2D9]/60 font-editorial-sans">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-stone-800">ÉLIXIR & DERMA</span>
          <span aria-hidden="true">·</span>
          <span>Lipsticks · Serums · Compacts · Sunscreens · Complexion</span>
          <span aria-hidden="true">·</span>
          <span>10 Formulations</span>
        </div>
        <div className="flex items-center gap-5">
          {onOpenKeywordMap && (
            <button 
              onClick={onOpenKeywordMap}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 font-medium text-stone-700 cursor-pointer"
            >
              <Key className="w-3 h-3 text-stone-600" />
              <span>Step 2 Keyword Map</span>
            </button>
          )}
          <span>·</span>
          <button 
            onClick={onOpenLexicon}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Cosmetic Lexicon
          </button>
          <span>·</span>
          <button 
            onClick={onOpenRoutineMatcher}
            className="hover:text-stone-900 transition-colors cursor-pointer"
          >
            Regimen Matcher
          </button>
        </div>
      </div>

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href={getHomeUrl()}
          onClick={(e) => {
            e.preventDefault();
            onNavigateHome();
          }}
          className="text-left group cursor-pointer focus:outline-none"
          aria-label="ÉLIXIR & DERMA — Homepage"
        >
          <span className="font-editorial-serif text-2xl lg:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 block">
            ÉLIXIR & DERMA
          </span>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-stone-600">
          <a
            href={getHomeUrl()}
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              currentView === 'home' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
            aria-label="Navigate to Homepage"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Home</span>
          </a>
          
          <a
            href={getArticlesHubUrl('All')}
            onClick={(e) => {
              e.preventDefault();
              onNavigateArticles();
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              currentView === 'articles' && selectedProductType === 'All' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
            aria-label="Explore all 10 blog articles"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>10 Blog Articles</span>
          </a>

          <a
            href={getArticlesHubUrl('Lipstick')}
            onClick={(e) => {
              e.preventDefault();
              onSelectProductType('Lipstick');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
              selectedProductType === 'Lipstick' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
            aria-label="Filter articles by Lipsticks"
          >
            Lipsticks
          </a>

          <a
            href={getArticlesHubUrl('Serum')}
            onClick={(e) => {
              e.preventDefault();
              onSelectProductType('Serum');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
              selectedProductType === 'Serum' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
            aria-label="Filter articles by Serums"
          >
            Serums
          </a>

          <a
            href={getArticlesHubUrl('Compact Powder')}
            onClick={(e) => {
              e.preventDefault();
              onSelectProductType('Compact Powder');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
              selectedProductType === 'Compact Powder' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
            aria-label="Filter articles by Compact Powder"
          >
            Compacts
          </a>

          <a
            href={getArticlesHubUrl('Sunscreen')}
            onClick={(e) => {
              e.preventDefault();
              onSelectProductType('Sunscreen');
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
              selectedProductType === 'Sunscreen' ? 'text-stone-950 font-semibold underline underline-offset-8 decoration-stone-900' : ''
            }`}
            aria-label="Filter articles by Sunscreens"
          >
            Sunscreens
          </a>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative hidden sm:block w-40 lg:w-52">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search lipstick, serum..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView === 'home' && e.target.value.trim().length > 0) {
                  onNavigateArticles();
                }
              }}
              className="w-full bg-[#F3EFEA] border border-[#E8E2D9] text-xs text-stone-800 placeholder-stone-400 pl-8 pr-3 py-1.5 rounded-sm focus:outline-none focus:border-stone-400 transition-colors"
            />
          </div>

          <button
            onClick={onOpenSavedDrawer}
            aria-label="View saved reading list"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-[#E8E2D9] hover:border-stone-400 rounded-sm transition-colors whitespace-nowrap"
          >
            <Bookmark className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Folio</span>
            <span className="font-mono text-[11px] tabular-nums font-medium text-stone-500">
              ({savedCount})
            </span>
          </button>

          <button
            onClick={onOpenRoutineMatcher}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-sm transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden lg:inline">Product Matcher</span>
            <span className="lg:hidden">Matcher</span>
          </button>
        </div>
      </div>
    </header>
  );
};
