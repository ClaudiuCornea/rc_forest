import React from 'react';
import Image from 'next/image';
import { Ruler, Weight, Calendar } from 'lucide-react';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksTeamPlayers } from '../../tina/__generated__/types';

interface PlayerCardProProps {
  player: PageBlocksTeamPlayers;
}

// ✅ Fixed: robust numeric extraction — handles "180cm", "180 CM", "180", "180kg" etc.
function extractNumber(value: string | null | undefined): string {
  if (!value) return '';
  const match = value.match(/\d+/);
  return match ? match[0] : value;
}

export const PlayerCardPro = ({ player }: PlayerCardProProps) => {
  if (!player) return null;

  return (
    <div className="player-card-pro shimmer-container relative border border-white/10 overflow-hidden bg-[#121212] group">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 group-hover:opacity-50 transition-opacity"></div>

      {/* Image Container with Zoom */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-black">
        {player.image && (
          <Image
            src={player.image}
            alt={player.imageAlt || player.name || 'Team Player'}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
            width={400}
            height={500}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            data-tina-field={tinaField(player, 'image')}
          />
        )}

        {/* Role Overlay */}
        {player.role && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/60 to-transparent p-4 pt-12">
            <span className="inline-block px-3 py-1 bg-club-red font-cond font-bold text-[0.625rem] tracking-[0.1875rem] uppercase text-white skew-x-[-12deg]" data-tina-field={tinaField(player, 'role')}>
              {player.role}
            </span>
          </div>
        )}
      </div>

      <div className="p-5 relative z-10 bg-[#121212]">
        {player.name && (
          <h3 className="font-display text-2xl tracking-wide leading-none mb-4 group-hover:text-club-red transition-colors" data-tina-field={tinaField(player, 'name')}>
            {player.name}
          </h3>
        )}

        {/* Technical Stats Grid */}
        <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
          {player.height && (
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-club-red/10 transition-colors border border-transparent hover:border-club-red/20">
              <Ruler className="size-3.5 text-club-red mb-1.5 opacity-80" />
              {/* ✅ Fixed: robust number extraction */}
              <p className="font-display text-lg text-white leading-none">
                {extractNumber(player.height)}
              </p>
              <span className="font-cond text-[0.5rem] tracking-[0.0625rem] uppercase text-club-gray">CM</span>
            </div>
          )}

          {player.weight && (
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-club-red/10 transition-colors border border-transparent hover:border-club-red/20">
              <Weight className="size-3.5 text-club-red mb-1.5 opacity-80" />
              <p className="font-display text-lg text-white leading-none">
                {extractNumber(player.weight)}
              </p>
              <span className="font-cond text-[0.5rem] tracking-[0.0625rem] uppercase text-club-gray">KG</span>
            </div>
          )}

          {player.age && (
            <div className="flex flex-col items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-club-red/10 transition-colors border border-transparent hover:border-club-red/20">
              <Calendar className="size-3.5 text-club-red mb-1.5 opacity-80" />
              <p className="font-display text-lg text-white leading-none">
                {player.age}
              </p>
              <span className="font-cond text-[0.5rem] tracking-[0.0625rem] uppercase text-club-gray">YRS</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
