import React from 'react';

const LoadingPage = () => {
  return (
    <div role="status" aria-live="polite" className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="size-8 border-2 border-dark dark:border-light border-t-transparent dark:border-t-transparent rounded-full motion-safe:animate-spin"></div>
      <p className="mt-4 text-base text-dark/65 dark:text-light/65">Loading…</p>
    </div>
  );
};

export default LoadingPage;
