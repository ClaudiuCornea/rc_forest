"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrophyIcon, FlagIcon, SparklesIcon } from '@heroicons/react/24/outline';
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
          <p className="body-text-medium text-xl text-gray-600 max-w-3xl mx-auto">
            Founded in 1998, RC Forest has been a cornerstone of rugby excellence, 
            building champions both on and off the field.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <h3 className="section-heading text-3xl text-rugby-red mb-4">Our Story</h3>
              <p className="body-text text-gray-700 mb-6">
                What started as a small group of rugby enthusiasts has grown into one of the regions 
                most respected clubs. Our commitment to excellence, sportsmanship, and community has 
                shaped generations of players.
              </p>
              <p className="body-text text-gray-700">
                Today, RC Forest stands as a testament to the power of teamwork, dedication, and the 
                unbreakable bonds forged through the beautiful game of rugby.
              </p>
            </div>

            <div>
              <h3 className="section-heading text-3xl text-rugby-red mb-4">Our Values</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="bg-rugby-red/10 p-2 rounded-lg">
                    <TrophyIcon className="w-6 h-6 text-rugby-red" />
                  </div>
                  <div>
                    <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Excellence</h4>
                    <p className="body-text text-gray-600">Striving for the highest standards in everything we do</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-rugby-red/10 p-2 rounded-lg">
                    <FlagIcon className="w-6 h-6 text-rugby-red" />
                  </div>
                  <div>
                    <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Unity</h4>
                    <p className="body-text text-gray-600">Building lasting friendships and team spirit</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-rugby-red/10 p-2 rounded-lg">
                    <SparklesIcon className="w-6 h-6 text-rugby-red" />
                  </div>
                  <div>
                    <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Integrity</h4>
                    <p className="body-text text-gray-600">Playing with honor and respect for all</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1652107948839-38313b628dae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85"
                alt="A group of men in sports uniforms - Andrea Qoqonga on Unsplash"
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