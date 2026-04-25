import * as React from 'react';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksAbout } from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Reveal } from '../reveal';
// ✅ Fixed: removed unused `cn` import

export const About = ({ data }: { data: PageBlocksAbout }) => {
  return (
    <>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
      <section id="about" className="relative py-20 md:py-28 overflow-hidden bg-club-black">
        {data.backgroundText && (
          <span className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display ghost-text text-white/5" data-tina-field={tinaField(data, 'backgroundText')}>
            {data.backgroundText}
          </span>
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6 mb-12 md:mb-16">
            <Reveal>
              <div className="flex items-end gap-4 md:gap-6">
                {data.sectionNumber && (
                  <span className="font-display text-[4rem] sm:text-[5rem] leading-none text-outline-faint shrink-0" data-tina-field={tinaField(data, 'sectionNumber')}>
                    {data.sectionNumber}
                  </span>
                )}
                <div className="pb-1">
                  {data.sectionLabel && (
                    <p className="font-cond font-bold text-[0.625rem] sm:text-[0.75rem] tracking-[0.2rem] sm:tracking-[0.25rem] uppercase mb-1 text-club-red" data-tina-field={tinaField(data, 'sectionLabel')}>
                      {data.sectionLabel}
                    </p>
                  )}
                  {data.headline && (
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide leading-none" data-tina-field={tinaField(data, 'headline')}>
                      {data.headline}
                    </h2>
                  )}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Left Content */}
            <Reveal>
              <div className="space-y-6">
                {data.tagline && (
                  <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-white/80" data-tina-field={tinaField(data, 'tagline')}>
                    {data.tagline}
                  </p>
                )}
                {/* Red accent line */}
                <div className="flex items-center gap-3 pt-2">
                  <span className="block w-10 h-0.5 bg-club-red"></span>
                  <span className="font-cond text-[0.625rem] sm:text-xs tracking-[0.15rem] sm:tracking-[0.1875rem] uppercase text-club-red font-bold">Forest · Vorst · Brussels</span>
                </div>
              </div>
            </Reveal>

            {/* Right: Value cards */}
            {data.valuesList && data.valuesList.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {data.valuesList.map((item, index) => (
                  <Reveal key={index} delay={index * 100}>
                    <div className="flex items-start gap-4 p-5 border-l-[3px] border-club-red bg-club-red/[0.04] hover:bg-club-red/[0.08] transition-colors h-full">
                      {item?.icon && (
                        <Icon
                          tinaField={tinaField(item, 'icon')}
                          data={{ size: 'medium', ...item.icon } as any}
                        />
                      )}
                      <div>
                        {item?.title && (
                          <strong className="block font-cond font-bold text-[0.75rem] tracking-[0.125rem] uppercase mb-1.5 text-club-red" data-tina-field={tinaField(item, 'title')}>
                            {item.title}
                          </strong>
                        )}
                        {item?.paragraph && (
                          <p className="text-sm leading-snug text-club-gray" data-tina-field={tinaField(item, 'paragraph')}>
                            {item.paragraph}
                          </p>
                        )}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
    </>
  );
};
