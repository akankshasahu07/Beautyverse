import React, { useState } from 'react';
import { Send, Check, ShieldCheck } from 'lucide-react';
import { BeautyCategory } from '../types/article';

interface FooterProps {
  onSelectCategory: (category: BeautyCategory | 'All') => void;
  onOpenRoutineMatcher: () => void;
  onOpenLexicon: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenRoutineMatcher,
  onOpenLexicon
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
            <span className="font-editorial-serif text-2xl font-medium tracking-tight text-stone-900 block">
              ÉLIXIR & DERMA
            </span>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-sm">
              An independent dermatological publication exploring the cellular biology, molecular biochemistry, and cosmetic formulations of modern beauty.
            </p>
            <div className="flex items-center gap-2 text-xs text-stone-500 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>Independent editorial: zero sponsored brand endorsements</span>
            </div>
          </div>

          {/* Editorial Category Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-900">
              Investigations
            </div>
            <ul className="space-y-2 text-xs text-stone-600 font-light">
              <li>
                <button
                  onClick={() => onSelectCategory('Active Skincare')}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Active Skincare
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Barrier Repair')}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Barrier Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Suncare & Photoprotection')}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Photoprotection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Antioxidant Serums')}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Antioxidant Serums
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Biomimetic Actives')}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Biomimetic Actives
                </button>
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
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Routine Conflict Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenLexicon}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Active Molecule Lexicon
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('K-Beauty Innovations')}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Fermentation Sciences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Scalp & Hair Wellness')}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Trichology & Scalp Biology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Clean Cosmetics')}
                  className="hover:text-stone-900 transition-colors text-left"
                >
                  Skin-First Base Hybrids
                </button>
              </li>
            </ul>
          </div>

          {/* Weekly Clinical Dispatch Signup */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-widest font-semibold text-stone-900">
              The Weekly Clinical Dispatch
            </div>
            <p className="text-xs text-stone-600 font-light leading-relaxed">
              Curated Sunday formulations, clinical study debriefs, and cosmetic chemistry investigations delivered directly to your inbox.
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
            <span>Peer-Reviewed Cutaneous Biology</span>
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
