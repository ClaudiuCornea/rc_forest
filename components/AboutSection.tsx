"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrophyIcon, FlagIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import Image from 'next/image';

const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading text-5xl md:text-6xl text-rugby-black mb-6">
            ABOUT RC FOREST
          </h2>
          <p className="body-text-medium text-xl text-gray-600 max-w-5xl mx-auto">
            Founded in 1998, the Rugby Club de Forest/Vorst is much more than a rugby club:<br />
            it is a true family where the passion for the oval ball is passed down from generation to generation.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h3 className="section-heading text-3xl text-rugby-red mb-4">Our Story</h3>
              {/* <p className="body-text text-gray-700 mb-6">
              </p> */}
              <p className="body-text text-gray-700">
                For over 25 years, we have shared moments of joy, numerous challenges, and obstacles that have strengthened
                and united us. Whether you are a beginner or an experienced player,
                every member finds their place here and helps write the unique story of our club,
                built on learning, determination, and solidarity.
              </p>
            </div>

            <div>
              <h3 className="section-heading text-3xl text-rugby-red mb-4">Our Values</h3>
              <p className="body-text text-gray-700 my-6">
                At Rugby Club de Forest/Vorst, we believe rugby is a school of life.
                Our core values guide everything we do:
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-rugby-red/10 p-2 rounded-lg">
                    <TrophyIcon className="w-6 h-6 text-rugby-red" />
                  </div>
                  <div>
                    <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Excellence</h4>
                    <p className="body-text text-gray-600">Giving your best, both on and off the field</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-rugby-red/10 p-2 rounded-lg">
                    <FlagIcon className="w-6 h-6 text-rugby-red" />
                  </div>
                  <div>
                    <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Unity</h4>
                    <p className="body-text text-gray-600">Everyone is part of the family, and together we are stronger</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-rugby-red/10 p-2 rounded-lg">
                    <SparklesIcon className="w-6 h-6 text-rugby-red" />
                  </div>
                  <div>
                    <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Integrity</h4>
                    <p className="body-text text-gray-600">Respecting the rules, teammates, and opponents to build an honest and fair club</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-rugby-red/10 p-2 rounded-lg">
                    <UserGroupIcon className="w-6 h-6 text-rugby-red" />
                  </div>
                  <div>
                    <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Resilience</h4>
                    <p className="body-text text-gray-600">Facing challenges, learning from difficulties, and moving forward stronger together</p>
                  </div>
                </div>
              </div>
              <p className="body-text text-gray-700 my-6">
                These values are more than words: they are lived every day in our training, matches,
                and during the “third half,” around a good drink.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
              <Image
                src="/togheter.jpg"
                alt="A group of men in sports uniforms"
                width={800}
                height={384}
                className="w-full h-96 object-cover hover-lift"
              />
            {/* Floating Stats Card */}
            <Card className="absolute -bottom-8 -left-8 bg-white shadow-xl border-0">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="hero-text text-4xl text-rugby-red mb-2">10+</div>
                  <div className="body-text-medium text-gray-600">Years of Excellence</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;