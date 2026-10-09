import React from 'react';
import { ArrowRight, Bookmark, Clock, UserCheck } from 'lucide-react';
import { BeautyArticle } from '../types/article';

interface HeroFeaturedProps {
  article: BeautyArticle;
  onReadArticle: (article: BeautyArticle) => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
}

export const HeroFeatured: React.FC<HeroFeaturedProps> = ({
  article,
  onReadArticle,
  isSaved,
  onToggleSave
}) => {
  return (
    <section className="border-b border-[#E8E2D9] pb-12 lg:pb-16 pt-6 lg:pt-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Curatorial Header Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8E2D9]/80 text-[11px] uppercase tracking-widest text-stone-500 font-editorial-sans">
          <div className="flex items-center gap-2">
            <span className="text-stone-900 font-semibold">Lead Feature</span>
            <span aria-hidden="true">·</span>
            <span>Cover Investigation</span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              <span>{article.readTime}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
          </div>
        </div>

        {/* Lead Grid Layout: Dominant Visual & Typographic Spine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Typographic Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 leading-[1.15] text-balance">
              {article.title}
            </h1>

            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
              {article.dek}
            </p>

            {/* Editorial Lead Pullquote */}
            <div className="py-4 border-y border-[#E8E2D9] my-6">
              <p className="font-editorial-serif italic text-stone-800 text-lg lg:text-xl leading-relaxed">
                "{article.leadPullQuote}"
              </p>
              <div className="mt-2 text-xs text-stone-500 uppercase tracking-widest">
                — {article.author.name}, {article.author.role}
              </div>
            </div>

            {/* Actions & Author Details */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center font-editorial-serif text-sm font-semibold text-stone-800">
                  {article.author.avatarInitials}
                </div>
                <div>
                  <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                    <span>{article.author.name}</span>
                    <span title="Verified Medical Author">
                      <UserCheck className="w-3 h-3 text-emerald-700" />
                    </span>
                  </div>
                  <div className="text-[11px] text-stone-500 font-light">
                    {article.author.credentials}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleSave(article.id)}
                  aria-label={isSaved ? 'Remove from saved' : 'Save article'}
                  className={`p-2.5 border rounded-sm transition-colors ${
                    isSaved
                      ? 'border-stone-800 bg-stone-900 text-white'
                      : 'border-[#E8E2D9] text-stone-700 hover:border-stone-400 bg-white/70'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onReadArticle(article)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-wider rounded-sm transition-all group shadow-sm"
                >
                  <span>Read Full Investigation</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Visual Column (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div 
              onClick={() => onReadArticle(article)}
              className="relative cursor-pointer group overflow-hidden border border-[#E8E2D9] bg-stone-100"
            >
              <div className="aspect-[4/3] lg:aspect-[1/1] w-full relative">
                <img
                  src={article.heroImage}
                  alt={article.imageAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
              </div>
            </div>
            <figcaption className="mt-2.5 text-xs text-stone-500 font-editorial-serif italic">
              {article.imageCaption}
            </figcaption>
          </div>
        </div>
      </div>
    </section>
  );
};
