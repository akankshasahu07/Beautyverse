export interface PageKeywordMapping {
  pageId: string;
  pageUrl: string;
  pageName: string;
  mainKeyword: string;
  relatedKeyword1: string;
  relatedKeyword2: string;
  seoTitle: string;
  metaDescription: string;
  primaryHeadingH1: string;
  sectionHeadingsH2: string[];
  searchIntent: 'Informational' | 'Commercial Investigation' | 'Editorial Guide';
  productCategory: string;
}

/**
 * Step 2 Keyword Map
 * Assigns one unique primary keyword and two unique related keywords to each page.
 * Strictly avoids repetitive or forced keyword usage.
 */
export const STEP_2_KEYWORD_MAP: Record<string, PageKeywordMapping> = {
  // Page 1: Homepage
  'home': {
    pageId: 'home',
    pageUrl: '/',
    pageName: 'Editorial Homepage',
    mainKeyword: 'beauty and skincare blog',
    relatedKeyword1: 'beauty product reviews',
    relatedKeyword2: 'beauty and skincare ingredients',
    seoTitle: 'ELIXIR & DERMA | Beauty and Skincare Blog: Reviews & Ingredients',
    metaDescription: 'Welcome to ÉLIXIR & DERMA, an independent beauty and skincare blog featuring comprehensive beauty product reviews and clinical analyses of beauty and skincare ingredients.',
    primaryHeadingH1: 'The Science of Radiant Formulations: An Independent Beauty and Skincare Blog',
    sectionHeadingsH2: [
      'The Beauty Product Cabinet: 6 Formulations in Focus',
      'Beauty Product Reviews: The 10 Formulations at a Glance',
      'All 10 In-Depth Beauty Product Reviews & Guides',
      'Analyze Active Beauty and Skincare Ingredients in Your Routine'
    ],
    searchIntent: 'Informational',
    productCategory: 'Editorial Publication'
  },

  // Page 2: Blog Hub Catalog
  'articles-hub': {
    pageId: 'articles-hub',
    pageUrl: '/articles',
    pageName: 'Blog Articles Catalog Hub',
    mainKeyword: 'beauty product guides and investigations',
    relatedKeyword1: 'active skincare ingredients',
    relatedKeyword2: 'clean makeup formulations',
    seoTitle: 'Beauty Product Guides & Investigations | Active Skincare & Clean Formulations',
    metaDescription: 'Browse our curated beauty product guides and investigations. Discover peer-reviewed breakdowns of active skincare ingredients, clean makeup formulations, and routine protocols.',
    primaryHeadingH1: 'The Beauty Product Journal: Guides and Investigations',
    sectionHeadingsH2: [
      'Filter Active Skincare Ingredients & Clean Makeup Formulations',
      'Peer-Reviewed Formulation Evaluations'
    ],
    searchIntent: 'Editorial Guide',
    productCategory: 'Article Catalog'
  },

  // Page 3: Article 1 - Lipstick
  'velvet-lipstick-formulation-science': {
    pageId: 'velvet-lipstick-formulation-science',
    pageUrl: '/article/the-velvet-lip-revolution-hydrating-matte-polymers-and-clean-pigments',
    pageName: 'Hydrating Matte Lipstick Investigation',
    mainKeyword: 'hydrating matte lipstick',
    relatedKeyword1: 'hydrating lipstick',
    relatedKeyword2: 'how to keep lips hydrated with matte lipstick',
    seoTitle: 'Hydrating Matte Lipstick Science & How to Keep Lips Hydrated | ÉLIXIR & DERMA',
    metaDescription: 'Discover how modern hydrating matte lipstick formulas protect the lip barrier. Learn why choosing an advanced hydrating lipstick and knowing how to keep lips hydrated with matte lipstick transforms your wear.',
    primaryHeadingH1: 'The Velvet Lip Revolution: The Science of Hydrating Matte Lipstick That Never Dries Lips',
    sectionHeadingsH2: [
      'The Anatomy of the Vermilion Border: Why Traditional Formulas Fail Hydrating Lipstick Standards',
      'The Chemistry of Hydrating Matte Lipstick: Elastomeric Gels and Encapsulated Squalane',
      'Dermatologist Protocol: How to Keep Lips Hydrated with Matte Lipstick All Day'
    ],
    searchIntent: 'Commercial Investigation',
    productCategory: 'Lipstick'
  },

  // Page 4: Article 2 - Serum
  'ultimate-serum-layering-radiance': {
    pageId: 'ultimate-serum-layering-radiance',
    pageUrl: '/article/the-ultimate-serum-layering-guide-hyaluronic-acid-vitamin-c-and-peptides',
    pageName: 'Serum Layering Guide',
    mainKeyword: 'serum layering',
    relatedKeyword1: 'face serum layering',
    relatedKeyword2: 'layering serums with hyaluronic acid, vitamin C, and peptides',
    seoTitle: 'Serum Layering Guide: Face Serum Layering with Hyaluronic Acid, Vitamin C & Peptides | ÉLIXIR & DERMA',
    metaDescription: 'Master the clinical art of serum layering. Learn step-by-step face serum layering protocols and the exact order for layering serums with hyaluronic acid, vitamin C, and peptides.',
    primaryHeadingH1: 'The Definitive Serum Layering Guide: Mastering Face Serum Layering for Maximum Radiance',
    sectionHeadingsH2: [
      'The Molecular Science Behind Effective Serum Layering',
      'The Dermatologist Protocol for Face Serum Layering: Thinnest to Thickest Viscosity',
      'Precision Rules for Layering Serums with Hyaluronic Acid, Vitamin C, and Peptides'
    ],
    searchIntent: 'Editorial Guide',
    productCategory: 'Serum'
  },

  // Page 5: Article 3 - Compact Powder
  'talc-free-finishing-compact-powders': {
    pageId: 'talc-free-finishing-compact-powders',
    pageUrl: '/article/talc-free-finishing-compacts-how-micro-milled-silica-and-borosilicates-blur-pores',
    pageName: 'Compact Powder Investigation',
    mainKeyword: 'talc free compact powder',
    relatedKeyword1: 'pore blurring finishing powder',
    relatedKeyword2: 'micro milled silica compact',
    seoTitle: 'Talc-Free Compact Powder Guide: Pore-Blurring Finishing Powder Science | ÉLIXIR & DERMA',
    metaDescription: 'Discover how a talc free compact powder blurs imperfections. Learn why a micro milled silica compact acts as the ideal pore blurring finishing powder without cakey buildup.',
    primaryHeadingH1: 'Talc-Free Finishing Compacts: How Micro-Milled Silica & Borosilicates Blur Pores Without Caking',
    sectionHeadingsH2: [
      'The Re-Invention of the Handbag Compact: Why Talc Free Compact Powder Leads',
      'Particle Physics: Engineering a Pore Blurring Finishing Powder',
      'Translucent vs. Tinted: Applying a Micro Milled Silica Compact'
    ],
    searchIntent: 'Commercial Investigation',
    productCategory: 'Compact Powder'
  },

  // Page 6: Article 4 - Sunscreen
  'invisible-fluid-sunscreens-makeup-prep': {
    pageId: 'invisible-fluid-sunscreens-makeup-prep',
    pageUrl: '/article/weightless-invisible-sunscreens-chemical-vs-mineral-uv-shields',
    pageName: 'Sunscreen for Flawless Makeup Guide',
    mainKeyword: 'sunscreen for flawless makeup',
    relatedKeyword1: 'sunscreen for makeup',
    relatedKeyword2: 'sunscreen with no white cast',
    seoTitle: 'Sunscreen for Flawless Makeup: Priming SPF & Sunscreen with No White Cast | ÉLIXIR & DERMA',
    metaDescription: 'Discover the ultimate sunscreen for flawless makeup. Compare weightless formulas, find the best sunscreen for makeup wearers, and enjoy sunscreen with no white cast.',
    primaryHeadingH1: 'The Ultimate Sunscreen for Flawless Makeup: Invisible UV Defense That Never Pills or Casts',
    sectionHeadingsH2: [
      'The Science of Engineering a Sunscreen for Flawless Makeup',
      'The Breakthrough in Formulating a Sunscreen with No White Cast on All Skin Tones',
      'Application Protocol: Layering Sunscreen for Makeup Longevity and Grip'
    ],
    searchIntent: 'Commercial Investigation',
    productCategory: 'Sunscreen'
  },

  // Page 7: Article 5 - Blush
  'dewy-cheek-phenomenon-liquid-blush': {
    pageId: 'dewy-cheek-phenomenon-liquid-blush',
    pageUrl: '/article/the-dewy-cheek-phenomenon-liquid-and-cream-blushes-with-hyaluronic-acid',
    pageName: 'Liquid & Cream Blush Guide',
    mainKeyword: 'dewy liquid blush',
    relatedKeyword1: 'hydrating cream blush',
    relatedKeyword2: 'hyaluronic cheek tint',
    seoTitle: 'Dewy Liquid Blush Guide: Hydrating Cream Blush & Hyaluronic Cheek Tints | ÉLIXIR & DERMA',
    metaDescription: 'Experience natural glow with dewy liquid blush. Learn how hydrating cream blush and hyaluronic cheek tint formulas melt into cheekbones for a lit-from-within flush.',
    primaryHeadingH1: 'The Dewy Cheek Phenomenon: Liquid & Cream Blushes with Hyaluronic Acid Infusion',
    sectionHeadingsH2: [
      'The Biology of Vascular Flush: Why Dewy Liquid Blush Melts Into Skin',
      'Placement Geometry: Applying Hydrating Cream Blush for Optical Lift',
      'Formulating a Hyaluronic Cheek Tint to Prevent Base Makeup Dissolution'
    ],
    searchIntent: 'Commercial Investigation',
    productCategory: 'Blush'
  },

  // Page 8: Article 6 - Foundation & Tint
  'skin-first-base-makeup-hybrids': {
    pageId: 'skin-first-base-makeup-hybrids',
    pageUrl: '/article/skin-first-base-makeup-serum-foundations-and-squalane-tints',
    pageName: 'Serum Foundation & Tint Guide',
    mainKeyword: 'serum foundation for dry skin',
    relatedKeyword1: 'squalane skin tint',
    relatedKeyword2: 'breathable light coverage makeup',
    seoTitle: 'Serum Foundation for Dry Skin: Squalane Skin Tint & Breathable Coverage | ÉLIXIR & DERMA',
    metaDescription: 'Say goodbye to cakey base makeup with serum foundation for dry skin. Learn how squalane skin tint and breathable light coverage makeup provide luminous second-skin wear.',
    primaryHeadingH1: 'Skin-First Base Hybrids: Serum Foundations and Squalane Tints That Never Cling to Dryness',
    sectionHeadingsH2: [
      'The End of Suffocating Masks: Why Serum Foundation for Dry Skin Wins',
      'Comparing a Squalane Skin Tint to Medium-Coverage Serum Bases',
      'Preventing Oxidation and Flaking in Breathable Light Coverage Makeup'
    ],
    searchIntent: 'Commercial Investigation',
    productCategory: 'Foundation & Tint'
  },

  // Page 9: Article 7 - Cleansing Balm
  'double-cleansing-oat-lipid-balms': {
    pageId: 'double-cleansing-oat-lipid-balms',
    pageUrl: '/article/the-science-of-double-cleansing-oat-lipid-balms-dissolve-waterproof-spf',
    pageName: 'Double Cleansing Balm Guide',
    mainKeyword: 'oat lipid cleansing balm',
    relatedKeyword1: 'double cleansing method',
    relatedKeyword2: 'waterproof makeup remover balm',
    seoTitle: 'Oat Lipid Cleansing Balm: Double Cleansing Method for Waterproof Makeup | ÉLIXIR & DERMA',
    metaDescription: 'Protect your skin barrier with an oat lipid cleansing balm. Master the double cleansing method with a soothing waterproof makeup remover balm that rinses 100% clean.',
    primaryHeadingH1: 'The Science of Double Cleansing: How Oat Lipid Balms Dissolve Waterproof Mascara & SPF Without Stripping',
    sectionHeadingsH2: [
      'Why Single Cleansing Leaves Residue: The Double Cleansing Method Explained',
      'The Lipid Chemistry of an Oat Lipid Cleansing Balm',
      'Dissolving Stubborn Long-Wear SPF with a Waterproof Makeup Remover Balm'
    ],
    searchIntent: 'Editorial Guide',
    productCategory: 'Cleansing Balm'
  },

  // Page 10: Article 8 - Eye Cream
  'periorbital-awakening-eye-creams-peptides': {
    pageId: 'periorbital-awakening-eye-creams-peptides',
    pageUrl: '/article/periorbital-awakening-caffeine-and-peptides-for-undereye-shadows',
    pageName: 'Eye Cream Investigation',
    mainKeyword: 'caffeine eye cream for dark circles',
    relatedKeyword1: 'peptide undereye treatment',
    relatedKeyword2: 'cooling eye cream for puffiness',
    seoTitle: 'Caffeine Eye Cream for Dark Circles: Peptide Undereye Treatment Science | ÉLIXIR & DERMA',
    metaDescription: 'Revitalize tired eyes with a caffeine eye cream for dark circles. Discover how a peptide undereye treatment and cooling eye cream for puffiness boost micro-circulation.',
    primaryHeadingH1: 'Periorbital Awakening: Caffeine & Micro-Circulation Peptides for Undereye Shadows and Puffiness',
    sectionHeadingsH2: [
      'The Delicate Eye Contour: Why Caffeine Eye Cream for Dark Circles Works',
      'Micro-Circulation and Dermal Density: The Power of a Peptide Undereye Treatment',
      'Application Technique: Maximizing a Cooling Eye Cream for Puffiness'
    ],
    searchIntent: 'Commercial Investigation',
    productCategory: 'Eye Cream'
  },

  // Page 11: Article 9 - Setting Mist
  'micro-mist-chemistry-setting-sprays': {
    pageId: 'micro-mist-chemistry-setting-sprays',
    pageUrl: '/article/micro-mist-chemistry-setting-sprays-with-biopolymers-and-niacinamide',
    pageName: 'Setting Spray Chemistry Guide',
    mainKeyword: 'alcohol free setting spray',
    relatedKeyword1: 'long lasting makeup mist',
    relatedKeyword2: 'biopolymer setting mist',
    seoTitle: 'Alcohol-Free Setting Spray: Long-Lasting Makeup Mist with Biopolymers | ÉLIXIR & DERMA',
    metaDescription: 'Lock your look with an alcohol free setting spray. Learn how a biopolymer setting mist works as a long lasting makeup mist to fuse powder layers for 16-hour transfer-proof wear.',
    primaryHeadingH1: 'Micro-Mist Chemistry: Setting Sprays with Film-Forming Biopolymers and Niacinamide',
    sectionHeadingsH2: [
      'Fusing Complexion Layers: How an Alcohol Free Setting Spray Melts Powder',
      'Biopolymer Setting Mist Mechanics: Breathable Plant Polymers vs. Harsh Alcohol',
      'The Sandwich Misting Technique: Achieving a Long Lasting Makeup Mist Shield'
    ],
    searchIntent: 'Commercial Investigation',
    productCategory: 'Setting Mist'
  },

  // Page 12: Article 10 - Barrier Cream
  'barrier-first-ceramides-lipid-replenishment': {
    pageId: 'barrier-first-ceramides-lipid-replenishment',
    pageUrl: '/article/barrier-first-why-ceramide-and-lipid-cremes-outperform-exfoliants',
    pageName: 'Ceramide Barrier Cream Guide',
    mainKeyword: 'ceramide barrier cream',
    relatedKeyword1: 'lipid replenishment moisturizer',
    relatedKeyword2: 'skin barrier repair cream',
    seoTitle: 'Ceramide Barrier Cream Guide: Lipid Replenishment & Skin Barrier Repair | ÉLIXIR & DERMA',
    metaDescription: 'Rebuild damaged epidermis with a ceramide barrier cream. Discover why a lipid replenishment moisturizer and skin barrier repair cream in a 2:4:2 ratio outperform aggressive exfoliants.',
    primaryHeadingH1: 'Barrier First: Ceramide 2:4:2 Lipid Creams That Rebuild Damaged Skin Overnight',
    sectionHeadingsH2: [
      'The Brick-and-Mortar Stratum Corneum: Why You Need a Ceramide Barrier Cream',
      'The 2:4:2 Golden Molar Ratio in a Lipid Replenishment Moisturizer',
      'A 14-Day Recovery Protocol Using a Skin Barrier Repair Cream'
    ],
    searchIntent: 'Editorial Guide',
    productCategory: 'Barrier Cream'
  }
};

/**
 * Returns the keyword mapping for a given article ID or page key.
 */
export function getKeywordMappingForPage(pageId: string): PageKeywordMapping | undefined {
  return STEP_2_KEYWORD_MAP[pageId];
}
