'use client';

import * as React from 'react';
import { tinaField } from "tinacms/dist/react";
import { PageBlocksContact } from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { Reveal } from '../reveal';
import { useState } from 'react';
import { MapPin, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { sendEmail } from '@/app/actions/send-email';

export const Contact = ({ data }: { data: PageBlocksContact }) => {
  const [showMap, setShowMap] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const result = await sendEmail(formData);

    if (result.success) {
      setStatus('success');
    } else {
      setStatus('error');
      alert(result.error || 'Something went wrong');
    }
  };

  return (
    <>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
      <section id="contact" className="relative py-20 md:py-28 bg-club-black overflow-hidden">
        {data.backgroundText && (
          <span className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display ghost-text text-white/5" data-tina-field={tinaField(data, 'backgroundText')}>
            {data.backgroundText}
          </span>
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <Reveal>
              <div className="flex items-end gap-6">
                {data.sectionNumber && (
                  <span className="font-display text-[4rem] sm:text-[5rem] leading-none text-outline-faint" data-tina-field={tinaField(data, 'sectionNumber')}>
                    {data.sectionNumber}
                  </span>
                )}
                <div className="pb-1">
                  {data.sectionLabel && (
                    <p className="font-cond font-bold text-[0.625rem] tracking-[0.25rem] uppercase text-club-red mb-1" data-tina-field={tinaField(data, 'sectionLabel')}>
                      {data.sectionLabel}
                    </p>
                  )}
                  {data.title && (
                    <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-wide leading-none text-white" data-tina-field={tinaField(data, 'title')}>
                      {data.title}
                    </h2>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
            {/* Left Column: Info & Details */}
            <div className="lg:col-span-5 space-y-12 order-1">
              <Reveal>
                <div>
                  {data.mainHeadline && (
                    <h3 className="font-display leading-[0.85] mb-6 text-[10vw] sm:text-[4rem] lg:text-[5rem] text-white uppercase" data-tina-field={tinaField(data, 'mainHeadline')}>
                      <span dangerouslySetInnerHTML={{ __html: data.mainHeadline }} />
                    </h3>
                  )}
                  {data.mainParagraph && (
                    <p className="font-cond text-lg text-club-gray leading-relaxed mb-8 max-w-md" data-tina-field={tinaField(data, 'mainParagraph')}>
                      {data.mainParagraph}
                    </p>
                  )}
                  
                  {/* Contact Info Cards */}
                  {data.contact_info && data.contact_info.length > 0 && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                      {data.contact_info.map((item, index) => (
                        <div 
                          key={index} 
                          className="flex items-start gap-4 p-5 border-l-[3px] border-club-red bg-club-red/[0.04] hover:bg-club-red/[0.08] transition-all group"
                        >
                          {item?.icon && (
                            <div className="shrink-0 mt-1">
                              <Icon
                                tinaField={tinaField(item, 'icon')}
                                data={{ size: 'medium', ...item.icon } as any}
                              />
                            </div>
                          )}
                          <div>
                            {item?.title && (
                              <strong className="block font-cond font-bold text-[0.75rem] tracking-[0.125rem] uppercase text-club-red mb-1.5" data-tina-field={tinaField(item, 'title')}>
                                {item.title}
                              </strong>
                            )}
                            {item?.details && (
                              <p className="text-sm leading-snug text-white/80" data-tina-field={tinaField(item, 'details')}>
                                {item.details}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            </div>

            {/* Right Column: Form */}
            {data.form && (
              <div className="lg:col-span-7 order-2">
                <Reveal>
                  <div className="bg-white/[0.02] border border-white/5 p-8 relative group overflow-hidden min-h-[500px] flex flex-col justify-center">
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-club-red/5 -mr-16 -mt-16 rotate-45 group-hover:bg-club-red/10 transition-colors" />
                    
                    {status === 'success' ? (
                      <div className="relative z-10 text-center space-y-6 reveal animate visible">
                        <div className="size-20 bg-club-red/10 border border-club-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Send className="size-8 text-club-red animate-pulse" />
                        </div>
                        <h4 className="font-display text-4xl tracking-wider text-white">MESSAGE SENT!</h4>
                        <p className="font-cond text-lg text-club-gray max-w-xs mx-auto">
                          Thanks for reaching out. A member of the squad will get back to you shortly.
                        </p>
                        <button 
                          onClick={() => setStatus('idle')}
                          className="font-cond font-bold text-xs tracking-[0.2rem] uppercase text-club-red hover:text-white transition-colors"
                        >
                          Send another message
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6">
                        {data.form.title && (
                          <h4 className="font-display text-3xl tracking-wider text-white mb-2" data-tina-field={tinaField(data.form, 'title')}>
                            {data.form.title}
                          </h4>
                        )}

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label className="font-cond font-bold text-[0.625rem] tracking-[0.125rem] uppercase text-club-red" htmlFor="firstName" data-tina-field={tinaField(data.form, 'firstNameLabel')}>
                              {data.form.firstNameLabel}
                            </label>
                            <input 
                              required
                              name="firstName"
                              type="text" 
                              id="firstName" 
                              placeholder="Jean" 
                              className="bg-white/[0.03] border border-white/10 text-white text-sm px-5 py-4 transition-all focus:border-club-red outline-none hover:bg-white/[0.05]" 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <label className="font-cond font-bold text-[0.625rem] tracking-[0.125rem] uppercase text-club-red" htmlFor="lastName" data-tina-field={tinaField(data.form, 'lastNameLabel')}>
                              {data.form.lastNameLabel}
                            </label>
                            <input 
                              required
                              name="lastName"
                              type="text" 
                              id="lastName" 
                              placeholder="Dupont" 
                              className="bg-white/[0.03] border border-white/10 text-white text-sm px-5 py-4 transition-all focus:border-club-red outline-none hover:bg-white/[0.05]" 
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-cond font-bold text-[0.625rem] tracking-[0.125rem] uppercase text-club-red" htmlFor="email" data-tina-field={tinaField(data.form, 'emailLabel')}>
                            {data.form.emailLabel}
                          </label>
                          <input 
                            required
                            name="email"
                            type="email" 
                            id="email" 
                            placeholder="jean@example.com" 
                            className="bg-white/[0.03] border border-white/10 text-white text-sm px-5 py-4 transition-all focus:border-club-red outline-none hover:bg-white/[0.05]" 
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-cond font-bold text-[0.625rem] tracking-[0.125rem] uppercase text-club-red" htmlFor="rugbyExperience" data-tina-field={tinaField(data.form, 'rugbyExperienceLabel')}>
                            {data.form.rugbyExperienceLabel}
                          </label>
                          <div className="relative">
                            <select name="experience" id="rugbyExperience" className="w-full bg-white/[0.03] border border-white/10 text-white text-sm px-5 py-4 transition-all focus:border-club-red outline-none appearance-none hover:bg-white/[0.05]">
                              <option value="" className="bg-club-black">Select your level...</option>
                              <option value="Beginner" className="bg-club-black">Complete Beginner</option>
                              <option value="Casual" className="bg-club-black">Casual Player</option>
                              <option value="Club" className="bg-club-black">Club Experience</option>
                              <option value="Competitive" className="bg-club-black">Competitive Level</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-club-red opacity-50">
                              ▼
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="font-cond font-bold text-[0.625rem] tracking-[0.125rem] uppercase text-club-red" htmlFor="message" data-tina-field={tinaField(data.form, 'messageLabel')}>
                            {data.form.messageLabel}
                          </label>
                          <textarea 
                            name="message"
                            id="message" 
                            placeholder="Tell us a bit about yourself..." 
                            rows={4} 
                            className="bg-white/[0.03] border border-white/10 text-white text-sm px-5 py-4 resize-none transition-all focus:border-club-red outline-none hover:bg-white/[0.05]" 
                          />
                        </div>

                        <button 
                          disabled={status === 'sending'}
                          type="submit"
                          className="btn-skew w-full flex items-center justify-center gap-3 font-cond font-bold text-sm tracking-[0.2rem] uppercase py-5 transition-all hover:-translate-y-1 bg-club-red text-white shadow-[0_10px_30px_rgba(var(--primary-color-rgb),0.3)] group/btn disabled:opacity-70 disabled:cursor-not-allowed"
                          data-tina-field={tinaField(data.form, 'buttonText')}
                        >
                          {status === 'sending' ? 'TRANSMITTING...' : data.form.buttonText}
                          <Send className={cn("size-4 transition-transform", status === 'sending' ? "animate-ping" : "group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1")} />
                        </button>
                      </form>
                    )}
                  </div>
                </Reveal>
              </div>
            )}

            {/* Full Width Map */}
            {data.mapIframeSrc && (
              <div className="lg:col-span-12 order-3 pt-8">
                <Reveal threshold={0.1}>
                  <div 
                    ref={(el) => {
                      if (el && !showMap) {
                        const observer = new IntersectionObserver(([entry]) => {
                          if (entry.isIntersecting) {
                            setShowMap(true);
                            observer.disconnect();
                          }
                        });
                        observer.observe(el);
                      }
                    }}
                  >
                    <div className="aspect-[16/9] sm:aspect-[21/9] bg-white/[0.02] border border-white/5 transition-all duration-500 overflow-hidden relative group">
                      {!showMap ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-cond text-[0.625rem] tracking-[0.3rem] uppercase text-club-red animate-pulse">Initializing Map...</span>
                        </div>
                      ) : (
                        <iframe
                          src={data.mapIframeSrc}
                          width="100%"
                          height="100%"
                          allowFullScreen={true}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Rugby Club Location"
                          className="grayscale invert-[0.9] contrast-[1.2] opacity-80 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
                          data-tina-field={tinaField(data, 'mapIframeSrc')}
                        ></iframe>
                      )}
                      
                      {/* Map Overlay Frame */}
                      <div className="absolute inset-0 border border-white/5 pointer-events-none group-hover:border-club-red/20 transition-colors" />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
                      <div className="flex items-center gap-3">
                        <MapPin className="size-4 text-club-red" />
                        <span className="font-cond font-bold text-[0.6875rem] tracking-[0.125rem] uppercase text-club-gray">
                          Terrain du Bempt · Brussels
                        </span>
                      </div>
                      <a 
                        href="https://www.google.com/maps/search/?api=1&query=Rugby+Club+Forest+Vorst"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-cond font-bold text-[0.6875rem] tracking-[0.125rem] uppercase text-white hover:text-club-red transition-colors flex items-center gap-2 group/link"
                      >
                        Get Directions
                        <span className="text-club-red group-hover/link:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            )}
          </div>
        </div>
      </section>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
    </>
  );
};
