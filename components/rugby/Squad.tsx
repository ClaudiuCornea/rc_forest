import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  age: number;
  caps: number;
  height: string;
  weight: string;
  category: 'forwards' | 'backs' | 'halfbacks';
  isCaptain?: boolean;
}

export const Squad: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const players: Player[] = [
    {
      id: 1,
      name: 'Antoine Dupont',
      position: 'Number 8',
      number: 8,
      age: 28,
      caps: 156,
      height: '1.85m',
      weight: '85kg',
      category: 'forwards',
      isCaptain: true
    },
    {
      id: 2,
      name: 'Thomas Ramos',
      position: 'Fullback',
      number: 15,
      age: 26,
      caps: 89,
      height: '1.78m',
      weight: '78kg',
      category: 'backs'
    },
    {
      id: 3,
      name: 'Baptiste Serin',
      position: 'Scrum-half',
      number: 9,
      age: 29,
      caps: 134,
      height: '1.75m',
      weight: '75kg',
      category: 'halfbacks'
    },
    {
      id: 4,
      name: 'Julien Marchand',
      position: 'Hooker',
      number: 2,
      age: 31,
      caps: 178,
      height: '1.82m',
      weight: '95kg',
      category: 'forwards'
    },
    {
      id: 5,
      name: 'Damian Penaud',
      position: 'Wing',
      number: 11,
      age: 27,
      caps: 98,
      height: '1.88m',
      weight: '82kg',
      category: 'backs'
    },
    {
      id: 6,
      name: 'Cameron Woki',
      position: 'Lock',
      number: 4,
      age: 25,
      caps: 67,
      height: '1.98m',
      weight: '105kg',
      category: 'forwards'
    },
    {
      id: 7,
      name: 'Gael Fickou',
      position: 'Center',
      number: 12,
      age: 30,
      caps: 145,
      height: '1.80m',
      weight: '85kg',
      category: 'backs'
    },
    {
      id: 8,
      name: 'Romain Ntamack',
      position: 'Fly-half',
      number: 10,
      age: 25,
      caps: 76,
      height: '1.85m',
      weight: '82kg',
      category: 'halfbacks'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Players' },
    { id: 'forwards', label: 'Forwards' },
    { id: 'backs', label: 'Backs' },
    { id: 'halfbacks', label: 'Half-backs' }
  ];

  const filteredPlayers = activeFilter === 'all' 
    ? players 
    : players.filter(player => player.category === activeFilter);

  return (
    <section id="squad" className="section-rugby rugby-gradient">
      <div className="container-rugby">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg text-white mb-4">Our Squad</h2>
          <p className="body-lg text-green-100 max-w-2xl mx-auto">
            Meet the warriors who represent RC Forest on the field with pride, determination, and unwavering spirit
          </p>
        </div>
        
        {/* Position Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-white text-green-700 shadow-lg'
                  : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Squad Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredPlayers.map((player, index) => (
            <Card 
              key={player.id} 
              className="bg-white/10 glass-effect text-white hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={`https://i.pravatar.cc/300?img=${player.id}`} 
                  alt={`${player.name} avatar`}
                  className="w-full h-56 object-cover rounded-t-lg"
                  style={{ width: '100%', height: '224px' }}
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{player.number}
                </div>
                {player.isCaptain && (
                  <div className="absolute top-4 left-4 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    Captain
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">{player.name}</h3>
                <p className="text-green-200 text-sm mb-4">{player.position}</p>
                
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Age:</span>
                    <span className="text-white font-medium">{player.age}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Caps:</span>
                    <span className="text-white font-medium">{player.caps}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Height:</span>
                    <span className="text-white font-medium">{player.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Weight:</span>
                    <span className="text-white font-medium">{player.weight}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View Full Squad Button */}
        <div className="text-center">
          <Button variant="ghost" size="lg">
            View Full Squad
          </Button>
        </div>
      </div>
    </section>
  );
};