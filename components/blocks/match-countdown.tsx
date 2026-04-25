'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface CountdownProps {
  nextMatch: {
    opponent: string;
    vsOpponent: string;
    opponentLocation: string;
    date: string;
    parsedDate: string; // ISO string from server
  };
}

export const MatchCountdown = ({ nextMatch }: CountdownProps) => {
  const [now, setNow] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const parsedDate = useMemo(() => new Date(nextMatch.parsedDate), [nextMatch.parsedDate]);

  const displayDate = useMemo(() => {
    return parsedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
  }, [parsedDate]);

  const displayTime = useMemo(() => {
    return parsedDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
  }, [parsedDate]);

  const timeLeft = useMemo(() => {
    if (!mounted) return null;
    const diff = parsedDate.getTime() - now.getTime();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      days: String(days).padStart(2, '0'),
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  }, [parsedDate, now, mounted]);

  if (!mounted) return null;

  return (
    <div className="relative z-10 mb-12 p-8 border border-[var(--primary-color)]/30 bg-[var(--primary-color)]/[0.06] overflow-hidden">
      <div className="absolute inset-0 stripe-bg opacity-40"></div>
      <div className="relative z-10 flex flex-col items-center lg:items-center lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col items-center text-center lg:items-start lg:text-left w-full">
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-color)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary-color)]"></span>
            </span>
            <p className="font-cond text-[0.625rem] tracking-[0.25rem] uppercase text-[var(--primary-color)]">Next Match</p>
          </div>
          <div className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-tight flex flex-col items-center lg:items-start leading-[0.85] gap-2">
            <span className="uppercase">{nextMatch.opponent}</span>
            <span className="text-[var(--primary-color)] text-xl sm:text-2xl lg:text-3xl opacity-80">VS</span>
            <span className="uppercase">{nextMatch.vsOpponent}</span>
          </div>
          <p className="text-xs sm:text-sm text-club-gray mt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-1 gap-x-2">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextMatch.opponentLocation || '')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[var(--primary-color)] transition-colors group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[var(--primary-color)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/></svg>
              <span className="underline decoration-white/10 underline-offset-4">{nextMatch.opponentLocation}</span>
            </a>
            <span className="hidden sm:inline text-white/20">|</span>
            <span>{displayDate}, {displayTime}</span>
          </p>
        </div>
        {timeLeft ? (
          <div className="flex gap-2 sm:gap-4 lg:gap-6 items-start justify-center lg:justify-start w-full sm:w-auto">
            <div className="flex flex-col items-center">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-none w-12 sm:w-20 lg:w-24 text-center tabular-nums">
                {timeLeft.days}
              </span>
              <span className="font-cond text-[0.625rem] tracking-[0.125rem] uppercase text-club-gray mt-2">Days</span>
            </div>
            <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--primary-color)] pt-1 sm:pt-2">:</div>
            <div className="flex flex-col items-center">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-none w-12 sm:w-20 lg:w-24 text-center tabular-nums">
                {timeLeft.hours}
              </span>
              <span className="font-cond text-[0.625rem] tracking-[0.125rem] uppercase text-club-gray mt-2">Hours</span>
            </div>
            <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--primary-color)] pt-1 sm:pt-2">:</div>
            <div className="flex flex-col items-center">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-none w-12 sm:w-20 lg:w-24 text-center tabular-nums">
                {timeLeft.minutes}
              </span>
              <span className="font-cond text-[0.625rem] tracking-[0.125rem] uppercase text-club-gray mt-2">Mins</span>
            </div>
            <div className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--primary-color)] pt-1 sm:pt-2">:</div>
            <div className="flex flex-col items-center">
              <span className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--primary-color)] leading-none w-12 sm:w-20 lg:w-24 text-center tabular-nums">
                {timeLeft.seconds}
              </span>
              <span className="font-cond text-[0.625rem] tracking-[0.125rem] uppercase text-club-gray mt-2">Secs</span>
            </div>
          </div>
        ) : (
          <div className="py-2 w-full text-center lg:text-left">
            <p className="font-display text-3xl sm:text-4xl text-[var(--primary-color)] animate-pulse">MATCH IN PROGRESS</p>
          </div>
        )}
      </div>
    </div>
  );
};
