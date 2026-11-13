/**
 * Robust image fallback utility for ELIXIR & DERMA
 * Ensures images resolve across local dev server, Vite preview, and production Vercel builds.
 */

export function handleImageFallback(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = e.currentTarget;
  const currentSrc = img.src;

  // Track attempts via data attribute to prevent infinite retry loops
  const attempt = parseInt(img.dataset.fallbackAttempt || '0', 10);
  if (attempt >= 4) {
    return;
  }
  img.dataset.fallbackAttempt = String(attempt + 1);

  try {
    const urlObj = new URL(currentSrc, window.location.origin);
    const rawFile = urlObj.pathname.split('/').pop() || '';
    // Strip Vite content hash if present (e.g. name-B1xY2z.jpg -> name.jpg)
    const cleanFile = rawFile.replace(/-[A-Za-z0-9_-]{6,}(\.[a-z]+)$/i, '$1');

    if (attempt === 0 && cleanFile) {
      img.src = `/images/${cleanFile}`;
      return;
    }

    if (attempt === 1 && cleanFile) {
      img.src = `/assets/images/${cleanFile}`;
      return;
    }

    if (attempt === 2 && cleanFile) {
      const altExt = cleanFile.endsWith('.jpg')
        ? cleanFile.replace(/\.jpg$/, '.webp')
        : cleanFile.replace(/\.webp$/, '.jpg');
      img.src = `/images/${altExt}`;
      return;
    }

    if (attempt === 3 && cleanFile) {
      img.src = `/src/assets/images/${cleanFile}`;
      return;
    }
  } catch {
    // Fallback string manipulation
    if (currentSrc.includes('/src/assets/images/')) {
      img.src = currentSrc.replace('/src/assets/images/', '/images/');
    } else if (currentSrc.includes('/assets/images/')) {
      img.src = currentSrc.replace('/assets/images/', '/images/');
    }
  }
}
