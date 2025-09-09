import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-01-25T15:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1574602904329-56e2f95fb15e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxydWdieSUyMHBsYXllcnMlMjBhY3Rpb24lMjBzcG9ydHxlbnwwfDB8fGdyZWVufDE3NTUzNDg5NjB8MA&ixlib=rb-4.1.0&q=85')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-transparent"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-48 h-48 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Hero Content */}
      <div className="relative z-10 container-rugby text-center text-white">
        {/* Club Badge */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-32 h-32 glass-effect rounded-full mb-6 hover-glow">
            <span className="text-5xl font-bold rugby-gradient-text">RC</span>
          </div>
        </div>
        
        {/* Main Heading */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="heading-xl text-white mb-4">
            <span className="block">RC FOREST</span>
            <span className="block text-3xl md:text-5xl font-normal text-red-300 mt-2">
              Rugby Club
            </span>
          </h1>
        </div>
        
        {/* Tagline */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="body-lg text-gray-200 mb-8 max-w-3xl mx-auto">
            Where legends are forged and traditions live on. Join the forest warriors 
            and become part of our 40-year legacy of excellence, passion, and brotherhood.
          </p>
        </div>
        
        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-12 mb-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-300 mb-2">40+</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">Years of Excellence</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-300 mb-2">15</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">Championship Titles</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-300 mb-2">200+</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-red-300 mb-2">3rd</div>
            <div className="text-sm text-gray-300 uppercase tracking-wider">League Position</div>
          </div>
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <Button variant="primary" size="lg" href="#join">
            Join the Club
          </Button>
          <Button variant="ghost" size="lg" href="#fixtures">
            View Fixtures
          </Button>
        </div>
        
        {/* Next Match Countdown */}
        <div className="animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <div className="inline-block glass-effect rounded-3xl p-8 max-w-lg mx-auto hover-glow">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-200 uppercase tracking-wider">Next Match</span>
            </div>
            
            <div className="text-2xl font-bold text-white mb-2">vs. Stade Toulousain</div>
            <div className="text-sm text-gray-300 mb-6">Saturday, January 25th • 15:00 • Stade Pierre-Fabre</div>
            
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-3xl font-bold text-red-300">{timeLeft.days.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Days</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-3xl font-bold text-red-300">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Hours</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-3xl font-bold text-red-300">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Min</div>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <div className="text-3xl font-bold text-red-300">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">Sec</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-4 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};