"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksMatch } from '../../tina/__generated__/types';
import { Reveal } from '../reveal';
import { MatchCountdown } from './match-countdown';
import { Calendar, History, Trophy, XCircle, MinusCircle } from 'lucide-react';

// ✅ Fixed: proper union types instead of 'any' casts
type ActiveTab = 'upcoming' | 'results';

interface ParsedMatch {
  opponent: string;
  vsOpponent: string;
  opponentLocation: string;
  date: string;
  status: string;
  resultScore: string;
  isHomeGame: boolean;
  parsedDate: Date;
}

const TAB_CONFIG: { id: ActiveTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'upcoming', label: 'Next Battles', icon: Calendar },
  { id: 'results', label: 'Past Glories', icon: History },
];

const MatchRow = ({ match, activeTab }: { match: ParsedMatch; activeTab: ActiveTab }) => {
  const isWin = match.status === 'W';
  const isLoss = match.status === 'L';
  const isHome = match.isHomeGame;
  const bgColor = isHome ? 'bg-[#1C1C2E]' : 'bg-[#2A2A1A]';
  const date = match.parsedDate;

  return (
    <div
      className={`match-row flex flex-col sm:grid items-center gap-4 sm:gap-6 px-5 sm:px-6 py-5 sm:py-4 border border-white/5 border-l-4 transition-all hover:bg-white/[0.04] cursor-default ${bgColor} ${
        isWin ? 'border-l-[var(--success-color)]' : isLoss ? 'border-l-[var(--error-color)]' : 'border-l-white/20'
      } sm:grid-cols-[80px_1fr_100px_140px]`}
    >
      {/* Date Column */}
      <div className="flex sm:block items-center justify-between w-full sm:w-auto sm:text-center border-b sm:border-none border-white/5 pb-3 sm:pb-0">
        <time dateTime={date.toISOString()} className="block">
          <p className="font-display text-2xl sm:text-3xl text-white leading-none">
            {date.getDate()}
          </p>
          <p className="font-cond text-[0.625rem] tracking-[0.125rem] uppercase text-white/60">
            {date.toLocaleDateString('en-US', { month: 'short' })} {date.getFullYear()}
          </p>
        </time>
        <div className="sm:hidden">
          <span className="font-cond font-bold text-[0.625rem] tracking-[0.125rem] uppercase px-3 py-1 border-2 border-white/20 text-white/80 whitespace-nowrap text-center min-w-[4.375rem]">
            {isHome ? 'Home' : 'Away'}
          </span>
        </div>
      </div>

      {/* Opponents Column */}
      <div className="w-full sm:w-auto">
        <div className="flex items-center gap-3 mb-1">
          <p className="font-cond font-bold text-lg sm:text-xl tracking-tight text-white uppercase">
            {match.opponent} <span className="text-[var(--primary-color)] mx-1 italic">vs</span> {match.vsOpponent}
          </p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.opponentLocation || '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.625rem] sm:text-xs text-white/40 hover:text-[var(--primary-color)] transition-colors uppercase tracking-widest flex items-center gap-1.5 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-[var(--primary-color)] group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          <span className="underline decoration-white/10 underline-offset-2">{match.opponentLocation}</span>
        </a>
      </div>

      {/* Home/Away Badge (Desktop Only) */}
      <div className="hidden sm:flex justify-center">
        <span className="font-cond font-bold text-[0.625rem] tracking-[0.125rem] uppercase px-3 py-1 border-2 border-white/20 text-white/80 whitespace-nowrap text-center min-w-[4.375rem]">
          {isHome ? 'Home' : 'Away'}
        </span>
      </div>

      {/* Result / Scoreboard Column */}
      <div className="flex items-center justify-between w-full sm:w-auto border-t sm:border-none border-white/5 pt-3 sm:pt-0">
        <span className="sm:hidden font-cond text-[0.625rem] tracking-[0.125rem] uppercase text-white/40">Result</span>
        <div className="flex items-center gap-3">
          {activeTab === 'results' && (
            <div className="flex items-center">
              {isWin ? (
                <Trophy className="size-4 text-[var(--success-color)] mr-2" />
              ) : isLoss ? (
                <XCircle className="size-4 text-[var(--error-color)] mr-2" />
              ) : (
                <MinusCircle className="size-4 text-white/20 mr-2" />
              )}
              <span className={`font-display text-2xl ${isWin ? 'text-[var(--success-color)]' : isLoss ? 'text-[var(--error-color)]' : 'text-white'}`}>
                {match.resultScore}
              </span>
            </div>
          )}
          {activeTab === 'upcoming' && (
            // ✅ Single source of truth: time parsed from parsedDate, not raw field
            <p className="font-display text-xl text-white/80">
              {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export const Match = ({ data }: { data: PageBlocksMatch }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('upcoming');
  const [now, setNow] = useState(new Date());

  // Update 'now' every minute to keep filtering fresh
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const allMatches = useMemo<ParsedMatch[]>(() => {
    return (data.matches || [])
      .map((m) => {
        if (!m?.date) return null;
        const parsedDate = new Date(m.date);
        if (isNaN(parsedDate.getTime())) return null;
        return {
          opponent: m.opponent ?? '',
          vsOpponent: m.vsOpponent ?? '',
          opponentLocation: m.opponentLocation ?? '',
          date: m.date,
          status: m.status ?? '',
          resultScore: m.resultScore ?? '',
          isHomeGame: m.isHomeGame ?? false,
          parsedDate,
        };
      })
      .filter((m): m is ParsedMatch => m !== null);
  }, [data.matches]);

  const upcomingMatches = useMemo(
    () =>
      allMatches
        .filter((m) => m.parsedDate.getTime() > now.getTime())
        .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime()),
    [allMatches, now]
  );

  const pastMatches = useMemo(
    () =>
      allMatches
        .filter((m) => m.parsedDate.getTime() <= now.getTime())
        .sort((a, b) => b.parsedDate.getTime() - a.parsedDate.getTime()),
    [allMatches, now]
  );

  const nextMatch = upcomingMatches[0];

  return (
    <>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
      <section id="schedule" className="relative py-20 md:py-28 bg-[var(--background-color)] overflow-hidden">
        {data.backgroundText && (
          <span className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display ghost-text text-white/5" data-tina-field={tinaField(data, 'backgroundText')}>
            {data.backgroundText}
          </span>
        )}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-16">
            <Reveal>
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6 relative z-10">
                {data.sectionNumber && (
                  <span className="font-display text-[4rem] sm:text-[5rem] leading-none text-outline-faint" data-tina-field={tinaField(data, 'sectionNumber')}>
                    {data.sectionNumber}
                  </span>
                )}
                <div className="pb-1">
                  {data.sectionLabel && (
                    <p className="font-cond font-bold text-[0.625rem] tracking-[0.2rem] sm:tracking-[0.25rem] uppercase mb-1 text-[var(--primary-color)]" data-tina-field={tinaField(data, 'sectionLabel')}>
                      {data.sectionLabel}
                    </p>
                  )}
                  {data.title && (
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide leading-none" data-tina-field={tinaField(data, 'title')}>
                      {data.title}
                    </h2>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Tab Navigation */}
            <div className="flex items-center w-full md:w-auto border-b border-white/10 md:border-none relative z-20">
              {TAB_CONFIG.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-1 md:flex-none items-center justify-center gap-2 font-cond font-bold text-[0.6875rem] tracking-[0.125rem] uppercase px-4 py-3 md:py-2 transition-all border-b-2 ${
                    activeTab === tab.id
                      ? "text-white border-[var(--primary-color)] bg-[var(--primary-color)]/10"
                      : "text-white/40 border-transparent hover:text-white/60"
                  }`}
                >
                  <tab.icon className="size-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Area */}
          <div className="grid grid-cols-1 items-start relative z-10 transition-all duration-500">
            {/* Upcoming Tab Content */}
            <div
              className={`col-start-1 row-start-1 transition-all duration-500 ${
                activeTab === 'upcoming' ? 'opacity-100 translate-y-0 z-20' : 'opacity-0 translate-y-4 z-10 pointer-events-none invisible h-0 overflow-hidden'
              }`}
            >
              {nextMatch && (
                <Reveal>
                  <MatchCountdown
                    nextMatch={{
                      ...nextMatch,
                      parsedDate: nextMatch.parsedDate.toISOString(),
                    }}
                  />
                </Reveal>
              )}
              <Reveal>
                <div className="flex flex-col gap-4 sm:gap-3">
                  {upcomingMatches.map((match, index) => (
                    <MatchRow key={`upcoming-${index}`} match={match} activeTab="upcoming" />
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Results Tab Content */}
            <div
              className={`col-start-1 row-start-1 transition-all duration-500 ${
                activeTab === 'results' ? 'opacity-100 translate-y-0 z-20' : 'opacity-0 translate-y-4 z-10 pointer-events-none invisible h-0 overflow-hidden'
              }`}
            >
              <Reveal>
                <div className="flex flex-col gap-4 sm:gap-3">
                  {pastMatches.length > 0 ? (
                    pastMatches.map((match, index) => (
                      <MatchRow key={`results-${index}`} match={match} activeTab="results" />
                    ))
                  ) : (
                    <div className="py-20 text-center border border-white/5 bg-white/[0.02]">
                      <p className="font-display text-2xl text-white/20 tracking-widest uppercase">No results found</p>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
    </>
  );
};
