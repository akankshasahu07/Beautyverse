import React from 'react';
import { ArrowRight, Bookmark, Clock, Sparkles, Check, Star, ShieldCheck, Heart, Link2, Key } from 'lucide-react';
import { BeautyArticle, BeautyProductType } from '../types/article';
import { getArticleUrl, getArticlesHubUrl } from '../utils/seoRouter';

interface HomePageProps {
  articles: BeautyArticle[];
  onReadArticle: (article: BeautyArticle) => void;
  onNavigateArticles: () => void;
  onFilterProductType: (pType: BeautyProductType) => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenRoutineMatcher: () => void;
  onOpenLexicon: () => void;
  onOpenKeywordMap?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  articles,
  onReadArticle,
  onNavigateArticles,
  onFilterProductType,
  savedIds,
  onToggleSave,
  onOpenRoutineMatcher,
  onOpenLexicon,
  onOpenKeywordMap
}) => {
  const leadArticle = articles[0]; // Velvet Lipstick
  const serumArticle = articles[1]; // Serum
  const compactArticle = articles[2]; // Compact Powder
  const sunscreenArticle = articles[3]; // Sunscreen
  const blushArticle = articles[4]; // Blush
  const foundationArticle = articles[5]; // Foundation & Tint

  const HOME_HERO_IMAGE = '/src/assets/images/home_hero_beauty_collection_1791632078081.jpg';

  const spotlightProducts = [
    {
      type: 'Lipstick' as BeautyProductType,
      title: 'Velvet Lipsticks',
      tagline: 'Hydrating Matte Elastomers & Peptides',
      article: leadArticle,
      image: leadArticle.heroImage,
      finish: 'Velvet Matte',
      keyMolecule: 'Palmitoyl Tripeptide-38 & Squalane'
    },
    {
      type: 'Serum' as BeautyProductType,
      title: 'Facial Serums',
      tagline: 'Multi-Depth Hyaluronic & THD Vitamin C',
      article: serumArticle,
      image: serumArticle.heroImage,
      finish: 'Dewy Satin',
      keyMolecule: '7-Tier Hyaluronic Complex'
    },
    {
      type: 'Compact Powder' as BeautyProductType,
      title: 'Finishing Compacts',
      tagline: 'Talc-Free Micro-Milled Spherical Silica',
      article: compactArticle,
      image: compactArticle.heroImage,
      finish: 'Soft Focus Blurred',
      keyMolecule: 'Spherical Silica & Jojoba Esters'
    },
    {
      type: 'Sunscreen' as BeautyProductType,
      title: 'Invisible Sunscreens',
      tagline: 'Non-Nano Zinc & Priming Fluid Shields',
      article: sunscreenArticle,
      image: sunscreenArticle.heroImage,
      finish: 'Invisible Glow',
      keyMolecule: '20% Non-Nano Zinc Oxide & Ectoin'
    },
    {
      type: 'Blush' as BeautyProductType,
      title: 'Dewy Liquid Blushes',
      tagline: 'Hyaluronic Cheek Petal Droplets',
      article: blushArticle,
      image: blushArticle.heroImage,
      finish: 'Dewy Satin',
      keyMolecule: 'Sodium Hyaluronate & Rose Hydrolat'
    },
    {
      type: 'Foundation & Tint' as BeautyProductType,
      title: 'Serum Foundations',
      tagline: 'Squalane Tints & Amino-Coated Minerals',
      article: foundationArticle,
      image: foundationArticle.heroImage,
      finish: 'Natural Luminous',
      keyMolecule: '100% Plant Squalane & Lauroyl Lysine'
    }
  ];

  return (
    <div className="space-y-14 lg:space-y-20 pb-16">
      {/* Editorial Marquee Hero: Lead Beauty Product Investigation */}
      <section className="border-b border-[#E8E2D9] pt-6 lg:pt-10 pb-12 lg:pb-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Masthead Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-6 border-b border-[#E8E2D9] text-[11px] uppercase tracking-widest text-stone-500 font-editorial-sans">
            <div className="flex items-center gap-2">
              <span className="text-stone-900 font-semibold">ÉLIXIR & DERMA</span>
              <span aria-hidden="true">·</span>
              <span>Beauty and Skincare Blog</span>
              <span aria-hidden="true">·</span>
              <span>Reviews & Ingredient Science</span>
            </div>
            <div className="flex items-center gap-3">
              {onOpenKeywordMap && (
                <button
                  onClick={onOpenKeywordMap}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[#E8E2D9] bg-white hover:border-stone-400 text-stone-800 text-[10px] rounded-xs transition-colors cursor-pointer shadow-2xs"
                  title="Inspect Step 2 keyword strategy map"
                >
                  <Key className="w-3 h-3 text-stone-700" />
                  <span>Step 2 Keyword Map</span>
                </button>
              )}
              <span>ISSN 2984-9102</span>
              <span aria-hidden="true">·</span>
              <span>10 Clinical Investigations</span>
            </div>
          </div>

          {/* Editorial Mission Statement naturally integrating Homepage keywords */}
          <div className="mb-10 pb-6 border-b border-[#E8E2D9]/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-widest text-stone-500 font-editorial-sans mb-1">
                The Science of Radiant Formulations
              </p>
              <h1 className="font-editorial-serif text-lg sm:text-xl text-stone-800 font-light leading-relaxed">
                Welcome to ÉLIXIR & DERMA, an independent <strong className="font-medium text-stone-900">beauty and skincare blog</strong> delivering comprehensive <strong className="font-medium text-stone-900">beauty product reviews</strong> and clinical analyses of <strong className="font-medium text-stone-900">beauty and skincare ingredients</strong> across 10 essential product tiers.
              </h1>
            </div>
            <div className="flex items-center gap-2 shrink-0 text-xs font-editorial-sans text-stone-600 bg-[#F7F4EE] px-3 py-1.5 border border-[#E8E2D9] rounded-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Keyword Focus: Blog · Reviews · Ingredients</span>
            </div>
          </div>

          {/* Lead 2-Column Split: Lipstick Editorial Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs uppercase tracking-widest text-stone-600 font-editorial-sans flex items-center gap-2">
                <span className="font-semibold text-stone-900">Cover Feature: {leadArticle.productType}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-stone-400" />
                  <span>{leadArticle.readTime}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span>{leadArticle.publishDate}</span>
              </div>

              <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-900 leading-[1.14] text-balance">
                <a
                  href={getArticleUrl(leadArticle)}
                  onClick={(e) => {
                    e.preventDefault();
                    onReadArticle(leadArticle);
                  }}
                  className="hover:underline decoration-stone-300 underline-offset-4"
                >
                  {leadArticle.title}
                </a>
              </h2>

              <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                {leadArticle.dek} As highlighted in our latest <span className="font-medium text-stone-800">beauty product reviews</span>, understanding how active pigments bond with skin lipids is vital for lasting wear.
              </p>

              {/* Lead Pullquote */}
              <div className="py-4 border-y border-[#E8E2D9] my-4">
                <p className="font-editorial-serif italic text-stone-800 text-lg lg:text-xl leading-relaxed">
                  "{leadArticle.leadPullQuote}"
                </p>
                <div className="mt-2 text-xs text-stone-500 uppercase tracking-widest">
                  — {leadArticle.author.name}, {leadArticle.author.role}
                </div>
              </div>

              {/* Action Cluster */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center font-editorial-serif text-sm font-semibold text-stone-800">
                    {leadArticle.author.avatarInitials}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-stone-900">
                      {leadArticle.author.name}
                    </div>
                    <div className="text-[11px] text-stone-500 font-light">
                      {leadArticle.author.credentials}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleSave(leadArticle.id)}
                    aria-label={savedIds.includes(leadArticle.id) ? 'Remove from saved' : 'Save article'}
                    className={`p-2.5 border rounded-sm transition-colors ${
                      savedIds.includes(leadArticle.id)
                        ? 'border-stone-800 bg-stone-900 text-white'
                        : 'border-[#E8E2D9] text-stone-700 hover:border-stone-400 bg-white/70'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <a
                    href={getArticleUrl(leadArticle)}
                    onClick={(e) => {
                      e.preventDefault();
                      onReadArticle(leadArticle);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium uppercase tracking-wider rounded-sm transition-all group shadow-sm"
                  >
                    <span>Read Lipstick Investigation</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Featured Visual Image: Complete Beauty Product Essentials */}
            <div className="lg:col-span-5">
              <a 
                href={getArticleUrl(leadArticle)}
                onClick={(e) => {
                  e.preventDefault();
                  onReadArticle(leadArticle);
                }}
                className="block relative cursor-pointer group overflow-hidden border border-[#E8E2D9] bg-stone-100 shadow-xs"
              >
                <div className="aspect-[4/3] w-full relative">
                  <img
                    src={HOME_HERO_IMAGE}
                    alt="The 2026 Beauty Product Essentials: active serum dropper, velvet compact powder, satin lipstick, and fluid sunscreen on travertine stone"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-transparent transition-colors" />
                </div>
              </a>
              <figcaption className="mt-2.5 text-xs text-stone-500 font-editorial-serif italic">
                Fig. 1 — The 2026 Beauty Product Cabinet: clinical serum, micro-milled velvet compact powder, peptide satin lipstick, and fluid SPF 50+.
              </figcaption>
            </div>
          </div>
        </div>
      </section>

      {/* The 6 Core Beauty Product Categories Spotlight */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 pb-4 border-b border-[#E8E2D9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-editorial-sans mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-stone-700" />
              <span>Beauty and Skincare Ingredients Spotlight</span>
            </div>
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900">
              The Beauty Product Cabinet: 6 Formulations in Focus
            </h2>
          </div>
          <button
            onClick={onNavigateArticles}
            className="text-xs uppercase tracking-wider font-semibold text-stone-800 hover:text-stone-950 flex items-center gap-1 group self-start sm:self-auto"
          >
            <span>View All 10 Blog Articles</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 6 Category Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {spotlightProducts.map((item, idx) => (
            <div
              key={idx}
              className="border border-[#E8E2D9] bg-white p-5 flex flex-col justify-between hover:border-stone-400 transition-all duration-300 group"
            >
              <div>
                {/* Visual Thumbnail */}
                <a 
                  href={getArticleUrl(item.article)}
                  onClick={(e) => {
                    e.preventDefault();
                    onReadArticle(item.article);
                  }}
                  className="block aspect-[4/3] w-full overflow-hidden bg-stone-100 mb-4 cursor-pointer relative border border-[#E8E2D9]/70"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[10px] font-semibold uppercase tracking-wider text-stone-800 px-2.5 py-1 border border-[#E8E2D9]">
                    {item.type}
                  </div>
                </a>

                {/* Unboxed Metadata */}
                <div className="flex items-center gap-2 text-[11px] text-stone-500 uppercase tracking-wider mb-1.5 font-editorial-sans">
                  <span className="text-stone-900 font-medium">Finish: {item.finish}</span>
                  <span aria-hidden="true">·</span>
                  <span>{item.article.readTime}</span>
                </div>

                <h3 className="font-editorial-serif text-xl font-medium text-stone-900 group-hover:text-stone-700 cursor-pointer leading-snug mb-2">
                  <a
                    href={getArticleUrl(item.article)}
                    onClick={(e) => {
                      e.preventDefault();
                      onReadArticle(item.article);
                    }}
                    className="hover:underline decoration-stone-300 underline-offset-4"
                  >
                    {item.title}
                  </a>
                </h3>

                <p className="text-xs text-stone-600 font-light leading-relaxed mb-4">
                  {item.tagline}. {item.article.dek}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-xs">
                <div className="text-[11px] text-stone-500 truncate max-w-[180px]">
                  <strong className="font-medium text-stone-800">Active: </strong>
                  <span>{item.keyMolecule}</span>
                </div>

                <a
                  href={getArticleUrl(item.article)}
                  onClick={(e) => {
                    e.preventDefault();
                    onReadArticle(item.article);
                  }}
                  className="flex items-center gap-1 font-medium text-stone-900 hover:text-stone-600 group-hover:translate-x-0.5 transition-all shrink-0"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editor's Formulation Bench: Product Archetype Ratings & Texture Notes */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="p-8 sm:p-10 border border-[#E8E2D9] bg-[#F7F4EE]">
          <div className="max-w-3xl mb-8">
            <div className="text-xs uppercase tracking-widest text-stone-500 font-editorial-sans mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Independent Laboratory Evaluation</span>
            </div>
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-2">
              Beauty Product Reviews: The 10 Formulations at a Glance
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Our <strong className="font-medium text-stone-800">beauty and skincare blog</strong> conducts rigorous <strong className="font-medium text-stone-800">beauty product reviews</strong>, analyzing cosmetic formulations against clinical benchmarks for biocompatible <strong className="font-medium text-stone-800">beauty and skincare ingredients</strong>, dermal purity, sensory slip, and photographic wearability.
            </p>
          </div>

          {/* Quick Product Archetype Definition Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.slice(0, 8).map((art) => {
              const primaryProduct = art.productFormulations[0];
              return (
                <a
                  key={art.id}
                  href={getArticleUrl(art)}
                  onClick={(e) => {
                    e.preventDefault();
                    onReadArticle(art);
                  }}
                  className="bg-white p-4 border border-[#E8E2D9] hover:border-stone-400 transition-colors cursor-pointer flex flex-col justify-between group block"
                >
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-stone-500 mb-1">
                      <span className="font-semibold text-stone-800">{art.productType}</span>
                      <span className="flex items-center gap-1 font-mono font-medium text-amber-700">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{primaryProduct.ratingScore}</span>
                      </span>
                    </div>

                    <h4 className="font-editorial-serif text-base font-medium text-stone-900 group-hover:text-stone-700 leading-snug mb-1.5">
                      {primaryProduct.title}
                    </h4>

                    <div className="text-[11px] text-stone-500 italic mb-2 line-clamp-2">
                      "{primaryProduct.textureNote}"
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E8E2D9]/70 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-editorial-sans">
                      Finish: <strong className="text-stone-700">{primaryProduct.finish}</strong>
                    </span>
                    <span className="text-stone-900 font-medium group-hover:underline flex items-center gap-0.5">
                      Read
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Directory of All 10 Blog Articles */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-[#E8E2D9]">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-editorial-sans mb-1">
              Complete Editorial Collection
            </div>
            <h2 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900">
              All 10 In-Depth Beauty Product Reviews & Guides
            </h2>
          </div>
          <button
            onClick={onNavigateArticles}
            className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-stone-900 border border-stone-800 hover:bg-stone-900 hover:text-white transition-colors self-start sm:self-auto rounded-sm"
          >
            Open Article Catalog & Search
          </button>
        </div>

        {/* 10 Articles Row-by-Row Minimalist Editorial Table */}
        <div className="divide-y divide-[#E8E2D9] border-y border-[#E8E2D9]">
          {articles.map((art, index) => (
            <div
              key={art.id}
              className="py-4 sm:py-5 px-2 hover:bg-white/80 transition-colors group flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start sm:items-center gap-4">
                <span className="font-mono text-xs text-stone-400 w-6 shrink-0 mt-0.5 sm:mt-0">
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>

                <div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-500 uppercase tracking-wider mb-1 font-editorial-sans flex-wrap">
                    <span className="text-stone-900 font-semibold">{art.productType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono lowercase text-[10px] text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-xs">
                      /article/{art.slug}
                    </span>
                  </div>

                  <h3 className="font-editorial-serif text-lg sm:text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                    <a
                      href={getArticleUrl(art)}
                      onClick={(e) => {
                        e.preventDefault();
                        onReadArticle(art);
                      }}
                      className="hover:underline decoration-stone-300 underline-offset-4"
                    >
                      {art.title}
                    </a>
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 text-xs pl-10 md:pl-0">
                <span className="text-stone-500 font-light hidden sm:inline">
                  By {art.author.name}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(art.id);
                  }}
                  className="text-stone-400 hover:text-stone-900 p-1"
                  aria-label={savedIds.includes(art.id) ? 'Remove bookmark' : 'Bookmark article'}
                >
                  <Bookmark
                    className={`w-4 h-4 ${savedIds.includes(art.id) ? 'fill-stone-900 text-stone-900' : ''}`}
                  />
                </button>

                <a
                  href={getArticleUrl(art)}
                  onClick={(e) => {
                    e.preventDefault();
                    onReadArticle(art);
                  }}
                  className="flex items-center gap-1 font-medium text-stone-900 group-hover:translate-x-1 transition-transform"
                >
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Routine Matcher Banner Callout */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="border border-[#E8E2D9] bg-[#F3EFEA] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-editorial-sans">
              <Sparkles className="w-3.5 h-3.5 text-stone-700" />
              <span>Ingredient Diagnostic Tool</span>
            </div>
            <h2 className="font-editorial-serif text-3xl sm:text-4xl font-medium text-stone-900 leading-tight">
              Analyze Active Beauty and Skincare Ingredients in Your Routine
            </h2>
            <p className="text-stone-600 text-sm font-light leading-relaxed">
              Are your active serums clashing with your morning sunscreen or causing your foundation to pill? Consult our <strong className="font-medium text-stone-800">beauty and skincare blog</strong> diagnostic tool to assess ingredient synergy and read detailed <strong className="font-medium text-stone-800">beauty product reviews</strong> before layering new products.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onOpenRoutineMatcher}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-wider font-medium rounded-sm hover:bg-stone-800 transition-all shadow-sm"
              >
                <span>Launch Routine Matcher</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenLexicon}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-stone-800 border border-[#E8E2D9] text-xs uppercase tracking-wider font-medium rounded-sm hover:border-stone-400 transition-all"
              >
                <span>View Ingredient Lexicon</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
