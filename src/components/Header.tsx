import React, { useState, useEffect } from 'react';
import { Bookmark, Sparkles, Search, Compass, BookOpen, Key, Menu, X } from 'lucide-react';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on Escape key
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleMobileAction = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      {/* Editorial Utility Strip */}
      <div className="hidden lg:flex items-center justify-between px-8 h-8 text-[11px] uppercase tracking-widest text-stone-500 border-b border-[#E8E2D9]/60 font-editorial-sans">
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

      {/* Main Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Nav Links at xl+) - Zone 3 (Action) */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 lg:gap-4 xl:gap-6 px-4 sm:px-6 lg:px-8 h-14 sm:h-16">
        {/* Zone 1: Single text element wordmark (always shrink-0 so it never overlaps menu) */}
        <a 
          href={getHomeUrl()}
          onClick={(e) => {
            e.preventDefault();
            handleMobileAction(onNavigateHome);
          }}
          className="text-left group cursor-pointer focus:outline-none shrink-0"
          aria-label="ÉLIXIR & DERMA — Homepage"
        >
          <span className="font-editorial-serif text-lg sm:text-2xl 2xl:text-3xl font-medium tracking-tight text-stone-900 group-hover:text-stone-700 transition-colors whitespace-nowrap shrink-0 block">
            ÉLIXIR & DERMA
          </span>
        </a>

        {/* Zone 2: Clean single-line text navigation links on wide desktop (xl+) */}
        <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-5 2xl:gap-6 text-xs uppercase tracking-wider font-medium text-stone-600 shrink-0">
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

        {/* Zone 3: Primary action cluster + Mobile Utility Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Search bar visible on sm+ screens */}
          <div className="relative hidden sm:block w-36 md:w-44 xl:w-44 2xl:w-52">
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
            onClick={() => handleMobileAction(onOpenSavedDrawer)}
            aria-label="View saved reading list"
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs text-stone-700 hover:text-stone-900 border border-[#E8E2D9] hover:border-stone-400 rounded-sm transition-colors whitespace-nowrap"
          >
            <Bookmark className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">Folio</span>
            <span className="font-mono text-[11px] tabular-nums font-medium text-stone-500">
              ({savedCount})
            </span>
          </button>

          <button
            onClick={() => handleMobileAction(onOpenRoutineMatcher)}
            aria-label="Open Product Routine Matcher"
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 text-xs font-medium text-white bg-stone-900 hover:bg-stone-800 rounded-sm transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden xl:inline">Product Matcher</span>
            <span className="hidden min-[380px]:inline xl:hidden">Matcher</span>
          </button>

          {/* Tools/Search Menu Toggle Button on mobile/tablet (< lg) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close tools and search menu' : 'Open tools and search menu'}
            aria-expanded={isMobileMenuOpen}
            className="lg:hidden p-1.5 text-stone-700 hover:text-stone-950 border border-[#E8E2D9] rounded-sm bg-white/70 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Always-Visible Menu Bar Row on Mobile, Tablet & Standard Laptops (< xl) so it never overlaps the website name */}
      <nav
        aria-label="Mobile and Tablet Navigation"
        className="xl:hidden border-t border-[#E8E2D9]/80 bg-[#FAF8F5] px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex items-center lg:justify-center gap-4 sm:gap-6 h-10 overflow-x-auto scrollbar-none text-[11px] sm:text-xs uppercase tracking-wider font-medium text-stone-600">
          <a
            href={getHomeUrl()}
            onClick={(e) => {
              e.preventDefault();
              handleMobileAction(onNavigateHome);
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 py-1 ${
              currentView === 'home' ? 'text-stone-950 font-semibold underline underline-offset-4 decoration-stone-900' : ''
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
              handleMobileAction(onNavigateArticles);
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 py-1 ${
              currentView === 'articles' && selectedProductType === 'All' ? 'text-stone-950 font-semibold underline underline-offset-4 decoration-stone-900' : ''
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
              handleMobileAction(() => onSelectProductType('Lipstick'));
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
              selectedProductType === 'Lipstick' ? 'text-stone-950 font-semibold underline underline-offset-4 decoration-stone-900' : ''
            }`}
            aria-label="Filter articles by Lipsticks"
          >
            Lipsticks
          </a>

          <a
            href={getArticlesHubUrl('Serum')}
            onClick={(e) => {
              e.preventDefault();
              handleMobileAction(() => onSelectProductType('Serum'));
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
              selectedProductType === 'Serum' ? 'text-stone-950 font-semibold underline underline-offset-4 decoration-stone-900' : ''
            }`}
            aria-label="Filter articles by Serums"
          >
            Serums
          </a>

          <a
            href={getArticlesHubUrl('Compact Powder')}
            onClick={(e) => {
              e.preventDefault();
              handleMobileAction(() => onSelectProductType('Compact Powder'));
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
              selectedProductType === 'Compact Powder' ? 'text-stone-950 font-semibold underline underline-offset-4 decoration-stone-900' : ''
            }`}
            aria-label="Filter articles by Compact Powder"
          >
            Compacts
          </a>

          <a
            href={getArticlesHubUrl('Sunscreen')}
            onClick={(e) => {
              e.preventDefault();
              handleMobileAction(() => onSelectProductType('Sunscreen'));
            }}
            className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 py-1 ${
              selectedProductType === 'Sunscreen' ? 'text-stone-950 font-semibold underline underline-offset-4 decoration-stone-900' : ''
            }`}
            aria-label="Filter articles by Sunscreens"
          >
            Sunscreens
          </a>
        </div>
      </nav>

      {/* Mobile/Tablet Extra Search & Tools Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E2D9] bg-[#FAF8F5] px-4 sm:px-6 py-4 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto shadow-lg">
          {/* Mobile Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search lipstick, serum, sunscreen..."
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentView === 'home' && e.target.value.trim().length > 0) {
                  onNavigateArticles();
                }
              }}
              className="w-full bg-white border border-[#E8E2D9] text-sm text-stone-800 placeholder-stone-400 pl-9 pr-3 py-2.5 rounded-sm focus:outline-none focus:border-stone-500"
            />
          </div>

          {/* Mobile Route Navigation Links */}
          <nav aria-label="Mobile Navigation" className="grid grid-cols-2 gap-2 text-xs uppercase tracking-wider font-medium text-stone-700">
            <a
              href={getHomeUrl()}
              onClick={(e) => {
                e.preventDefault();
                handleMobileAction(onNavigateHome);
              }}
              className={`flex items-center gap-2 px-3 py-2.5 border rounded-sm transition-colors ${
                currentView === 'home'
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-[#E8E2D9] bg-white text-stone-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5 shrink-0" />
              <span>Home</span>
            </a>

            <a
              href={getArticlesHubUrl('All')}
              onClick={(e) => {
                e.preventDefault();
                handleMobileAction(onNavigateArticles);
              }}
              className={`flex items-center gap-2 px-3 py-2.5 border rounded-sm transition-colors ${
                currentView === 'articles' && selectedProductType === 'All'
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-[#E8E2D9] bg-white text-stone-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>All 10 Articles</span>
            </a>

            <a
              href={getArticlesHubUrl('Lipstick')}
              onClick={(e) => {
                e.preventDefault();
                handleMobileAction(() => onSelectProductType('Lipstick'));
              }}
              className={`px-3 py-2.5 border rounded-sm transition-colors ${
                selectedProductType === 'Lipstick'
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-[#E8E2D9] bg-white text-stone-800'
              }`}
            >
              Lipsticks
            </a>

            <a
              href={getArticlesHubUrl('Serum')}
              onClick={(e) => {
                e.preventDefault();
                handleMobileAction(() => onSelectProductType('Serum'));
              }}
              className={`px-3 py-2.5 border rounded-sm transition-colors ${
                selectedProductType === 'Serum'
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-[#E8E2D9] bg-white text-stone-800'
              }`}
            >
              Serums
            </a>

            <a
              href={getArticlesHubUrl('Compact Powder')}
              onClick={(e) => {
                e.preventDefault();
                handleMobileAction(() => onSelectProductType('Compact Powder'));
              }}
              className={`px-3 py-2.5 border rounded-sm transition-colors ${
                selectedProductType === 'Compact Powder'
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-[#E8E2D9] bg-white text-stone-800'
              }`}
            >
              Compacts
            </a>

            <a
              href={getArticlesHubUrl('Sunscreen')}
              onClick={(e) => {
                e.preventDefault();
                handleMobileAction(() => onSelectProductType('Sunscreen'));
              }}
              className={`px-3 py-2.5 border rounded-sm transition-colors ${
                selectedProductType === 'Sunscreen'
                  ? 'border-stone-900 bg-stone-900 text-white'
                  : 'border-[#E8E2D9] bg-white text-stone-800'
              }`}
            >
              Sunscreens
            </a>
          </nav>

          {/* Mobile Editorial Utility Tools */}
          <div className="pt-3 border-t border-[#E8E2D9] flex flex-wrap gap-2 text-xs font-editorial-sans">
            <button
              type="button"
              onClick={() => handleMobileAction(onOpenLexicon)}
              className="flex-1 min-w-[130px] px-3 py-2 border border-[#E8E2D9] bg-white text-stone-800 rounded-sm text-center hover:border-stone-400 transition-colors"
            >
              Cosmetic Lexicon
            </button>
            <button
              type="button"
              onClick={() => handleMobileAction(onOpenRoutineMatcher)}
              className="flex-1 min-w-[130px] px-3 py-2 border border-[#E8E2D9] bg-white text-stone-800 rounded-sm text-center hover:border-stone-400 transition-colors"
            >
              Regimen Matcher
            </button>
            {onOpenKeywordMap && (
              <button
                type="button"
                onClick={() => handleMobileAction(onOpenKeywordMap)}
                className="w-full px-3 py-2 border border-[#E8E2D9] bg-[#F7F4EE] text-stone-800 rounded-sm flex items-center justify-center gap-1.5 hover:border-stone-400 transition-colors"
              >
                <Key className="w-3 h-3 text-stone-600" />
                <span>Step 2 Keyword Map</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
