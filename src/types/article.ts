export type BeautyCategory =
  | 'Active Skincare'
  | 'Barrier Repair'
  | 'K-Beauty Innovations'
  | 'Antioxidant Serums'
  | 'Suncare & Photoprotection'
  | 'Scalp & Hair Wellness'
  | 'Formulation Science'
  | 'Clean Cosmetics'
  | 'Biomimetic Actives'
  | 'Facial Oils & Lipids';

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
  formulationType: string;
  keyActives: string;
  textureNote: string;
  idealSkinType: string;
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
  dek: string; // Editorial secondary deck/subtitle
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
  routineStep: 'Cleanser' | 'Toner/Essence' | 'Active Serum' | 'Moisturizer' | 'Facial Oil' | 'SPF Photoprotection';
  productFormulations: ProductArchetype[];
  faqs: { question: string; answer: string }[];
  contraindications: string[];
  initialComments: ArticleComment[];
}
