import React, { useState } from 'react';
import { Send, Check, ShieldCheck } from 'lucide-react';
import { BeautyProductType } from '../types/article';
import { getHomeUrl, getArticlesHubUrl } from '../utils/seoRouter';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateArticlesWithProduct: (pType: BeautyProductType | 'All') => void;
  onOpenRoutineMatcher: () => void;
  onOpenLexicon: () => void;
  onOpenKeywordMap?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateArticlesWithProduct,
  onOpenRoutineMatcher,
  onOpenLexicon,
  onOpenKeywordMap
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="border-t border-[#E8E2D9] bg-[#F7F4EE] pt-14 pb-12 transition-colors font-editorial-sans text-stone-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-12 border-b border-[#E8E2D9]">
          {/* Brand Colophon */}
          <div className="md:col-span-4 space-y-4">
            <a 
              href={getHomeUrl()}
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="text-left inline-block"
              aria-label="ÉLIXIR & DERMA — Homepage"
            >
              <span className="font-editorial-serif text-2xl font-medium tracking-tight text-stone-900 block hover:text-stone-700">
                ÉLIXIR & DERMA
              </span>
            </a>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-sm">
              An independent dermatological publication exploring the cellular biology, molecular biochemistry, and cosmetic formulations of modern beauty products—including lipsticks, serums, compact powders, sunscreens, and hybrid cosmetics.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>Independent editorial: zero sponsored brand endorsements</span>
            </div>
          </div>

          {/* Product Category Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-900">
              Beauty Products
            </div>
            <ul className="space-y-2 text-xs text-stone-600 font-light">
              <li>
                <a
                  href={getArticlesHubUrl('Lipstick')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticlesWithProduct('Lipstick');
                  }}
                  className="hover:text-stone-900 transition-colors text-left block"
                  aria-label="Explore Lipstick Formulations"
                >
                  Lipstick Formulations
                </a>
              </li>
              <li>
                <a
                  href={getArticlesHubUrl('Serum')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticlesWithProduct('Serum');
                  }}
                  className="hover:text-stone-900 transition-colors text-left block"
                  aria-label="Explore Active Facial Serums"
                >
                  Active Facial Serums
                </a>
              </li>
              <li>
                <a
                  href={getArticlesHubUrl('Compact Powder')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticlesWithProduct('Compact Powder');
                  }}
                  className="hover:text-stone-900 transition-colors text-left block"
                  aria-label="Explore Finishing Compacts"
                >
                  Finishing Compacts
                </a>
              </li>
              <li>
                <a
                  href={getArticlesHubUrl('Sunscreen')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticlesWithProduct('Sunscreen');
                  }}
                  className="hover:text-stone-900 transition-colors text-left block"
                  aria-label="Explore Fluid Sunscreens & SPF"
                >
                  Fluid Sunscreens & SPF
                </a>
              </li>
              <li>
                <a
                  href={getArticlesHubUrl('Blush')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticlesWithProduct('Blush');
                  }}
                  className="hover:text-stone-900 transition-colors text-left block"
                  aria-label="Explore Dewy Liquid Blushes"
                >
                  Dewy Liquid Blushes
                </a>
              </li>
            </ul>
          </div>

          {/* Scientific Tools */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-900">
              Formulation Tools
            </div>
            <ul className="space-y-2 text-xs text-stone-600 font-light">
              <li>
                <button
                  onClick={onOpenRoutineMatcher}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Product Routine Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLexicon}
                  className="hover:text-stone-900 transition-colors text-left cursor-pointer"
                >
                  Active Molecule Lexicon
                </button>
              </li>
              {onOpenKeywordMap && (
                <li>
                  <button
                    onClick={onOpenKeywordMap}
                    className="hover:text-stone-900 transition-colors text-left font-medium text-amber-900 cursor-pointer"
                  >
                    ★ Step 2 Keyword Map
                  </button>
                </li>
              )}
              <li>
                <a
                  href={getArticlesHubUrl('Foundation & Tint')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticlesWithProduct('Foundation & Tint');
                  }}
                  className="hover:text-stone-900 transition-colors text-left block"
                  aria-label="Explore Serum Foundation Science"
                >
                  Serum Foundation Science
                </a>
              </li>
              <li>
                <a
                  href={getArticlesHubUrl('Cleansing Balm')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticlesWithProduct('Cleansing Balm');
                  }}
                  className="hover:text-stone-900 transition-colors text-left block"
                  aria-label="Explore Double Cleansing Balms"
                >
                  Double Cleansing Balms
                </a>
              </li>
              <li>
                <a
                  href={getArticlesHubUrl('All')}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateArticlesWithProduct('All');
                  }}
                  className="hover:text-stone-900 transition-colors text-left font-medium text-stone-800 block"
                  aria-label="Browse All 10 Blog Articles"
                >
                  Browse All 10 Articles
                </a>
              </li>
            </ul>
          </div>

          {/* Weekly Clinical Dispatch Signup */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-900">
              The Weekly Clinical Dispatch
            </div>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Curated Sunday formulations, cosmetic chemistry investigations, and beauty product teardowns delivered directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-stone-800 transition-colors flex items-center justify-center shrink-0"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <div className="text-xs text-emerald-700 mt-2 font-medium flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Subscribed to weekly formulation dispatch.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Quiet Baseline Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-light">
          <div>
            © 2026 ÉLIXIR & DERMA Publishing Corp. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a 
              href={getHomeUrl()}
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="hover:text-stone-900"
              aria-label="Navigate to Homepage"
            >
              Home
            </a>
            <span aria-hidden="true">·</span>
            <a 
              href={getArticlesHubUrl('All')}
              onClick={(e) => {
                e.preventDefault();
                onNavigateArticlesWithProduct('All');
              }}
              className="hover:text-stone-900"
              aria-label="Browse all 10 blog articles"
            >
              10 Blog Articles
            </a>
            <span aria-hidden="true">·</span>
            <span>ISSN 2984-9102</span>
            <span aria-hidden="true">·</span>
            <span>Vol. XXVIII</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
