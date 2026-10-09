import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Bookmark, Share2, Volume2, VolumeX, Play, Pause, 
  Check, MessageSquare, ChevronDown, ChevronUp, AlertCircle, 
  Sparkles, Stethoscope, Layers, Send
} from 'lucide-react';
import { BeautyArticle, ArticleComment } from '../types/article';

interface ArticleDetailProps {
  article: BeautyArticle;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onSelectArticle: (article: BeautyArticle) => void;
  allArticles: BeautyArticle[];
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  isSaved,
  onToggleSave,
  onSelectArticle,
  allArticles
}) => {
  // Reading state
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xl'>('normal');
  const [themeMode, setThemeMode] = useState<'parchment' | 'white' | 'dark'>('parchment');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // Audio narration state (Web Speech API)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.25 | 0.8>(1);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Comments state
  const [comments, setComments] = useState<ArticleComment[]>(article.initialComments);
  const [newAuthor, setNewAuthor] = useState('');
  const [newSkinType, setNewSkinType] = useState('Combination Skin');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset audio on article change
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setComments(article.initialComments);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [article.id]);

  // Audio speech synthesis handler
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Audio speech synthesis is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      // Concatenate text for audio narration
      const textToRead = `${article.title}. By ${article.author.name}. ${article.dek}. ` +
        article.sections.map(s => `${s.heading}. ${s.paragraphs.join(' ')}`).join(' ');

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = playbackSpeed;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      speechUtteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleSpeedChange = (speed: 1 | 1.25 | 0.8) => {
    setPlaybackSpeed(speed);
    if (isPlayingAudio && speechUtteranceRef.current) {
      window.speechSynthesis.cancel();
      handleToggleAudio();
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newCommentText.trim()) return;

    const newComment: ArticleComment = {
      id: `comment-${Date.now()}`,
      author: newAuthor.trim(),
      skinType: newSkinType,
      date: 'Just now',
      content: newCommentText.trim(),
      likes: 1
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  // Find next and previous articles
  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : allArticles[allArticles.length - 1];
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : allArticles[0];

  // Theme container classes
  const themeContainerClass = 
    themeMode === 'dark' 
      ? 'bg-[#161514] text-stone-200 border-stone-800' 
      : themeMode === 'white' 
        ? 'bg-white text-stone-900 border-stone-200' 
        : 'bg-[#FAF8F5] text-stone-900 border-[#E8E2D9]';

  const fontClass = 
    fontSize === 'xl' 
      ? 'text-lg sm:text-xl leading-relaxed sm:leading-loose' 
      : fontSize === 'large' 
        ? 'text-base sm:text-lg leading-relaxed' 
        : 'text-sm sm:text-base leading-relaxed';

  return (
    <article className={`min-h-screen transition-colors duration-300 ${themeContainerClass}`}>
      {/* Top Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-stone-900 dark:bg-amber-400 z-50 transition-all duration-150 ease-out" 
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
      />

      {/* Reader Control Strip */}
      <div className={`sticky top-[57px] lg:top-[85px] z-30 border-b backdrop-blur-md px-6 lg:px-8 py-3 transition-colors ${
        themeMode === 'dark' ? 'bg-[#161514]/90 border-stone-800' : 'bg-[#FAF8F5]/90 border-[#E8E2D9]'
      }`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Articles</span>
          </button>

          {/* Reading Customization Controls */}
          <div className="flex items-center gap-4 text-xs">
            {/* Audio narration button */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm border transition-colors ${
                  isPlayingAudio 
                    ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-700' 
                    : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:border-stone-500'
                }`}
                title="Listen to essay audio narration"
              >
                {isPlayingAudio ? (
                  <>
                    <Pause className="w-3 h-3 text-amber-700" />
                    <span>Pause Audio</span>
                    <span className="flex items-center gap-0.5 ml-1">
                      <span className="w-1 h-2.5 bg-amber-600 animate-pulse" />
                      <span className="w-1 h-3.5 bg-amber-600 animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-amber-600 animate-pulse delay-150" />
                    </span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-stone-600 dark:text-stone-300" />
                    <span>Listen</span>
                  </>
                )}
              </button>

              {isPlayingAudio && (
                <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-sm overflow-hidden text-[10px]">
                  <button 
                    onClick={() => handleSpeedChange(0.8)}
                    className={`px-1.5 py-0.5 ${playbackSpeed === 0.8 ? 'bg-stone-900 text-white' : ''}`}
                  >
                    0.8x
                  </button>
                  <button 
                    onClick={() => handleSpeedChange(1)}
                    className={`px-1.5 py-0.5 ${playbackSpeed === 1 ? 'bg-stone-900 text-white' : ''}`}
                  >
                    1x
                  </button>
                  <button 
                    onClick={() => handleSpeedChange(1.25)}
                    className={`px-1.5 py-0.5 ${playbackSpeed === 1.25 ? 'bg-stone-900 text-white' : ''}`}
                  >
                    1.25x
                  </button>
                </div>
              )}
            </div>

            {/* Font size toggles */}
            <div className="hidden sm:flex items-center gap-1 border border-stone-300 dark:border-stone-700 rounded-sm p-0.5">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 text-[11px] ${fontSize === 'normal' ? 'bg-stone-900 text-white dark:bg-stone-700' : 'text-stone-600 dark:text-stone-400'}`}
                title="Default text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 text-xs font-medium ${fontSize === 'large' ? 'bg-stone-900 text-white dark:bg-stone-700' : 'text-stone-600 dark:text-stone-400'}`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xl')}
                className={`px-2 py-0.5 text-sm font-semibold ${fontSize === 'xl' ? 'bg-stone-900 text-white dark:bg-stone-700' : 'text-stone-600 dark:text-stone-400'}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Theme switcher */}
            <div className="hidden md:flex items-center gap-1 border border-stone-300 dark:border-stone-700 rounded-sm p-0.5">
              <button
                onClick={() => setThemeMode('parchment')}
                className={`px-2 py-0.5 text-[11px] ${themeMode === 'parchment' ? 'bg-[#FAF8F5] text-stone-900 font-semibold shadow-xs' : 'text-stone-500'}`}
              >
                Parchment
              </button>
              <button
                onClick={() => setThemeMode('white')}
                className={`px-2 py-0.5 text-[11px] ${themeMode === 'white' ? 'bg-white text-stone-900 font-semibold shadow-xs' : 'text-stone-500'}`}
              >
                White
              </button>
              <button
                onClick={() => setThemeMode('dark')}
                className={`px-2 py-0.5 text-[11px] ${themeMode === 'dark' ? 'bg-stone-800 text-white font-semibold shadow-xs' : 'text-stone-500'}`}
              >
                Charcoal
              </button>
            </div>

            {/* Bookmark & Share */}
            <button
              onClick={() => onToggleSave(article.id)}
              className={`p-1.5 border rounded-sm transition-colors ${
                isSaved ? 'bg-stone-900 text-white border-stone-900' : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300'
              }`}
              title={isSaved ? 'Saved in reading list' : 'Save to reading list'}
            >
              <Bookmark className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 border border-stone-300 dark:border-stone-700 rounded-sm text-stone-700 dark:text-stone-300 hover:border-stone-500 transition-colors relative"
              title="Copy article link"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Copy link confirmation banner */}
      {copiedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs px-4 py-2.5 rounded-sm shadow-lg flex items-center gap-2">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>Article link copied to clipboard</span>
        </div>
      )}

      {/* Main Reading Container (Constrained measure 65-75ch) */}
      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
        {/* Unboxed Metadata Header (Zero-Pill Discipline) */}
        <div className="text-[11px] uppercase tracking-widest text-stone-500 mb-4 font-editorial-sans flex items-center gap-2 flex-wrap">
          <span className="text-stone-900 dark:text-stone-100 font-semibold">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>Routine Step: {article.routineStep}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>{article.publishDate}</span>
        </div>

        {/* Primary Title */}
        <h1 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-stone-950 dark:text-stone-50 leading-[1.18] text-balance mb-6">
          {article.title}
        </h1>

        {/* Editorial Subtitle / Dek */}
        <p className="text-stone-600 dark:text-stone-300 text-lg sm:text-xl font-light leading-relaxed mb-8">
          {article.dek}
        </p>

        {/* Author Byline Lockup */}
        <div className="flex items-center gap-4 pb-8 mb-10 border-b border-[#E8E2D9] dark:border-stone-800">
          <div className="w-12 h-12 rounded-full bg-stone-200 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 flex items-center justify-center font-editorial-serif text-base font-semibold text-stone-800 dark:text-stone-200">
            {article.author.avatarInitials}
          </div>
          <div>
            <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              {article.author.name}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400">
              {article.author.role} · {article.author.credentials}
            </div>
          </div>
        </div>

        {/* Hero Photography Visual Frame */}
        <div className="mb-12">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#E8E2D9] dark:border-stone-800 bg-stone-100">
            <img
              src={article.heroImage}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-stone-500 dark:text-stone-400 font-editorial-serif italic">
            {article.imageCaption}
          </figcaption>
        </div>

        {/* Key Takeaways Section */}
        <div className="p-6 sm:p-7 border border-[#E8E2D9] dark:border-stone-800 bg-white/70 dark:bg-stone-900/60 mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-stone-700 dark:text-stone-300" />
            <span>Formulation Key Takeaways</span>
          </div>
          <ul className="space-y-3 text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-light">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="font-mono text-xs text-stone-400 mt-1 shrink-0">0{idx + 1}.</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Editorial Pullquote (Zero Thick Border - Clean Hairlines) */}
        <div className="py-8 border-y border-[#E8E2D9] dark:border-stone-800 my-10 text-center">
          <blockquote className="font-editorial-serif italic text-xl sm:text-2xl text-stone-850 dark:text-stone-100 leading-relaxed max-w-2xl mx-auto">
            "{article.leadPullQuote}"
          </blockquote>
          <div className="mt-3 text-xs uppercase tracking-widest text-stone-500">
            — {article.author.name}
          </div>
        </div>

        {/* Article Body Sections */}
        <div className="space-y-12">
          {article.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-5">
              <h2 className="font-editorial-serif text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 dark:text-stone-100">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p 
                  key={pIdx} 
                  className={`text-stone-700 dark:text-stone-300 font-light ${fontClass} ${
                    sIdx === 0 && pIdx === 0 ? 'drop-cap' : ''
                  }`}
                >
                  {p}
                </p>
              ))}

              {section.callout && (
                <div className="p-5 border border-[#E8E2D9] dark:border-stone-800 bg-[#F3EFEA]/60 dark:bg-stone-900/40 my-6">
                  <div className="text-[11px] uppercase tracking-wider font-semibold text-stone-800 dark:text-stone-200 mb-1.5">
                    {section.callout.label}
                  </div>
                  <p className="text-sm font-editorial-serif italic text-stone-800 dark:text-stone-200 leading-relaxed">
                    "{section.callout.quoteOrText}"
                  </p>
                  {section.callout.clinicalReference && (
                    <div className="mt-2 text-[10px] uppercase tracking-wider text-stone-500 font-mono">
                      Ref: {section.callout.clinicalReference}
                    </div>
                  )}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Hero Actives Breakdown Table (Tabular Numerals) */}
        <div className="mt-14 pt-10 border-t border-[#E8E2D9] dark:border-stone-800">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <h3 className="font-editorial-serif text-xl sm:text-2xl font-medium text-stone-900 dark:text-stone-100">
              Active Molecule Specifications
            </h3>
          </div>
          <div className="border border-[#E8E2D9] dark:border-stone-800 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F3EFEA] dark:bg-stone-800/60 uppercase tracking-widest text-[10px] text-stone-600 dark:text-stone-300 border-b border-[#E8E2D9] dark:border-stone-800">
                <tr>
                  <th className="py-3 px-4 font-semibold">Active Ingredient</th>
                  <th className="py-3 px-4 font-semibold">Cutaneous Target / Mechanism</th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">Clinical Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D9] dark:divide-stone-800 font-light">
                {article.heroIngredients.map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                    <td className="py-3 px-4 font-medium text-stone-900 dark:text-stone-100 whitespace-nowrap">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-300">
                      {item.molecularPurpose}
                    </td>
                    <td className="py-3 px-4 font-mono tabular-nums text-stone-800 dark:text-stone-200 whitespace-nowrap">
                      {item.clinicalConcentration}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dermatologist Direct Commentary Card */}
        <div className="mt-12 p-6 border border-[#E8E2D9] dark:border-stone-800 bg-white dark:bg-stone-900">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-900 dark:text-stone-100 mb-3">
            <Stethoscope className="w-4 h-4 text-stone-700 dark:text-stone-300" />
            <span>Dermatologist Clinical Synthesis</span>
          </div>
          <p className="text-sm font-light text-stone-700 dark:text-stone-300 leading-relaxed">
            {article.dermatologistPerspective}
          </p>
        </div>

        {/* Curated Product Formulations / Archetypes */}
        <div className="mt-14">
          <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 dark:text-stone-100 mb-6">
            Curated Formulation Archetypes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {article.productFormulations.map((product, pIdx) => (
              <div key={pIdx} className="border border-[#E8E2D9] dark:border-stone-800 p-5 bg-white dark:bg-stone-900 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    {product.formulationType}
                  </div>
                  <h4 className="font-editorial-serif text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">
                    {product.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
                    <strong className="font-medium text-stone-800 dark:text-stone-200">Actives: </strong>
                    {product.keyActives}
                  </p>
                  <p className="text-xs text-stone-500 italic mb-3">
                    "{product.textureNote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E8E2D9] dark:border-stone-800 text-[11px] text-stone-600 dark:text-stone-400">
                  <span className="font-medium text-stone-800 dark:text-stone-200">Best For: </span>
                  {product.idealSkinType}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contraindications & Cautions */}
        <div className="mt-10 p-5 border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-1.5 font-semibold mb-2">
            <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <span>Contraindications & Routine Conflicts</span>
          </div>
          <ul className="list-disc list-inside space-y-1 font-light">
            {article.contraindications.map((contra, cIdx) => (
              <li key={cIdx}>{contra}</li>
            ))}
          </ul>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="mt-14">
          <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 dark:text-stone-100 mb-6">
            Frequently Inquired Formulation Science
          </h3>
          <div className="divide-y divide-[#E8E2D9] dark:divide-stone-800 border-y border-[#E8E2D9] dark:border-stone-800">
            {article.faqs.map((faq, fIdx) => (
              <div key={fIdx} className="py-4">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === fIdx ? null : fIdx)}
                  className="w-full flex items-center justify-between text-left text-sm font-medium text-stone-900 dark:text-stone-100 hover:text-stone-700"
                >
                  <span>{faq.question}</span>
                  {expandedFaq === fIdx ? (
                    <ChevronUp className="w-4 h-4 shrink-0 text-stone-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0 text-stone-400" />
                  )}
                </button>
                {expandedFaq === fIdx && (
                  <p className="mt-3 text-xs sm:text-sm font-light text-stone-600 dark:text-stone-300 leading-relaxed pr-6">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reader Discussion & Comments */}
        <div className="mt-16 pt-10 border-t border-[#E8E2D9] dark:border-stone-800">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-stone-700 dark:text-stone-300" />
              <h3 className="font-editorial-serif text-2xl font-medium text-stone-900 dark:text-stone-100">
                Reader Dialogue & Clinical Notes ({comments.length})
              </h3>
            </div>
          </div>

          {/* Add a comment form */}
          <form onSubmit={handleAddComment} className="p-5 border border-[#E8E2D9] dark:border-stone-800 bg-white dark:bg-stone-900 mb-10 space-y-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-stone-900 dark:text-stone-100">
              Contribute to the Editorial Discussion
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Sarah Jenkins or Eleanor"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full text-xs p-2 bg-[#FAF8F5] dark:bg-stone-800 border border-[#E8E2D9] dark:border-stone-700 rounded-sm focus:outline-none focus:border-stone-500 text-stone-900 dark:text-stone-100"
                />
              </div>
              <div>
                <label className="block text-[11px] text-stone-500 mb-1">Your Skin Profile</label>
                <select
                  value={newSkinType}
                  onChange={(e) => setNewSkinType(e.target.value)}
                  className="w-full text-xs p-2 bg-[#FAF8F5] dark:bg-stone-800 border border-[#E8E2D9] dark:border-stone-700 rounded-sm focus:outline-none focus:border-stone-500 text-stone-900 dark:text-stone-100"
                >
                  <option value="Dry & Reactive">Dry & Reactive</option>
                  <option value="Combination / Barrier Compromised">Combination / Barrier Compromised</option>
                  <option value="Oily & Acne-Prone">Oily & Acne-Prone</option>
                  <option value="Mature / Sun-Damaged">Mature / Sun-Damaged</option>
                  <option value="Normal / Preventative">Normal / Preventative</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[11px] text-stone-500 mb-1">Observations or Formulation Questions</label>
              <textarea
                required
                rows={3}
                placeholder="Share your clinical experience, routine results, or question for our dermatologists..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="w-full text-xs p-2.5 bg-[#FAF8F5] dark:bg-stone-800 border border-[#E8E2D9] dark:border-stone-700 rounded-sm focus:outline-none focus:border-stone-500 text-stone-900 dark:text-stone-100"
              />
            </div>
            <div className="flex items-center justify-between">
              {commentSubmitted ? (
                <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" /> Published to article discussion
                </span>
              ) : <span />}
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-medium uppercase tracking-wider rounded-sm hover:opacity-90 transition-opacity"
              >
                <Send className="w-3 h-3" />
                <span>Publish Note</span>
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="p-5 border border-[#E8E2D9] dark:border-stone-800 bg-white/60 dark:bg-stone-900/40">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-stone-900 dark:text-stone-100">{comment.author}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-600 dark:text-stone-400 font-editorial-sans text-[11px]">{comment.skinType}</span>
                  </div>
                  <span className="text-[11px] font-mono">{comment.date}</span>
                </div>
                <p className="text-xs sm:text-sm font-light text-stone-700 dark:text-stone-300 leading-relaxed">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next / Previous Article Navigation */}
        <div className="mt-16 pt-10 border-t border-[#E8E2D9] dark:border-stone-800 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button
            onClick={() => onSelectArticle(prevArticle)}
            className="p-5 border border-[#E8E2D9] dark:border-stone-800 text-left hover:border-stone-400 transition-colors group bg-white dark:bg-stone-900"
          >
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1 flex items-center gap-1">
              <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              <span>Previous Investigation</span>
            </div>
            <div className="font-editorial-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 line-clamp-2">
              {prevArticle.title}
            </div>
          </button>

          <button
            onClick={() => onSelectArticle(nextArticle)}
            className="p-5 border border-[#E8E2D9] dark:border-stone-800 text-right hover:border-stone-400 transition-colors group bg-white dark:bg-stone-900"
          >
            <div className="text-[10px] uppercase tracking-widest text-stone-500 mb-1 flex items-center justify-end gap-1">
              <span>Next Investigation</span>
              <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="font-editorial-serif text-base sm:text-lg font-medium text-stone-900 dark:text-stone-100 line-clamp-2">
              {nextArticle.title}
            </div>
          </button>
        </div>
      </main>
    </article>
  );
};
