import React, { Suspense, useEffect, useRef, useState } from 'react';

interface LazySectionProps {
  /** Estimated height of the section to reserve before mount, preventing CLS. */
  minHeight?: string;
  /** rootMargin for the IntersectionObserver — start loading early. */
  rootMargin?: string;
  /** Fallback shown before the section is mounted. */
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const DefaultSkeleton: React.FC<{ minHeight?: string }> = ({ minHeight = '60vh' }) => (
  <div
    aria-hidden="true"
    className="container mx-auto px-6 py-24"
    style={{ minHeight }}
  >
    <div className="animate-pulse motion-reduce:animate-none space-y-4 max-w-2xl">
      <div className="h-3 w-32 bg-gray-200 rounded" />
      <div className="h-8 w-3/4 bg-gray-200 rounded" />
      <div className="h-4 w-full bg-gray-100 rounded" />
      <div className="h-4 w-5/6 bg-gray-100 rounded" />
    </div>
  </div>
);

/**
 * Defers rendering of children until the placeholder enters the viewport.
 * Use to wrap heavy below-the-fold components so React.lazy chunks only
 * fetch and hydrate when the user actually approaches them.
 */
const LazySection: React.FC<LazySectionProps> = ({
  minHeight = '60vh',
  rootMargin = '300px',
  fallback,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // SSR / no IntersectionObserver: render eagerly.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: inView ? undefined : minHeight }}>
      {inView ? (
        <Suspense fallback={fallback ?? <DefaultSkeleton minHeight={minHeight} />}>
          {children}
        </Suspense>
      ) : (
        fallback ?? <DefaultSkeleton minHeight={minHeight} />
      )}
    </div>
  );
};

export default LazySection;
