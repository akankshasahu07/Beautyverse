import React from 'react';
import { Bookmark, Clock, ArrowUpRight } from 'lucide-react';
import { BeautyArticle } from '../types/article';

interface ArticleCardProps {
  article: BeautyArticle;
  onRead: (article: BeautyArticle) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onRead,
  isSaved,
  onToggleSave
}) => {
  return (
    <article className="group flex flex-col justify-between border border-[#E8E2D9] bg-white hover:border-stone-400/80 transition-all duration-300 p-5 sm:p-6 relative">
      <div>
        {/* Unboxed Metadata Strip (Zero-Pill Discipline) */}
        <div className="flex items-center justify-between text-[11px] text-stone-500 mb-3 uppercase tracking-wider font-editorial-sans">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-stone-900 font-medium">{article.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(article.id);
            }}
            aria-label={isSaved ? 'Remove from saved reading' : 'Save article to reading list'}
            className="text-stone-400 hover:text-stone-900 p-1 transition-colors"
          >
            <Bookmark
              className={`w-4 h-4 ${isSaved ? 'fill-stone-900 text-stone-900' : ''}`}
            />
          </button>
        </div>

        {/* Thumbnail Image slot with resilient fallback */}
        <div 
          onClick={() => onRead(article)}
          className="relative aspect-[16/10] w-full overflow-hidden mb-4 bg-stone-100 cursor-pointer border border-[#E8E2D9]/60"
        >
          <img
            src={article.heroImage}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>

        {/* Primary Headline */}
        <h2 
          onClick={() => onRead(article)}
          className="font-editorial-serif text-xl sm:text-2xl font-medium tracking-tight text-stone-900 leading-snug cursor-pointer group-hover:text-stone-700 transition-colors text-balance mb-2.5"
        >
          {article.title}
        </h2>

        {/* Deck / Summary */}
        <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed line-clamp-3 mb-4">
          {article.dek}
        </p>
      </div>

      {/* Card Base: Active Molecule + Author & Read Action */}
      <div className="pt-4 border-t border-[#E8E2D9]/70 mt-auto">
        {/* Core Actives text snippet */}
        <div className="text-[11px] text-stone-500 mb-3 truncate">
          <span className="font-semibold text-stone-700">Key Actives: </span>
          <span>{article.heroIngredients.map(i => i.name).join(' · ')}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[11px] text-stone-500">
            <span className="font-medium text-stone-800">{article.author.name}</span>
            <span className="mx-1.5" aria-hidden="true">/</span>
            <span>{article.publishDate}</span>
          </div>

          <button
            onClick={() => onRead(article)}
            className="flex items-center gap-1 text-xs font-medium text-stone-900 hover:text-stone-600 group-hover:translate-x-0.5 transition-all"
          >
            <span>Read</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
