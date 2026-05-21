'use client';

import { ReactNode } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-lg border border-outline-variant p-6 fluid-shadow">
        <h1 className="text-2xl font-bold text-on-surface mb-2">
          ⚠️ Something went wrong
        </h1>
        <p className="text-on-surface-variant mb-4">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="text-sm text-on-surface-variant mb-4 p-3 bg-surface rounded border border-outline-variant">
            <summary className="cursor-pointer font-semibold mb-2">Error details (dev only)</summary>
            <pre className="text-xs overflow-auto whitespace-pre-wrap break-words">
              {error.stack}
            </pre>
          </details>
        )}
        <button
          onClick={reset}
          className="w-full px-4 py-2 bg-primary text-on-primary rounded font-medium hover:opacity-90 transition-opacity"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
