"use client"
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';

interface Player {
  name: string;
  position: string;
  number: number;
  age: number;
  height: string;
  weight: string;
  avatar: string;
}

const players: Player[] = [
  {
    name: "Dahdouh Karim",
    position: "Prop",
    number: 1,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Karim.png"
  },
  {
    name: "Inal Oghuzhan",
    position: "Hooker",
    number: 2,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Oguz.png"
  },
  {
    name: "Renaers Dylan",
    position: "Prop",
    number: 3,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Vik.png"
  },
  {
    name: "Cornea Claudiu",
    position: "Lock",
    number: 4,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Claudiu.png"
  },
  {
    name: "Hoffman Warren",
    position: "Lock",
    number: 5,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Warren.png"
  },
  {
    name: "Leleux Nicolas",
    position: "Captain - Flanker",
    number: 6,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Nico.png"
  },
  {
    name: "Cajal Alejandro",
    position: "Flanker",
    number: 7,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Cajal.png"
  },
  {
    name: "Trouman Lionel",
    position: "Number 8",
    number: 8,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Lionel.png"
  },
  {
    name: "Peeters Antoine",
    position: "Scrum-half",
    number: 9,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Peeters.png"
  },
  {
    name: "Ruymbeke Eliot",
    position: "Fly-half",
    number: 10,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Eliot.png"
  },
  {
    name: "V. Anton",
    position: "Left Wing",
    number: 11,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Anton.png"
  },
  {
    name: "Barboza Ethan",
    position: "Inside Center",
    number: 12,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Ethan.png"
  },
  {
    name: "Etn Florian",
    position: "Outside Center",
    number: 13,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Flo.png"
  },
  {
    name: "Chamorro Ivan",
    position: "Right Wing",
    number: 14,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Ivan.png"
  },
  {
    name: "Tabirta Stefan",
    position: "Fullback",
    number: 15,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Stephan.png"
  },
  {
    name: "Kosk Adrian",
    position: "",
    number: 16,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Adrian.png"
  },
  {
    name: "Bertinchamps Christophe",
    position: "",
    number: 17,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Jason.png"
  },
  {
    name: "N. Antonio",
    position: "",
    number: 18,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Antonio.png"
  },
  {
    name: "T. Alexandre",
    position: "",
    number: 19,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Alex.png"
  },
  {
    name: "Chkhikvadze Vano",
    position: "",
    number: 20,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Vano.png"
  },
  {
    name: "Martinez Alex",
    position: "",
    number: 21,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Alex Marty.png"
  },
  {
    name: "Gloaguen Swen",
    position: "",
    number: 22,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Zwen.png"
  },
  {
    name: "Mehdi “Baba” Ba",
    position: "Coach",
    number: 0,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Baba.png"
  },
  {
    name: "Patrick",
    position: "Coach",
    number: 0,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Patrick.png"
  },
  {
    name: "Psaroudakis Stelios",
    position: "Coach",
    number: 0,
    age: 18,
    height: "1.75",
    weight: "75 kg",
    avatar: "./Stelios.png"
  },
];

const SquadSection: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading text-5xl md:text-6xl text-rugby-black mb-6">
            OUR TEAM
          </h2>
          <p className="body-text-medium text-xl text-gray-600 max-w-5xl mx-auto">
            On the field, our players are not just a team: they are true warriors, ready to give their all to defend our colors.
            Each brings their strength, energy, and passion, and together we form a united and determined bloc.
            Whether during a match or a rainy training session, our players embody the spirit of solidarity,
            courage, and determination that makes the Rugby Club de Forest/Vorst so proud.
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {players.map((player, index) => (
            <Card 
              key={index} 
              className="bg-white border-0 shadow-lg hover-lift cursor-pointer transition-all duration-300"
              onClick={() => setSelectedPlayer(player)}
            >
              <CardContent className="p-6">
                {/* Player Header */}
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={player.avatar} alt={player.name} />
                    <AvatarFallback className="bg-rugby-red text-white">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="body-text-bold text-lg text-rugby-black">{player.name}</h3>
                      {Boolean(player.number) && <Badge className="bg-rugby-red text-white text-sm">#{player.number}</Badge>}
                    </div>
                    <p className="body-text text-gray-600">{player.position}</p>
                  </div>
                </div>

                {/* Player Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="hero-text text-2xl text-rugby-red">{player.age}</div>
                    <div className="body-text text-xs text-gray-500">Age</div>
                  </div>
                  <div className="text-center">
                    <div className="hero-text text-2xl text-rugby-red">{player.height}</div>
                    <div className="body-text text-xs text-gray-500">Height</div>
                  </div>
                  <div className="text-center">
                    <div className="hero-text text-2xl text-rugby-red">{player.weight}</div>
                    <div className="body-text text-xs text-gray-500">Weight</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Photo */}
        <div className="relative rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486206137976-8a754c7b9cf1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85"
            alt="Grayscale photography of men playing rugby on muddy land - Quino Al on Unsplash"
            width={1920}
            height={384}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rugby-black/80 to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-white">
            <h3 className="section-heading text-3xl mb-2">TEAM SPIRIT</h3>
            <p className="body-text-medium text-lg opacity-90">United we stand, divided we fall</p>
          </div>
        </div>

        {/* Player Detail Modal Placeholder */}
        {selectedPlayer && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPlayer(null)}
          >
            <Card className="bg-white max-w-md w-full" onClick={(e) => e.stopPropagation()}>
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <Avatar className="w-56 h-56 mx-auto mb-4">
                    <AvatarImage src={selectedPlayer.avatar} alt={selectedPlayer.name} />
                    <AvatarFallback className="bg-rugby-red text-white text-xl">
                      {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="section-heading text-2xl text-rugby-black mb-1">{selectedPlayer.name}</h3>
                  <p className="body-text text-gray-600 mb-2">{selectedPlayer.position}</p>
                  {Boolean(selectedPlayer.number) && <Badge className="bg-rugby-red text-white">#{selectedPlayer.number}</Badge>}
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="body-text-semibold text-rugby-black">Age</div>
                      <div className="body-text text-gray-600">{selectedPlayer.age}</div>
                    </div>
                    <div>
                      <div className="body-text-semibold text-rugby-black">Height</div>
                      <div className="body-text text-gray-600">{selectedPlayer.height}</div>
                    </div>
                    <div>
                      <div className="body-text-semibold text-rugby-black">Weight</div>
                      <div className="body-text text-gray-600">{selectedPlayer.weight}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
};

export default SquadSection;