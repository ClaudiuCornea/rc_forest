'use client';
import Image from 'next/image';
import Link from 'next/link';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksHero } from '../../tina/__generated__/types';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const headlineWords = data.headline?.split(' ') || [];
  
  return (
    <>
      <section className="hero-min-height h-[100dvh] pt-20 relative overflow-hidden stripe-bg flex flex-col">
        {data.year && (
          <span className="absolute right-[-2%] bottom-0 font-display ghost-text text-white/5" data-tina-field={tinaField(data, 'year')}>
            {data.year}
          </span>
        )}
        
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-6 w-full relative z-10 py-8 md:py-0">
            {/* 60/40 Grid Implementation */}
            <div className="flex flex-col md:grid md:grid-cols-[1.2fr_0.8fr] gap-8 sm:gap-12 md:gap-20 lg:gap-24 items-center">
              
              {/* Image Column (30% Support - First on mobile, Right on tablet/desktop) */}
              {/* ✅ Removed Reveal for critical LCP element */}
              <div className={cn("order-1 md:order-2 w-full transition-opacity duration-700", !mounted ? "opacity-0" : "opacity-100")}>
                <div className="flex items-center justify-center md:justify-end py-2 md:py-0 relative z-20">
                  <div className="logo-glow relative w-[35vw] sm:w-[40vw] md:w-[25vw] lg:w-full max-w-[180px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-[420px] aspect-square">
                    {data.logoImage ? (
                      <Image
                        src={data.logoImage}
                        alt={data.logoImageAlt || data.headline || 'Rugby Club Logo'}
                        className="animate-float relative z-10 w-full h-full object-contain drop-shadow-[0_0_1.5rem_rgba(var(--primary-color-rgb),0.4)]"
                        fill
                        priority
                        fetchPriority="high"
                        sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, (max-width: 1024px) 300px, 420px"
                        data-tina-field={tinaField(data, 'logoImage')}
                      />
                    ) : (
                      <div 
                        className="w-full h-full bg-club-red/5 rounded-2xl border-2 border-dashed border-club-red/20 flex flex-col items-center justify-center gap-2 animate-float relative z-10" 
                        data-tina-field={tinaField(data, 'logoImage')}
                      >
                        <span className="text-club-red text-2xl sm:text-4xl">🏉</span>
                        <span className="font-cond text-[0.6rem] sm:text-xs tracking-widest uppercase text-club-red/40">Logo Placeholder</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Content Column (60% Authority - Second on mobile, Left on tablet/desktop) */}
              {/* ✅ Removed Reveal for critical LCP text */}
              <div className={cn("order-2 md:order-1 w-full transition-all duration-700", !mounted ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0")}>
                <div className="flex flex-col justify-center text-center md:text-left pt-2 md:pt-0">
                  <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-3 mb-2 sm:mb-4 md:mb-6">
                    <span className="block w-6 h-0.5 bg-club-red"></span>
                    {data.subTagline && (
                      <span className="font-cond font-bold text-[0.625rem] sm:text-sm tracking-[0.15rem] sm:tracking-[0.2rem] uppercase text-club-red" data-tina-field={tinaField(data, 'subTagline')}>
                        {data.subTagline}
                      </span>
                    )}
                  </div>
                  
                  {data.headline && (
                    <h1 className="font-display leading-[0.85] tracking-tight md:tracking-wide text-[12vw] sm:text-[10vw] md:text-[6.5rem] lg:text-[8rem] xl:text-[9.5rem] mb-3 sm:mb-6" data-tina-field={tinaField(data, 'headline')}>
                      {headlineWords.map((word, i) => (
                        <span 
                          key={i} 
                          className={cn(
                            "block",
                            i === 0 ? "text-outline" : "text-white"
                          )}
                        >
                          {word}
                        </span>
                      ))}
                    </h1>
                  )}
                  
                  {data.tagline && (
                    <p className="font-cond text-base sm:text-lg md:text-xl tracking-wide text-club-gray max-w-xl mx-auto md:mx-0 leading-relaxed mb-6 sm:mb-10" data-tina-field={tinaField(data, 'tagline')}>
                      {data.tagline}
                    </p>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
                    {data.actions &&
                      data.actions.map((action, index) => {
                        const isPrimary = action!.type === 'button' || index === 0;
                        return (
                          <Link
                            key={index}
                            href={action!.link!}
                            className={cn(
                              "btn-skew font-cond font-bold text-sm tracking-[0.125rem] lg:tracking-[0.15rem] uppercase px-6 sm:px-10 py-3.5 sm:py-4 transition-all hover:-translate-y-1 text-center min-w-[140px] sm:min-w-[180px] whitespace-nowrap",
                              isPrimary 
                                ? "bg-club-red text-white shadow-[0_0_1.5rem_rgba(var(--primary-color-rgb),0.4)]" 
                                : "border border-white/20 text-white bg-white/5"
                            )}
                            data-tina-field={tinaField(action)}
                          >
                            {action!.label}
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Dynamic Section Divider at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)] z-30"></div>
      </section>
    </>
  );
};
