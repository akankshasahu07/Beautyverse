import React, { useState, useEffect, useMemo } from 'react';
import { BEAUTY_ARTICLES } from './data/articles';
import { BeautyArticle, BeautyCategory } from './types/article';
import { Header } from './components/Header';
import { HeroFeatured } from './components/HeroFeatured';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { RoutineMatcherModal } from './components/RoutineMatcherModal';
import { IngredientLexiconModal } from './components/IngredientLexiconModal';
import { SavedDrawer } from './components/SavedDrawer';
import { Footer } from './components/Footer';
import { Sparkles, SlidersHorizontal, ArrowRight, BookOpen, Check } from 'lucide-react';

export default function App() {
  // Navigation & View state
  const [selectedArticle, setSelectedArticle] = useState<BeautyArticle | null>(null);
  const [currentCategory, setCurrentCategory] = useState<BeautyCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [readTimeFilter, setReadTimeFilter] = useState<'All' | 'Under7' | 'Over7'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'readTime' | 'title'>('featured');

  // Bookmarking / Reading list state
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('elixir_derma_saved');
      return stored ? JSON.parse(stored) : ['retinoid-renaissance-longevity', 'barrier-first-ceramides-lipid-replenishment'];
    } catch {
      return ['retinoid-renaissance-longevity', 'barrier-first-ceramides-lipid-replenishment'];
    }
  });

  // Modals state
  const [isRoutineMatcherOpen, setIsRoutineMatcherOpen] = useState(false);
  const [isLexiconOpen, setIsLexiconOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync saved bookmarks with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('elixir_derma_saved', JSON.stringify(savedIds));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [savedIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleSaveArticle = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(item => item !== id));
      showToast('Article removed from your reading list');
    } else {
      setSavedIds([...savedIds, id]);
      showToast('Article saved to your personal folio');
    }
  };

  const handleClearSaved = () => {
    setSavedIds([]);
    showToast('Saved reading list cleared');
  };

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    return BEAUTY_ARTICLES.filter(article => {
      // Category filter
      if (currentCategory !== 'All' && article.category !== currentCategory) {
        return false;
      }
      // Read time filter
      const minutes = parseInt(article.readTime, 10) || 6;
      if (readTimeFilter === 'Under7' && minutes > 6) return false;
      if (readTimeFilter === 'Over7' && minutes <= 6) return false;

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesDek = article.dek.toLowerCase().includes(q);
        const matchesCategory = article.category.toLowerCase().includes(q);
        const matchesActive = article.heroIngredients.some(i => i.name.toLowerCase().includes(q));
        const matchesConcern = article.targetSkinConcerns.some(c => c.toLowerCase().includes(q));
        return matchesTitle || matchesDek || matchesCategory || matchesActive || matchesConcern;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'readTime') {
        const minA = parseInt(a.readTime, 10) || 0;
        const minB = parseInt(b.readTime, 10) || 0;
        return minA - minB;
      }
      // 'featured' keeps original editorial curation order
      return 0;
    });
  }, [currentCategory, readTimeFilter, searchQuery, sortBy]);

  const savedArticlesList = useMemo(() => {
    return BEAUTY_ARTICLES.filter(a => savedIds.includes(a.id));
  }, [savedIds]);

  // Lead cover article is the first article
  const leadArticle = BEAUTY_ARTICLES[0];

  const categoriesList: (BeautyCategory | 'All')[] = [
    'All',
    'Active Skincare',
    'Barrier Repair',
    'K-Beauty Innovations',
    'Antioxidant Serums',
    'Suncare & Photoprotection',
    'Scalp & Hair Wellness',
    'Formulation Science',
    'Clean Cosmetics',
    'Biomimetic Actives',
    'Facial Oils & Lipids'
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-editorial-sans selection:bg-stone-200">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-sm shadow-xl flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header
        onNavigateHome={() => setSelectedArticle(null)}
        onSelectCategory={(cat) => {
          setSelectedArticle(null);
          setCurrentCategory(cat);
        }}
        onOpenRoutineMatcher={() => setIsRoutineMatcherOpen(true)}
        onOpenLexicon={() => setIsLexiconOpen(true)}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        savedCount={savedIds.length}
        currentCategory={currentCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* View routing: If an article is selected, render detail view, else catalog magazine view */}
      {selectedArticle ? (
        <ArticleDetail
          article={selectedArticle}
          onBack={() => {
            setSelectedArticle(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isSaved={savedIds.includes(selectedArticle.id)}
          onToggleSave={toggleSaveArticle}
          onSelectArticle={(art) => {
            setSelectedArticle(art);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          allArticles={BEAUTY_ARTICLES}
        />
      ) : (
        <main>
          {/* Cover Lead Story (Shown when no category filter and no search) */}
          {currentCategory === 'All' && !searchQuery.trim() && (
            <HeroFeatured
              article={leadArticle}
              onReadArticle={(art) => {
                setSelectedArticle(art);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isSaved={savedIds.includes(leadArticle.id)}
              onToggleSave={toggleSaveArticle}
            />
          )}

          {/* Interactive Editorial Filter Bar */}
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 border-b border-[#E8E2D9]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Category selector */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs">
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCurrentCategory(cat)}
                    className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-colors border ${
                      currentCategory === cat
                        ? 'bg-stone-900 text-white border-stone-900 font-medium'
                        : 'bg-white/80 text-stone-600 border-[#E8E2D9] hover:border-stone-400 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Utility secondary filters: Reading length & Sort */}
              <div className="flex items-center gap-4 shrink-0 text-xs">
                <div className="flex items-center gap-2 text-stone-500">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pacing:</span>
                  <select
                    value={readTimeFilter}
                    onChange={(e) => setReadTimeFilter(e.target.value as any)}
                    className="bg-white border border-[#E8E2D9] p-1.5 rounded-sm text-stone-700 text-xs focus:outline-none focus:border-stone-500"
                  >
                    <option value="All">All Read Times</option>
                    <option value="Under7">Quick (≤ 6 min)</option>
                    <option value="Over7">Deep Dive (7+ min)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-stone-500">
                  <span className="hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-[#E8E2D9] p-1.5 rounded-sm text-stone-700 text-xs focus:outline-none focus:border-stone-500"
                  >
                    <option value="featured">Curated Order</option>
                    <option value="readTime">Shortest Read</option>
                    <option value="title">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results metadata strip */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E8E2D9]/60 text-xs text-stone-500 font-editorial-sans">
              <div>
                Showing <span className="font-mono tabular-nums font-semibold text-stone-800">{filteredArticles.length}</span> of <span className="font-mono tabular-nums font-semibold text-stone-800">{BEAUTY_ARTICLES.length}</span> peer-reviewed essays
                {searchQuery && (
                  <span> matching "<strong className="text-stone-900">{searchQuery}</strong>"</span>
                )}
                {currentCategory !== 'All' && (
                  <span> in <strong className="text-stone-900">{currentCategory}</strong></span>
                )}
              </div>

              {(searchQuery || currentCategory !== 'All' || readTimeFilter !== 'All') && (
                <button
                  onClick={() => {
                    setCurrentCategory('All');
                    setSearchQuery('');
                    setReadTimeFilter('All');
                  }}
                  className="text-stone-800 hover:underline font-medium"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </section>

          {/* Catalog Articles Grid (All 10 Investigations) */}
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            {filteredArticles.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-[#E8E2D9] p-8">
                <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-3" />
                <h3 className="font-editorial-serif text-xl font-medium text-stone-900 mb-1">
                  No Articles Found
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                  No formulation essay matches your current filter criteria. Try searching for "ceramide", "retinal", "zinc", or resetting categories.
                </p>
                <button
                  onClick={() => {
                    setCurrentCategory('All');
                    setSearchQuery('');
                    setReadTimeFilter('All');
                  }}
                  className="px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-sm hover:bg-stone-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onRead={(art) => {
                      setSelectedArticle(art);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    isSaved={savedIds.includes(article.id)}
                    onToggleSave={toggleSaveArticle}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Editorial Callout Feature: Routine & Formulation Diagnosis */}
          <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
            <div className="border border-[#E8E2D9] bg-[#F3EFEA] p-8 sm:p-12 relative overflow-hidden">
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-editorial-sans">
                  <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                  <span>Clinical Consultation Tool</span>
                </div>
                <h3 className="font-editorial-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
                  Avoid Incompatible Actives in Your Daily Ritual
                </h3>
                <p className="text-stone-600 text-sm font-light leading-relaxed">
                  Layering acidic pure Vitamin C with fragile copper peptides can deactivate both compounds. Take our 60-second formulation diagnosis to verify your regimen against the scientific findings across all 10 essays.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setIsRoutineMatcherOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-stone-800 transition-all shadow-sm"
                  >
                    <span>Launch Routine Matcher</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Modals & Drawers */}
      <RoutineMatcherModal
        isOpen={isRoutineMatcherOpen}
        onClose={() => setIsRoutineMatcherOpen(false)}
        articles={BEAUTY_ARTICLES}
        onSelectArticle={(art) => {
          setSelectedArticle(art);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <IngredientLexiconModal
        isOpen={isLexiconOpen}
        onClose={() => setIsLexiconOpen(false)}
      />

      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={(art) => {
          setSelectedArticle(art);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRemoveSaved={toggleSaveArticle}
        onClearAll={handleClearSaved}
      />

      {/* Colophon & Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedArticle(null);
          setCurrentCategory(cat);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenRoutineMatcher={() => setIsRoutineMatcherOpen(true)}
        onOpenLexicon={() => setIsLexiconOpen(true)}
      />
    </div>
  );
}
