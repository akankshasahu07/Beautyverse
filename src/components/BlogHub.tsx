import React, { useMemo } from 'react';
import { SlidersHorizontal, BookOpen, Search } from 'lucide-react';
import { BeautyArticle, BeautyProductType } from '../types/article';
import { ArticleCard } from './ArticleCard';
import { getArticlesHubUrl } from '../utils/seoRouter';
import { Key } from 'lucide-react';

interface BlogHubProps {
  articles: BeautyArticle[];
  selectedProductType: BeautyProductType | 'All';
  onSelectProductType: (pType: BeautyProductType | 'All') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  readTimeFilter: 'All' | 'Under7' | 'Over7';
  onReadTimeFilterChange: (val: 'All' | 'Under7' | 'Over7') => void;
  sortBy: 'featured' | 'readTime' | 'title' | 'rating';
  onSortChange: (val: 'featured' | 'readTime' | 'title' | 'rating') => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onReadArticle: (article: BeautyArticle) => void;
  onOpenKeywordMap?: () => void;
}

export const BlogHub: React.FC<BlogHubProps> = ({
  articles,
  selectedProductType,
  onSelectProductType,
  searchQuery,
  onSearchChange,
  readTimeFilter,
  onReadTimeFilterChange,
  sortBy,
  onSortChange,
  savedIds,
  onToggleSave,
  onReadArticle,
  onOpenKeywordMap
}) => {
  const productTypesList: (BeautyProductType | 'All')[] = [
    'All',
    'Lipstick',
    'Serum',
    'Compact Powder',
    'Sunscreen',
    'Blush',
    'Foundation & Tint',
    'Cleansing Balm',
    'Eye Cream',
    'Setting Mist',
    'Barrier Cream'
  ];

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      // Product type filter
      if (selectedProductType !== 'All' && article.productType !== selectedProductType) {
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
        const matchesType = article.productType.toLowerCase().includes(q);
        const matchesCategory = article.category.toLowerCase().includes(q);
        const matchesActive = article.heroIngredients.some(i => i.name.toLowerCase().includes(q));
        const matchesConcern = article.targetSkinConcerns.some(c => c.toLowerCase().includes(q));
        return matchesTitle || matchesDek || matchesType || matchesCategory || matchesActive || matchesConcern;
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
      if (sortBy === 'rating') {
        const rateA = a.productFormulations[0]?.ratingScore || 0;
        const rateB = b.productFormulations[0]?.ratingScore || 0;
        return rateB - rateA;
      }
      return 0;
    });
  }, [articles, selectedProductType, readTimeFilter, searchQuery, sortBy]);

  return (
    <div className="pb-16">
      {/* Blog Hub Title Banner */}
      <section className="border-b border-[#E8E2D9] py-8 lg:py-12 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="text-xs uppercase tracking-widest text-stone-500 font-editorial-sans flex items-center gap-2">
                <span className="font-semibold text-stone-900">Blog Archive</span>
                <span aria-hidden="true">·</span>
                <span>10 Clinical Beauty Product Investigations</span>
              </div>
              <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 leading-tight">
                Beauty Product Guides & Editorial Investigations
              </h1>
              <p className="text-stone-600 text-sm sm:text-base font-light leading-relaxed">
                Browse our peer-reviewed beauty product guides and investigations. Explore clinical breakdowns of active skincare ingredients, clean makeup formulations, and dermatological wearability across 10 essential beauty product categories.
              </p>
            </div>

            {onOpenKeywordMap && (
              <button
                onClick={onOpenKeywordMap}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[#E8E2D9] bg-white hover:border-stone-400 text-stone-800 text-xs rounded-sm transition-colors self-start shrink-0 cursor-pointer shadow-2xs font-editorial-sans uppercase tracking-wider"
              >
                <Key className="w-3.5 h-3.5 text-stone-700" />
                <span>Step 2 Keyword Map</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Filter and Control Bar */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-8 border-b border-[#E8E2D9]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Product Type Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none text-xs">
            {productTypesList.map((pType) => (
              <a
                key={pType}
                href={getArticlesHubUrl(pType)}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectProductType(pType);
                }}
                className={`px-3 py-1.5 rounded-sm whitespace-nowrap transition-colors border block ${
                  selectedProductType === pType
                    ? 'bg-stone-900 text-white border-stone-900 font-medium'
                    : 'bg-white/80 text-stone-600 border-[#E8E2D9] hover:border-stone-400 hover:text-stone-900'
                }`}
              >
                {pType === 'All' ? 'All (10)' : pType}
              </a>
            ))}
          </div>

          {/* Secondary Filters: Pacing & Sort */}
          <div className="flex items-center gap-4 shrink-0 text-xs">
            <div className="flex items-center gap-2 text-stone-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pacing:</span>
              <select
                value={readTimeFilter}
                onChange={(e) => onReadTimeFilterChange(e.target.value as any)}
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
                onChange={(e) => onSortChange(e.target.value as any)}
                className="bg-white border border-[#E8E2D9] p-1.5 rounded-sm text-stone-700 text-xs focus:outline-none focus:border-stone-500"
              >
                <option value="featured">Curated Order</option>
                <option value="rating">Top Rated Formulation</option>
                <option value="readTime">Shortest Read</option>
                <option value="title">Alphabetical</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Metadata & Search Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-[#E8E2D9]/60 text-xs text-stone-500 font-editorial-sans">
          <div>
            Showing <span className="font-mono tabular-nums font-semibold text-stone-800">{filteredArticles.length}</span> of <span className="font-mono tabular-nums font-semibold text-stone-800">{articles.length}</span> blog investigations
            {searchQuery && (
              <span> matching "<strong className="text-stone-900">{searchQuery}</strong>"</span>
            )}
            {selectedProductType !== 'All' && (
              <span> in <strong className="text-stone-900">{selectedProductType}</strong></span>
            )}
          </div>

          {(searchQuery || selectedProductType !== 'All' || readTimeFilter !== 'All') && (
            <button
              onClick={() => {
                onSelectProductType('All');
                onSearchChange('');
                onReadTimeFilterChange('All');
              }}
              className="text-stone-800 hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>
      </section>

      {/* Grid of Articles */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {filteredArticles.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-[#E8E2D9] p-8 bg-white/50">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-3" />
            <h3 className="font-editorial-serif text-xl font-medium text-stone-900 mb-1">
              No Articles Found
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4 font-light">
              No beauty product investigation matches your search. Try searching for "lipstick", "serum", "compact", "sunscreen", or clearing filters.
            </p>
            <button
              onClick={() => {
                onSelectProductType('All');
                onSearchChange('');
                onReadTimeFilterChange('All');
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
                  onReadArticle(art);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                isSaved={savedIds.includes(article.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
