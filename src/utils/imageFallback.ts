/**
 * Robust image fallback utility for ELIXIR & DERMA
 * Ensures images resolve across local dev server, Vite preview, and production Vercel builds.
 */

export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = e.currentTarget;
  const currentSrc = img.src;

  // Track attempts via data attribute to prevent infinite retry loops
  const attempt = parseInt(img.dataset.fallbackAttempt || '0', 10);
  if (attempt >= 3) {
    return;
  }
  img.dataset.fallbackAttempt = String(attempt + 1);

  // Strategy 1: If URL has /src/assets/images/, convert to /assets/images/
  if (currentSrc.includes('/src/assets/images/')) {
    img.src = currentSrc.replace('/src/assets/images/', '/assets/images/');
    return;
  }

  // Strategy 2: If URL has /assets/images/, convert to /images/
  if (currentSrc.includes('/assets/images/')) {
    img.src = currentSrc.replace('/assets/images/', '/images/');
    return;
  }

  // Strategy 3: Try switching extension between .jpg and .webp
  if (currentSrc.endsWith('.jpg')) {
    img.src = currentSrc.replace(/\.jpg$/, '.webp');
    return;
  }
  if (currentSrc.endsWith('.webp')) {
    img.src = currentSrc.replace(/\.webp$/, '.jpg');
    return;
  }
}
