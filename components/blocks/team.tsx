"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksTeam, PageBlocksTeamPlayers } from '../../tina/__generated__/types';
import { PlayerCardPro } from './player-card-pro';
import { ChevronDown, Filter } from 'lucide-react';

const FORWARDS = ["Prop", "Hooker", "Lock", "Flanker", "Number 8"];
const BACKS = ["Scrum-half", "Fly-half", "Centre", "Wing", "Full-back"];

// ✅ Fixed: proper union type instead of 'any'
type FilterTab = 'all' | 'forwards' | 'backs' | 'coach';

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All Squad' },
  { id: 'forwards', label: 'Forwards' },
  { id: 'backs', label: 'Backs' },
  { id: 'coach', label: 'Staff' },
];

// ✅ Fixed: stable shuffle — runs once on mount, not on every data reference change
function shuffleOnce<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export const Team = ({ data }: { data: PageBlocksTeam }) => {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [displayLimit, setDisplayLimit] = useState(12);

  // ✅ Fixed: shuffle only once using a ref guard so it doesn't re-run on parent re-renders
  const shuffledRef = useRef<PageBlocksTeamPlayers[]>([]);
  const hasShuffled = useRef(false);

  if (!hasShuffled.current && data.players) {
    shuffledRef.current = shuffleOnce(data.players.filter(Boolean) as PageBlocksTeamPlayers[]);
    hasShuffled.current = true;
  }

  const filteredPlayers = useMemo(() => {
    const players = shuffledRef.current;
    if (activeFilter === 'all') return players;
    return players.filter((p) => {
      const role = p?.role ?? '';
      if (activeFilter === 'forwards') return FORWARDS.includes(role);
      if (activeFilter === 'backs') return BACKS.includes(role);
      if (activeFilter === 'coach') return role === 'Coach';
      return true;
    });
  }, [activeFilter]);

  const visiblePlayers = filteredPlayers.slice(0, displayLimit);
  const hasMore = filteredPlayers.length > displayLimit;

  return (
    <>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
      <section id="team" className="relative py-28 bg-[var(--background-color)] overflow-hidden">
        {data.backgroundText && (
          <span className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display ghost-text text-white/5" data-tina-field={tinaField(data, 'backgroundText')}>
            {data.backgroundText}
          </span>
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="flex items-end gap-6 reveal">
              {data.sectionNumber && (
                <span className="font-display text-[5rem] leading-none text-outline-faint" data-tina-field={tinaField(data, 'sectionNumber')}>
                  {data.sectionNumber}
                </span>
              )}
              <div>
                {data.sectionLabel && (
                  <p className="font-cond font-bold text-[0.625rem] tracking-[0.25rem] uppercase text-[var(--primary-color)] mb-1" data-tina-field={tinaField(data, 'sectionLabel')}>
                    {data.sectionLabel}
                  </p>
                )}
                {data.title && (
                  <h2 className="font-display text-6xl tracking-wide leading-none" data-tina-field={tinaField(data, 'title')}>
                    {data.title}
                  </h2>
                )}
              </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-2 md:pb-0 md:border-none">
              <Filter className="size-4 text-club-red mr-2 hidden sm:block" />
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveFilter(tab.id);
                    setDisplayLimit(12);
                  }}
                  className={`font-cond font-bold text-[0.6875rem] tracking-[0.125rem] uppercase px-4 py-2 transition-all border-b-2 ${
                    activeFilter === tab.id
                      ? "text-white border-club-red bg-club-red/10"
                      : "text-white/40 border-transparent hover:text-white/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 min-h-[400px]">
            {visiblePlayers.length > 0 ? (
              visiblePlayers.map((player, index) => (
                <div key={`${player.name}-${index}`} className="reveal animate visible">
                  <PlayerCardPro player={player} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-white/5 bg-white/[0.02]">
                <p className="font-display text-2xl text-white/20 tracking-widest uppercase">No players found in this category</p>
              </div>
            )}
          </div>

          {/* Toggle Display Button */}
          {filteredPlayers.length > 12 && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setDisplayLimit(prev => prev > 12 ? 12 : filteredPlayers.length)}
                className="btn-skew flex items-center gap-3 font-cond font-bold text-sm tracking-[0.1875rem] uppercase px-12 py-5 bg-white/[0.03] border border-white/10 text-white hover:bg-club-red hover:border-club-red transition-all group"
              >
                {displayLimit > 12 ? 'Show Less Players' : 'Show All Players'}
                <ChevronDown className={`size-4 group-hover:translate-y-1 transition-transform ${displayLimit > 12 ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}

          {/* Join Footer */}
          <div className="mt-24 pt-12 border-t border-white/5 text-center">
            <a
              href="#contact"
              className="group inline-flex flex-col items-center gap-4 transition-all"
            >
              <span className="font-cond text-[0.625rem] tracking-[0.4rem] uppercase text-club-red opacity-80 group-hover:opacity-100 transition-opacity">
                Want to join the squad?
              </span>
              <span className="font-display text-4xl sm:text-5xl tracking-[0.2rem] text-white hover:text-club-red transition-colors flex items-center gap-4">
                JOIN THE CLUB <span className="text-club-red group-hover:translate-x-2 transition-transform">→</span>
              </span>
            </a>
          </div>
        </div>
      </section>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
    </>
  );
};
