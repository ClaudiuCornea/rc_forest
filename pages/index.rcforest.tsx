import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SquadSection from '../components/SquadSection';
import FixturesSection from '../components/FixturesSection';
import NewsSection from '../components/NewsSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const RCForestHomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>RC Forest Rugby Club - Concentration • Intensity • Unity</title>
        <meta name="description" content="RC Forest Rugby Club - Founded in 1998, building champions both on and off the field. Join our family and experience the power of rugby." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <SquadSection />
        <FixturesSection />
        <NewsSection />
        <GallerySection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default RCForestHomePage;