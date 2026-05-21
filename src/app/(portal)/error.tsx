'use client';

import { ReactNode } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function PortalErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-lowest rounded-lg border border-outline-variant p-6 fluid-shadow">
        <h2 className="text-2xl font-bold text-on-surface mb-2">
          ⚠️ Portal error
        </h2>
        <p className="text-on-surface-variant mb-4">
          {error.message || 'An error occurred while loading this page.'}
        </p>
        {process.env.NODE_ENV === 'development' && (
          <details className="text-sm text-on-surface-variant mb-4 p-3 bg-surface rounded border border-outline-variant">
            <summary className="cursor-pointer font-semibold mb-2">Details (dev)</summary>
            <pre className="text-xs overflow-auto whitespace-pre-wrap">
              {error.stack}
            </pre>
          </details>
        )}
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="flex-1 px-4 py-2 bg-primary text-on-primary rounded font-medium hover:opacity-90 transition-opacity"
          >
            Retry
          </button>
          <a
            href="/dashboard"
            className="flex-1 px-4 py-2 bg-surface-container text-on-surface rounded font-medium hover:bg-surface-container-high transition-colors text-center"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
