"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/team.JPG"
          alt="Rugby team RC Forest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 gradient-red-black opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.webp"
            alt="RC Forest logo"
            width={64} height={64}
            className="size-28"
            priority
          />
        </div>

        {/* Main Heading */}
        <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl text-white mb-6 text-shadow-strong">
          RC FOREST
        </h1>
        
        {/* Subtitle */}
        <p className="section-heading text-2xl md:text-3xl lg:text-4xl text-white/90 mb-4 text-shadow-strong">
          RUGBY CLUB
        </p>
        
        {/* Tagline */}
        <p className="body-text-medium text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Concentration • Intensity • Unity
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="#contact">
            <Button
              size="lg"
              className="bg-rugby-red hover:bg-rugby-red-dark text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              Join Our Team
            </Button>
          </Link>
          <Link href="#fixtures">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-rugby-black px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
            >
              View Fixtures
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;