"use client"
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  age: number;
  height: string;
  weight: string;
  avatar: string;
  stats: {
    matches: number;
    tries: number;
    points: number;
  };
}

const players: Player[] = [
  {
    id: 1,
    name: "James Mitchell",
    position: "Captain / Fly-half",
    number: 10,
    age: 28,
    height: "6'1\"",
    weight: "185 lbs",
    avatar: "https://i.pravatar.cc/150?img=1",
    stats: { matches: 45, tries: 23, points: 156 }
  },
  {
    id: 2,
    name: "Marcus Thompson",
    position: "Prop",
    number: 1,
    age: 26,
    height: "6'3\"",
    weight: "220 lbs",
    avatar: "https://i.pravatar.cc/150?img=2",
    stats: { matches: 38, tries: 8, points: 40 }
  },
  {
    id: 3,
    name: "David Wilson",
    position: "Lock",
    number: 4,
    age: 24,
    height: "6'5\"",
    weight: "210 lbs",
    avatar: "https://i.pravatar.cc/150?img=3",
    stats: { matches: 32, tries: 12, points: 60 }
  },
  {
    id: 4,
    name: "Ryan O'Connor",
    position: "Scrum-half",
    number: 9,
    age: 25,
    height: "5'9\"",
    weight: "165 lbs",
    avatar: "https://i.pravatar.cc/150?img=4",
    stats: { matches: 41, tries: 18, points: 90 }
  },
  {
    id: 5,
    name: "Alex Rodriguez",
    position: "Wing",
    number: 11,
    age: 23,
    height: "5'11\"",
    weight: "175 lbs",
    avatar: "https://i.pravatar.cc/150?img=5",
    stats: { matches: 29, tries: 25, points: 125 }
  },
  {
    id: 6,
    name: "Tom Harrison",
    position: "Fullback",
    number: 15,
    age: 27,
    height: "6'0\"",
    weight: "180 lbs",
    avatar: "https://i.pravatar.cc/150?img=6",
    stats: { matches: 43, tries: 15, points: 98 }
  }
];

const SquadSection: React.FC = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading text-5xl md:text-6xl text-rugby-black mb-6">
            OUR SQUAD
          </h2>
          <p className="body-text-medium text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the warriors who wear the red and black with pride
          </p>
        </div>

        {/* Players Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {players.map((player) => (
            <Card 
              key={player.id} 
              className="bg-white border-0 shadow-lg hover-lift cursor-pointer transition-all duration-300"
              onClick={() => setSelectedPlayer(player)}
            >
              <CardContent className="p-6">
                {/* Player Header */}
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={player.avatar} alt={player.name} />
                    <AvatarFallback className="bg-rugby-red text-white">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="body-text-bold text-lg text-rugby-black">{player.name}</h3>
                      <Badge className="bg-rugby-red text-white text-sm">#{player.number}</Badge>
                    </div>
                    <p className="body-text text-gray-600">{player.position}</p>
                  </div>
                </div>

                {/* Player Stats */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="hero-text text-2xl text-rugby-red">{player.stats.matches}</div>
                    <div className="body-text text-xs text-gray-500">Matches</div>
                  </div>
                  <div className="text-center">
                    <div className="hero-text text-2xl text-rugby-red">{player.stats.tries}</div>
                    <div className="body-text text-xs text-gray-500">Tries</div>
                  </div>
                  <div className="text-center">
                    <div className="hero-text text-2xl text-rugby-red">{player.stats.points}</div>
                    <div className="body-text text-xs text-gray-500">Points</div>
                  </div>
                </div>

                {/* Physical Stats */}
                <div className="flex justify-between text-sm text-gray-600 border-t pt-4">
                  <span>Age: {player.age}</span>
                  <span>{player.height}</span>
                  <span>{player.weight}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Photo */}
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1486206137976-8a754c7b9cf1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85"
            alt="Grayscale photography of men playing rugby on muddy land - Quino Al on Unsplash"
            className="w-full h-64 md:h-96 object-cover"
            style={{ width: '100%', height: '384px' }}
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
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={selectedPlayer.avatar} alt={selectedPlayer.name} />
                    <AvatarFallback className="bg-rugby-red text-white text-xl">
                      {selectedPlayer.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="section-heading text-2xl text-rugby-black mb-1">{selectedPlayer.name}</h3>
                  <p className="body-text text-gray-600 mb-2">{selectedPlayer.position}</p>
                  <Badge className="bg-rugby-red text-white">#{selectedPlayer.number}</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="body-text-semibold text-rugby-black">Age</div>
                      <div className="body-text text-gray-600">{selectedPlayer.age}</div>
                    </div>
                    <div>
                      <div className="body-text-semibold text-rugby-black">Height</div>
                      <div className="body-text text-gray-600">{selectedPlayer.height}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
                    <div>
                      <div className="hero-text text-2xl text-rugby-red">{selectedPlayer.stats.matches}</div>
                      <div className="body-text text-sm text-gray-500">Matches</div>
                    </div>
                    <div>
                      <div className="hero-text text-2xl text-rugby-red">{selectedPlayer.stats.tries}</div>
                      <div className="body-text text-sm text-gray-500">Tries</div>
                    </div>
                    <div>
                      <div className="hero-text text-2xl text-rugby-red">{selectedPlayer.stats.points}</div>
                      <div className="body-text text-sm text-gray-500">Points</div>
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