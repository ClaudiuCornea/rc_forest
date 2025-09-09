import React, { useEffect } from 'react';
import Head from 'next/head';
import { Navbar } from '../components/rugby/Navbar';
import { Hero } from '../components/rugby/Hero';
import { MatchCenter } from '../components/rugby/MatchCenter';
import { Squad } from '../components/rugby/Squad';
import { Gallery } from '../components/rugby/Gallery';
import { JoinClub } from '../components/rugby/JoinClub';
import { Footer } from '../components/rugby/Footer';

export default function RugbyClubWebsite() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const id = target.href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = `
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
      </svg>
    `;
    scrollToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 opacity-0 pointer-events-none z-50 flex items-center justify-center';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      }
    };

    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    document.addEventListener('click', handleSmoothScroll);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      window.removeEventListener('scroll', handleScroll);
      if (document.body.contains(scrollToTopBtn)) {
        document.body.removeChild(scrollToTopBtn);
      }
    };
  }, []);

  return (
    <>
      <Head>
        <title>RC Forest Rugby Club - Excellence, Tradition, Community</title>
        <meta name="description" content="RC Forest Rugby Club - Join our legendary rugby family with over 40 years of excellence, tradition, and community spirit in Toulouse, France." />
        <meta name="keywords" content="rugby, club, toulouse, france, rc forest, sport, team, championship, rugby union" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://rcforest.fr/" />
        <meta property="og:title" content="RC Forest Rugby Club - Excellence, Tradition, Community" />
        <meta property="og:description" content="Join our legendary rugby family with over 40 years of excellence, tradition, and community spirit in Toulouse, France." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://rcforest.fr/" />
        <meta property="twitter:title" content="RC Forest Rugby Club - Excellence, Tradition, Community" />
        <meta property="twitter:description" content="Join our legendary rugby family with over 40 years of excellence, tradition, and community spirit in Toulouse, France." />
        
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <section id="home">
            <Hero />
          </section>
          
          {/* Match Center */}
          <section id="fixtures">
            <MatchCenter />
          </section>
          
          {/* Squad Showcase */}
          <section id="squad">
            <Squad />
          </section>
          
          {/* Gallery */}
          <section id="gallery">
            <Gallery />
          </section>
          
          {/* Join Club */}
          <section id="join">
            <JoinClub />
          </section>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}