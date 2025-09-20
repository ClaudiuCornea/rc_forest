import React from 'react';
import Head from 'next/head';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SquadSection from '../components/SquadSection';
import FixturesSection from '../components/FixturesSection';
import GallerySection from '../components/GallerySection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const RCForestHomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>RC Forest Rugby Club - Concentration • Intensity • Unity</title>
        <meta name="description" content="Founded in 1998, the Rugby Club de Forest/Vorst is much more than a rugby club: it is a true family where the passion for the oval ball is passed down from generation to generation." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <SquadSection />
        <FixturesSection />
        <GallerySection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default RCForestHomePage;