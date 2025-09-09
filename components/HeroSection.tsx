"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrophyIcon, LifebuoyIcon } from '@heroicons/react/24/outline';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1574602904316-f84f62477265?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85"
          alt="Rugby team dancing in the field - Stefan Lehner on Unsplash"
          className="w-full h-full object-cover"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 gradient-red-black opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        {/* Logo/Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 border border-white/30">
            <LifebuoyIcon className="w-16 h-16 text-white" />
          </div>
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
          <Button 
            size="lg" 
            className="bg-rugby-red hover:bg-rugby-red-dark text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover-lift"
          >
            Join Our Team
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-rugby-black px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
          >
            View Fixtures
          </Button>
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