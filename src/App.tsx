import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BEAUTY_ARTICLES } from './data/articles';
import { BeautyArticle, BeautyProductType } from './types/article';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { BlogHub } from './components/BlogHub';
import { ArticleDetail } from './components/ArticleDetail';
import { RoutineMatcherModal } from './components/RoutineMatcherModal';
import { IngredientLexiconModal } from './components/IngredientLexiconModal';
import { SeoKeywordMapModal } from './components/SeoKeywordMapModal';
import { SavedDrawer } from './components/SavedDrawer';
import { Footer } from './components/Footer';
import { Check } from 'lucide-react';
import { 
  parseCurrentRoute, 
  navigateTo, 
  updateSeoMetadata, 
  getArticleUrl, 
  getHomeUrl, 
  getArticlesHubUrl 
} from './utils/seoRouter';

export default function App() {
  // Compute initial route based on browser URL
  const initialRoute = useMemo(() => parseCurrentRoute(BEAUTY_ARTICLES), []);
  const initialArticle = useMemo(() => {
    if (initialRoute.view === 'detail' && initialRoute.slug) {
      return BEAUTY_ARTICLES.find(a => a.slug === initialRoute.slug || a.id === initialRoute.slug) || null;
    }
    return null;
  }, [initialRoute]);

  // Main view router: 'home' | 'articles' | 'detail'
  const [currentView, setCurrentView] = useState<'home' | 'articles' | 'detail'>(initialRoute.view);
  const [selectedArticle, setSelectedArticle] = useState<BeautyArticle | null>(initialArticle);
  const [selectedProductType, setSelectedProductType] = useState<BeautyProductType | 'All'>(
    initialRoute.productType || 'All'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [readTimeFilter, setReadTimeFilter] = useState<'All' | 'Under7' | 'Over7'>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'readTime' | 'title' | 'rating'>('featured');

  // Bookmarking / Reading list state
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('elixir_derma_saved');
      return stored ? JSON.parse(stored) : ['velvet-lipstick-formulation-science', 'ultimate-serum-layering-radiance'];
    } catch {
      return ['velvet-lipstick-formulation-science', 'ultimate-serum-layering-radiance'];
    }
  });

  // Modals state
  const [isRoutineMatcherOpen, setIsRoutineMatcherOpen] = useState(false);
  const [isLexiconOpen, setIsLexiconOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);
  const [isKeywordMapOpen, setIsKeywordMapOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync route and metadata with browser URL changes (popstate & route events)
  const syncRouteFromUrl = useCallback(() => {
    const route = parseCurrentRoute(BEAUTY_ARTICLES);
    if (route.view === 'detail' && route.slug) {
      const art = BEAUTY_ARTICLES.find(a => a.slug === route.slug || a.id === route.slug);
      if (art) {
        setSelectedArticle(art);
        setCurrentView('detail');
        updateSeoMetadata(art, 'detail');
        return;
      }
    }
    
    if (route.view === 'articles') {
      setSelectedArticle(null);
      setCurrentView('articles');
      if (route.productType) {
        setSelectedProductType(route.productType);
      }
      updateSeoMetadata(null, 'articles');
      return;
    }

    // Default to Home
    setSelectedArticle(null);
    setCurrentView('home');
    if (typeof window !== 'undefined' && (window.location.pathname === '/' || window.location.pathname === '')) {
      window.history.replaceState(null, '', getHomeUrl());
    }
    updateSeoMetadata(null, 'home');
  }, []);

  useEffect(() => {
    syncRouteFromUrl();

    window.addEventListener('popstate', syncRouteFromUrl);
    window.addEventListener('elixir-route-change', syncRouteFromUrl);
    return () => {
      window.removeEventListener('popstate', syncRouteFromUrl);
      window.removeEventListener('elixir-route-change', syncRouteFromUrl);
    };
  }, [syncRouteFromUrl]);

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
      showToast('Article removed from your reading folio');
    } else {
      setSavedIds([...savedIds, id]);
      showToast('Article saved to your personal folio');
    }
  };

  const handleClearSaved = () => {
    setSavedIds([]);
    showToast('Saved reading list cleared');
  };

  const handleReadArticle = (article: BeautyArticle) => {
    setSelectedArticle(article);
    setCurrentView('detail');
    navigateTo(getArticleUrl(article));
    updateSeoMetadata(article, 'detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setSelectedArticle(null);
    setCurrentView('home');
    navigateTo(getHomeUrl());
    updateSeoMetadata(null, 'home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateArticles = () => {
    setSelectedArticle(null);
    setSelectedProductType('All');
    setCurrentView('articles');
    navigateTo(getArticlesHubUrl('All'));
    updateSeoMetadata(null, 'articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterProductType = (pType: BeautyProductType | 'All') => {
    setSelectedProductType(pType);
    setSelectedArticle(null);
    setCurrentView('articles');
    navigateTo(getArticlesHubUrl(pType));
    updateSeoMetadata(null, 'articles');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const savedArticlesList = useMemo(() => {
    return BEAUTY_ARTICLES.filter(a => savedIds.includes(a.id));
  }, [savedIds]);

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
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        onNavigateArticles={handleNavigateArticles}
        onSelectProductType={handleFilterProductType}
        selectedProductType={selectedProductType}
        onOpenRoutineMatcher={() => setIsRoutineMatcherOpen(true)}
        onOpenLexicon={() => setIsLexiconOpen(true)}
        onOpenSavedDrawer={() => setIsSavedDrawerOpen(true)}
        savedCount={savedIds.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenKeywordMap={() => setIsKeywordMapOpen(true)}
      />

      {/* View routing: Home Page, Articles Hub, or Article Detail */}
      {currentView === 'detail' && selectedArticle ? (
        <ArticleDetail
          article={selectedArticle}
          onBack={handleNavigateArticles}
          isSaved={savedIds.includes(selectedArticle.id)}
          onToggleSave={toggleSaveArticle}
          onSelectArticle={handleReadArticle}
          allArticles={BEAUTY_ARTICLES}
          onOpenKeywordMap={() => setIsKeywordMapOpen(true)}
        />
      ) : currentView === 'articles' ? (
        <BlogHub
          articles={BEAUTY_ARTICLES}
          selectedProductType={selectedProductType}
          onSelectProductType={setSelectedProductType}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          readTimeFilter={readTimeFilter}
          onReadTimeFilterChange={setReadTimeFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          savedIds={savedIds}
          onToggleSave={toggleSaveArticle}
          onReadArticle={handleReadArticle}
          onOpenKeywordMap={() => setIsKeywordMapOpen(true)}
        />
      ) : (
        <HomePage
          articles={BEAUTY_ARTICLES}
          onReadArticle={handleReadArticle}
          onNavigateArticles={handleNavigateArticles}
          onFilterProductType={handleFilterProductType}
          savedIds={savedIds}
          onToggleSave={toggleSaveArticle}
          onOpenRoutineMatcher={() => setIsRoutineMatcherOpen(true)}
          onOpenLexicon={() => setIsLexiconOpen(true)}
          onOpenKeywordMap={() => setIsKeywordMapOpen(true)}
        />
      )}

      {/* Modals & Drawers */}
      <RoutineMatcherModal
        isOpen={isRoutineMatcherOpen}
        onClose={() => setIsRoutineMatcherOpen(false)}
        articles={BEAUTY_ARTICLES}
        onSelectArticle={handleReadArticle}
      />

      <IngredientLexiconModal
        isOpen={isLexiconOpen}
        onClose={() => setIsLexiconOpen(false)}
      />

      <SeoKeywordMapModal
        isOpen={isKeywordMapOpen}
        onClose={() => setIsKeywordMapOpen(false)}
      />

      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={handleReadArticle}
        onRemoveSaved={toggleSaveArticle}
        onClearAll={handleClearSaved}
      />

      {/* Colophon & Footer */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onNavigateArticlesWithProduct={handleFilterProductType}
        onOpenRoutineMatcher={() => setIsRoutineMatcherOpen(true)}
        onOpenLexicon={() => setIsLexiconOpen(true)}
        onOpenKeywordMap={() => setIsKeywordMapOpen(true)}
      />
    </div>
  );
}
