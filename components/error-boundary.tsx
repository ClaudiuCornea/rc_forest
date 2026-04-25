'use client';

import React, { ReactNode } from 'react';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * Enhanced ErrorBoundary with a consistent sports aesthetic.
 * Provides retry and home navigation options.
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log to external service in production if needed
    console.error('Squad Error caught:', error, errorInfo);
  }

  // ✅ Fixed: use class method, not a dangling module-level function
  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 text-center bg-club-black border border-white/5 relative overflow-hidden group">
          {/* Background Ghost Text */}
          <span className="absolute inset-0 flex items-center justify-center font-display text-[20vw] text-white/[0.02] select-none pointer-events-none uppercase">
            ERROR
          </span>

          <div className="relative z-10 space-y-6 max-w-md">
            <div className="size-20 bg-club-red/10 border border-club-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="size-10 text-club-red animate-pulse" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-4xl tracking-wider text-white uppercase">SQUAD DOWN!</h2>
              <p className="font-cond text-lg text-club-gray leading-relaxed">
                Something went wrong while processing this section. The referee is checking the TMO.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {/* ✅ Fixed: this.handleReset instead of the broken standalone function */}
              <button
                onClick={this.handleReset}
                className="btn-skew flex items-center gap-2 bg-club-red text-white font-cond font-bold text-sm tracking-[0.125rem] uppercase px-8 py-4 transition-all hover:-translate-y-1"
              >
                <RotateCcw className="size-4" />
                Retry Play
              </button>

              <Link
                href="/en"
                className="btn-skew flex items-center gap-2 bg-white/5 border border-white/10 text-white font-cond font-bold text-sm tracking-[0.125rem] uppercase px-8 py-4 transition-all hover:bg-white/10"
              >
                <Home className="size-4" />
                Back to Base
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
