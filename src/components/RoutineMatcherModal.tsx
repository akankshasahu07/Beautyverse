import React, { useState } from 'react';
import { X, Sparkles, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import { BeautyArticle } from '../types/article';

interface RoutineMatcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: BeautyArticle[];
  onSelectArticle: (article: BeautyArticle) => void;
}

export const RoutineMatcherModal: React.FC<RoutineMatcherModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [skinType, setSkinType] = useState('Dehydrated / Barrier-Compromised');
  const [primaryGoal, setPrimaryGoal] = useState('Restore Skin Barrier');
  const [selectedActives, setSelectedActives] = useState<string[]>([
    'Retinoid / Tretinoin',
    'Vitamin C (L-Ascorbic)'
  ]);

  if (!isOpen) return null;

  const activeOptions = [
    'Retinoid / Tretinoin',
    'Vitamin C (L-Ascorbic)',
    'Copper Peptides',
    'Niacinamide (Vitamin B3)',
    'AHA / Glycolic Acid',
    'BHA / Salicylic Acid',
    'Ceramides & Lipids',
    'Sugarcane Squalane'
  ];

  const toggleActive = (active: string) => {
    if (selectedActives.includes(active)) {
      setSelectedActives(selectedActives.filter(a => a !== active));
    } else {
      setSelectedActives([...selectedActives, active]);
    }
  };

  // Evaluate conflicts
  const conflicts: string[] = [];
  if (selectedActives.includes('Copper Peptides') && selectedActives.includes('Vitamin C (L-Ascorbic)')) {
    conflicts.push('Copper Peptides + Low-pH Vitamin C: Acidic pH (<3.5) hydrolyzes chelated copper bonds, deactivating both actives. Apply Vitamin C in AM, Copper Peptides in PM.');
  }
  if (selectedActives.includes('Retinoid / Tretinoin') && selectedActives.includes('AHA / Glycolic Acid')) {
    conflicts.push('Retinoids + Direct AHA Exfoliants: Stacking strong acids and nightly Vitamin A leads to stratum corneum shearing. Alternate nights rather than layering together.');
  }
  if (selectedActives.includes('Retinoid / Tretinoin') && selectedActives.includes('Vitamin C (L-Ascorbic)')) {
    conflicts.push('Retinoids + Pure L-Ascorbic Acid: Can overwhelm sensitive barriers if layered simultaneously. Reserve Vitamin C for morning photoprotection and Retinoids for evening.');
  }

  // Determine matched articles
  const matchedArticles = articles.filter(a => {
    if (primaryGoal === 'Restore Skin Barrier') {
      return a.category === 'Barrier Repair' || a.category === 'Facial Oils & Lipids';
    }
    if (primaryGoal === 'Fade Pigment & Sun Spots') {
      return a.category === 'Antioxidant Serums' || a.category === 'Suncare & Photoprotection';
    }
    if (primaryGoal === 'Smooth Fine Lines & Firm') {
      return a.category === 'Active Skincare' || a.category === 'Biomimetic Actives';
    }
    if (primaryGoal === 'Control Blemishes & Pores') {
      return a.category === 'Formulation Science' || a.category === 'Scalp & Hair Wellness';
    }
    // Deep hydration
    return a.category === 'K-Beauty Innovations' || a.category === 'Barrier Repair';
  }).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-[#E8E2D9] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl p-6 sm:p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 transition-colors p-1"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 mb-2 font-editorial-sans">
          <Sparkles className="w-3.5 h-3.5 text-stone-700" />
          <span>Clinical Routine Algorithm</span>
        </div>

        <h2 className="font-editorial-serif text-2xl sm:text-3xl font-medium text-stone-900 mb-2">
          Diagnostic Routine & Conflict Matcher
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-light mb-6">
          Calibrate your skin profile against our 10 formulation investigations to identify active ingredient incompatibilities and construct a balanced regimen.
        </p>

        {/* Form Inputs */}
        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-stone-800 mb-1.5">
              1. Your Cutaneous Condition
            </label>
            <select
              value={skinType}
              onChange={(e) => setSkinType(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-sm text-stone-800 focus:outline-none focus:border-stone-500"
            >
              <option value="Dehydrated / Barrier-Compromised">Dehydrated / Barrier-Compromised</option>
              <option value="Dry & Flaky">Dry & Flaky</option>
              <option value="Oily & Blemish-Prone">Oily & Blemish-Prone</option>
              <option value="Combination / Enlarged Pores">Combination / Enlarged Pores</option>
              <option value="Mature / Loss of Firmness">Mature / Loss of Firmness</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-stone-800 mb-1.5">
              2. Primary Clinical Objective
            </label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full text-xs p-2.5 bg-white border border-[#E8E2D9] rounded-sm text-stone-800 focus:outline-none focus:border-stone-500"
            >
              <option value="Restore Skin Barrier">Restore Skin Barrier & Soothe Stinging</option>
              <option value="Fade Pigment & Sun Spots">Fade Pigment & Prevent Photoaging</option>
              <option value="Smooth Fine Lines & Firm">Smooth Fine Lines & Stimulate Procollagen</option>
              <option value="Control Blemishes & Pores">Regulate Sebum & Clarify Enlarged Pores</option>
              <option value="Deep Cellular Hydration">Achieve Translucent "Glass Skin" Hydration</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-stone-800 mb-2">
              3. Actives Currently in Your Cabinet (Click to toggle)
            </label>
            <div className="flex flex-wrap gap-2">
              {activeOptions.map((active) => {
                const isSelected = selectedActives.includes(active);
                return (
                  <button
                    key={active}
                    type="button"
                    onClick={() => toggleActive(active)}
                    className={`px-3 py-1.5 text-xs rounded-sm border transition-all ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-[#E8E2D9] hover:border-stone-400'
                    }`}
                  >
                    {active}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Incompatibility Alerts */}
        {conflicts.length > 0 ? (
          <div className="p-4 border border-amber-300 bg-amber-50 rounded-sm mb-6">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{conflicts.length} Formulation Conflict{conflicts.length > 1 ? 's' : ''} Detected</span>
            </div>
            <ul className="space-y-1.5 text-xs text-amber-900/90 font-light list-disc list-inside">
              {conflicts.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="p-3 border border-emerald-200 bg-emerald-50/60 rounded-sm mb-6 flex items-center gap-2 text-xs text-emerald-800">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>No chemical formula clashes detected among selected actives.</span>
          </div>
        )}

        {/* Regimen Blueprint */}
        <div className="p-5 border border-[#E8E2D9] bg-white rounded-sm mb-6">
          <div className="text-xs uppercase tracking-widest font-semibold text-stone-900 mb-3">
            Recommended Daily Regimen Sequence
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="font-semibold text-stone-800 mb-1">Morning (AM Protection)</div>
              <ol className="list-decimal list-inside space-y-1 text-stone-600 font-light">
                <li>Non-foaming milk cleanse</li>
                <li>Fermented hydrating mist or essence</li>
                <li>Antioxidant serum (e.g. 5% THD Ascorbate or Niacinamide)</li>
                <li>Lightweight ceramide barrier cream</li>
                <li><strong>Mineral SPF 50+ (Broad Spectrum Zinc)</strong></li>
              </ol>
            </div>
            <div>
              <div className="font-semibold text-stone-800 mb-1">Night (PM Repair & Remodel)</div>
              <ol className="list-decimal list-inside space-y-1 text-stone-600 font-light">
                <li>Gentle lipid cleansing balm</li>
                <li>Calming Centella or peptide fluid</li>
                <li>Targeted active (e.g. Retinal or Copper Peptides)</li>
                <li>2:4:2 Lipid restorative cream</li>
                <li>3 drops Sugarcane Squalane oil seal</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Recommended Investigations */}
        <div>
          <div className="text-xs uppercase tracking-widest font-semibold text-stone-900 mb-3">
            Matched Scientific Reading
          </div>
          <div className="space-y-2">
            {matchedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="p-3 border border-[#E8E2D9] hover:border-stone-400 bg-white rounded-sm cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-stone-500">
                    {art.category} · {art.readTime}
                  </div>
                  <div className="font-editorial-serif text-sm font-medium text-stone-900 group-hover:text-stone-700">
                    {art.title}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 group-hover:text-stone-900 transition-all shrink-0 ml-3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
