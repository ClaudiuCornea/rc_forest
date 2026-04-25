'use client';
import { PageBlocksGallery } from '../../tina/__generated__/types';
import Image from 'next/image';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { tinaField } from "tinacms/dist/react";
import { cn } from '@/lib/utils';
import { Reveal } from '../reveal';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';

type Album = NonNullable<NonNullable<PageBlocksGallery['albums']>[number]>;
type ImageItem = NonNullable<NonNullable<Album['images']>[number]>;

export const Gallery = ({ data }: { data: PageBlocksGallery }) => {
  const [selectedAlbumName, setSelectedAlbumName] = useState<string>('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImgs, setCurrentImgs] = useState<string[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTablet, setIsTablet] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive check for tablet and mobile
  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkResponsive();
    window.addEventListener('resize', checkResponsive);
    return () => window.removeEventListener('resize', checkResponsive);
  }, []);

  // Initialize selected album
  useEffect(() => {
    if (data.albums && data.albums.length > 0 && !selectedAlbumName) {
      setSelectedAlbumName(data.albums[0]?.name || '');
    }
  }, [data.albums, selectedAlbumName]);

  const currentAlbum = useMemo(() => 
    data.albums?.find(album => album?.name === selectedAlbumName),
    [data.albums, selectedAlbumName]
  );

  const openLightbox = useCallback((imgSrc: string) => {
    if (currentAlbum?.images) {
      const imagesSrc = currentAlbum.images
        .map(img => img?.src || '')
        .filter(src => src !== '');
      
      setCurrentImgs(imagesSrc);
      const idx = imagesSrc.indexOf(imgSrc);
      setCurrentIdx(idx >= 0 ? idx : 0);
      setLightboxOpen(true);
      document.body.style.overflow = 'hidden';
    }
  }, [currentAlbum]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const prevPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prevIdx) => (prevIdx - 1 + currentImgs.length) % currentImgs.length);
  }, [currentImgs.length]);

  const nextPhoto = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIdx((prevIdx) => (prevIdx + 1) % currentImgs.length);
  }, [currentImgs.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, prevPhoto, nextPhoto, closeLightbox]);

  const renderImageItem = (image: ImageItem, index: number, className?: string) => (
    <div
      key={`${selectedAlbumName}-${index}`}
      className={cn(
        "gallery-item relative overflow-hidden group cursor-pointer border border-white/5 bg-white/[0.02] w-full",
        className
      )}
      onClick={() => openLightbox(image?.src || '')}
    >
      <Image
        src={image?.src || ''}
        alt={image?.alt || ''}
        fill
        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        data-tina-field={tinaField(image)}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0">
        <div className="flex items-center justify-between">
          <span className="font-cond text-[0.625rem] tracking-[0.2rem] uppercase text-white font-bold">
            {image?.alt || 'View Image'}
          </span>
          <Maximize2 className="size-4 text-club-red" />
        </div>
      </div>

      {/* Border Accent */}
      <div className="absolute inset-0 border-2 border-club-red/0 group-hover:border-club-red/40 transition-colors duration-500 pointer-events-none" />
    </div>
  );

  return (
    <>
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
      <section id="gallery" className="relative py-20 md:py-28 bg-club-black overflow-hidden">
        {data.backgroundText && (
          <span className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display ghost-text text-white/5" data-tina-field={tinaField(data, 'backgroundText')}>
            {data.backgroundText}
          </span>
        )}

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
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

          {/* Album Tabs - Dedicated Line */}
          {data.albums && data.albums.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-2 mb-12">
              <Camera className="size-4 text-club-red mr-2 hidden sm:block" />
              {data.albums.map((album, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAlbumName(album?.name || '')}
                  className={cn(
                    "font-cond font-bold text-[0.6875rem] tracking-[0.125rem] uppercase px-4 py-2 transition-all border-b-2",
                    selectedAlbumName === album?.name 
                      ? "text-white border-club-red bg-club-red/10" 
                      : "text-white/40 border-transparent hover:text-white/60"
                  )}
                  data-tina-field={tinaField(album, 'name')}
                >
                  {album?.name}
                </button>
              ))}
            </div>
          )}

          {/* Gallery Content */}
          <Reveal>
            <div className="min-h-[600px] sm:min-h-[800px] lg:min-h-[850px] flex flex-col justify-start transition-all duration-500">
              {currentAlbum && currentAlbum.images && currentAlbum.images.length > 0 ? (
                <div className="space-y-8">
                  {(() => {
                    const images = (currentAlbum.images || []).filter((img): img is ImageItem => !!img);
                    const count = images.length;
                    
                    // Responsive Limit Logic
                    // Mobile: Max 3
                    // Tablet: Max 4
                    // Desktop: Max 5
                    let limit = 5;
                    if (isMobile) limit = 3;
                    else if (isTablet) limit = 4;
                    
                    const hasMore = count > limit;
                    const displayImages = hasMore ? images.slice(0, limit) : images;
                    
                    // Adaptive Grid Logic
                    let gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
                    if (count === 1) gridClass = "max-w-4xl mx-auto";
                    if (count === 2) gridClass = "grid grid-cols-1 sm:grid-cols-2 gap-4";
                    
                    // Specific for 3 images (Desktop: 3 cols, Tablet: 2 cols)
                    if (count === 3 || (isMobile && count >= 3)) gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";

                    // On tablet (md to lg), use 2x2 for 4+ images
                    if (count === 4 || (isTablet && count >= 4)) {
                      gridClass = "grid grid-cols-2 gap-4 max-w-5xl mx-auto";
                    } else if (count >= 5 && !isTablet && !isMobile) {
                      gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4";
                    }

                    return (
                      <>
                        <div className={gridClass}>
                          {displayImages.map((image, index) => {
                            // Stable height calculations
                            let itemClass = "h-[300px] sm:h-[400px] lg:h-[400px]";
                            
                            // Feature the first image in 3-image layout (Mobile/Tablet/Desktop)
                            if ((count === 3 || (isMobile && count >= 3)) && index === 0) {
                              itemClass = "h-[350px] sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:h-[816px]";
                            }

                            // Feature the first image in larger grids (count >= 5 on desktop)
                            if (count >= 5 && index === 0 && !isTablet && !isMobile) {
                              itemClass = "h-[400px] sm:h-[500px] lg:col-span-2 lg:row-span-2 lg:h-[816px]";
                            }

                            // 2x2 Square for Tablet or exactly 4 images
                            if (count === 4 || (isTablet && count >= 4)) {
                              itemClass = "aspect-square h-auto lg:h-[400px]";
                            }

                            // For 1 image, make it prominent
                            if (count === 1) {
                              itemClass = "h-[400px] sm:h-[600px] lg:h-[816px]";
                            }

                            // For 2 images, make them prominent
                            if (count === 2) {
                              itemClass = "h-[400px] sm:h-[600px] lg:h-[816px]";
                            }
                            
                            return renderImageItem(image, index, itemClass);
                          })}
                        </div>

                        {hasMore && (
                          <div className="flex justify-center pt-8">
                            <button
                              onClick={() => openLightbox(images[0]?.src || '')}
                              className="btn-skew flex items-center gap-3 font-cond font-bold text-sm tracking-[0.1875rem] uppercase px-12 py-5 bg-white/[0.03] border border-white/10 text-white hover:bg-club-red hover:border-club-red transition-all group"
                            >
                              Explore All {count} Photos
                              <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              ) : (
                <div className="py-24 text-center border border-white/5 bg-white/[0.02] flex-1 flex flex-col items-center justify-center">
                  <p className="font-display text-2xl text-white/20 tracking-widest uppercase">No memories in this album yet</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Enhanced Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 backdrop-blur-sm transition-all duration-300"
          onClick={closeLightbox}
        >
          {/* Controls */}
          <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-[210] bg-gradient-to-b from-black/60 to-transparent">
            <div className="flex flex-col">
              <span className="font-display text-2xl text-white tracking-wider">{selectedAlbumName}</span>
              <span className="font-cond text-xs text-white/40 tracking-[0.2rem] uppercase">
                {currentIdx + 1} <span className="text-club-red">/</span> {currentImgs.length}
              </span>
            </div>
            <button 
              onClick={closeLightbox}
              className="p-3 bg-white/5 hover:bg-club-red transition-colors rounded-full group"
            >
              <X className="size-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <button 
            onClick={prevPhoto}
            className="absolute left-4 md:left-8 p-4 bg-white/5 hover:bg-club-red transition-all rounded-full group z-[210] hidden sm:block"
          >
            <ChevronLeft className="size-8 text-white group-hover:-translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={nextPhoto}
            className="absolute right-4 md:right-8 p-4 bg-white/5 hover:bg-club-red transition-all rounded-full group z-[210] hidden sm:block"
          >
            <ChevronRight className="size-8 text-white group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Main Image Container */}
          <div 
            className="relative w-full h-full max-w-[90vw] max-h-[80vh] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {currentImgs.length > 0 && (
              <div className="relative w-full h-full">
                <Image
                  src={currentImgs[currentIdx]}
                  alt="Gallery large view"
                  fill
                  className="object-contain select-none shadow-2xl"
                  sizes="90vw"
                  priority
                />
              </div>
            )}
          </div>

          {/* Mobile Swipe / Tap Hint */}
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 sm:hidden">
            <button onClick={prevPhoto} className="p-4 bg-white/10 rounded-full"><ChevronLeft className="size-6" /></button>
            <button onClick={nextPhoto} className="p-4 bg-white/10 rounded-full"><ChevronRight className="size-6" /></button>
          </div>
        </div>
      )}
      <div className="h-0.5 bg-[linear-gradient(to_right,transparent,var(--primary-color),transparent)]"></div>
    </>
  );
};
