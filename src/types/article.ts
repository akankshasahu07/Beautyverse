import { PageKeywordMapping } from '../data/keywordMap';

export type BeautyProductType =
  | 'Lipstick'
  | 'Serum'
  | 'Compact Powder'
  | 'Sunscreen'
  | 'Blush'
  | 'Foundation & Tint'
  | 'Cleansing Balm'
  | 'Eye Cream'
  | 'Setting Mist'
  | 'Barrier Cream';

export type BeautyCategory =
  | 'Color Cosmetics'
  | 'Active Skincare'
  | 'Base & Complexion'
  | 'Suncare & Defense'
  | 'Cleansing & Prep'
  | 'Lip Care';

export interface Author {
  name: string;
  role: string;
  credentials: string;
  avatarInitials: string;
}

export interface HeroActive {
  name: string;
  molecularPurpose: string;
  clinicalConcentration: string;
}

export interface ProductArchetype {
  title: string;
  productType: BeautyProductType;
  formulationType: string;
  keyActives: string;
  textureNote: string;
  finish: 'Velvet Matte' | 'Dewy Satin' | 'Soft Focus Blurred' | 'Invisible Glow' | 'Natural Luminous' | 'Cashmere Melt';
  idealSkinType: string;
  ratingScore: number;
  shadeNote?: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  callout?: {
    label: string;
    quoteOrText: string;
    clinicalReference?: string;
  };
}

export interface ArticleComment {
  id: string;
  author: string;
  skinType: string;
  date: string;
  content: string;
  likes: number;
}

export interface BeautyArticle {
  id: string;
  slug: string;
  title: string;
  dek: string;
  productType: BeautyProductType;
  category: BeautyCategory;
  publishDate: string;
  readTime: string;
  author: Author;
  heroImage: string;
  imageAlt: string;
  imageCaption: string;
  leadPullQuote: string;
  keyTakeaways: string[];
  targetSkinConcerns: string[];
  heroIngredients: HeroActive[];
  sections: ArticleSection[];
  dermatologistPerspective: string;
  routineStep: 'Cleanser' | 'Toner/Essence' | 'Active Serum' | 'Moisturizer' | 'Facial Oil' | 'SPF Photoprotection' | 'Base Makeup' | 'Color & Lips';
  productFormulations: ProductArchetype[];
  faqs: { question: string; answer: string }[];
  contraindications: string[];
  initialComments: ArticleComment[];
  seoKeywords?: PageKeywordMapping;
}
