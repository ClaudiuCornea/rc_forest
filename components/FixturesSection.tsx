"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDaysIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';

interface Match {
  id: number;
  opponent: string;
  date: string;
  time: string;
  venue: string;
  isHome: boolean;
  competition: string;
  status: 'upcoming' | 'completed';
  score?: {
    home: number;
    away: number;
  };
}

const fixtures: Match[] = [
  {
    id: 1,
    opponent: "WAER SEN MEN 1",
    date: "2025-09-14",
    time: "15:00",
    venue: "Zuiderlann 30, 8790 Waregem",
    isHome: false,
    competition: "League Championship",
    status: "upcoming"
  },
  {
    id: 2,
    opponent: "AREN SEN MEN 1",
    date: "2025-09-21",
    time: "15:00",
    venue: "Boulevard de la deuxième armée britannique, 1190 Vorst",
    isHome: true,
    competition: "League Championship",
    status: "upcoming"
  },
];

const results: Match[] = [
  {
    id: 4,
    opponent: "River Eagles",
    date: "2025-01-28",
    time: "15:00",
    venue: "Forest Ground",
    isHome: true,
    competition: "League Championship",
    status: "completed",
    score: { home: 24, away: 18 }
  },
  {
    id: 5,
    opponent: "City Sharks",
    date: "2025-01-21",
    time: "14:00",
    venue: "Sharks Arena",
    isHome: false,
    competition: "League Championship",
    status: "completed",
    score: { home: 15, away: 32 }
  },
  {
    id: 6,
    opponent: "Valley Bears",
    date: "2024-01-14",
    time: "15:30",
    venue: "Forest Ground",
    isHome: true,
    competition: "Cup Round 16",
    status: "completed",
    score: { home: 28, away: 12 }
  }
];

const FixturesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("fixtures");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTimeUntilMatch = (dateString: string, timeString: string) => {
    const matchDateTime = new Date(`${dateString}T${timeString}`);
    const now = new Date();
    const diff = matchDateTime.getTime() - now.getTime();
    
    if (diff <= 0) return "Match started";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const MatchCard: React.FC<{ match: Match }> = ({ match }) => (
    <Card className="bg-white border-0 shadow-lg hover-lift">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge 
            className={`${match.isHome ? 'bg-rugby-red' : 'bg-rugby-black'} text-white`}
          >
            {match.isHome ? 'HOME' : 'AWAY'}
          </Badge>
          <Badge variant="outline" className="border-gray-300">
            {match.competition}
          </Badge>
        </div>

        <div className="text-center mb-6">
          <h3 className="section-heading text-2xl text-rugby-black mb-2">
            RC FOREST vs {match.opponent}
          </h3>
          {match.status === 'completed' && match.score && (
            <div className="hero-text text-3xl text-rugby-red mb-2">
              {match.isHome ? match.score.home : match.score.away} - {match.isHome ? match.score.away : match.score.home}
            </div>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-gray-600">
            <CalendarDaysIcon className="w-5 h-5" />
            <span className="body-text">{formatDate(match.date)}</span>
            {match.status === 'upcoming' && (
              <Badge className="bg-green-100 text-green-800 ml-auto">
                {getTimeUntilMatch(match.date, match.time)}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <ClockIcon className="w-5 h-5" />
            <span className="body-text">{match.time}</span>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <MapPinIcon className="w-5 h-5" />
            <span className="body-text">{match.venue}</span>
          </div>
        </div>

        {match.status === 'completed' && match.score && (
          <div className="mt-4 pt-4 border-t">
            <div className="text-center">
              <Badge 
                className={`${
                  (match.isHome && match.score.home > match.score.away) || 
                  (!match.isHome && match.score.away > match.score.home)
                    ? 'bg-green-500' 
                    : 'bg-red-500'
                } text-white`}
              >
                {(match.isHome && match.score.home > match.score.away) || 
                 (!match.isHome && match.score.away > match.score.home) ? 'WIN' : 'LOSS'}
              </Badge>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading text-5xl md:text-6xl text-rugby-black mb-6">
            FIXTURES & RESULTS
          </h2>
          <p className="body-text-medium text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our journey through the season
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="fixtures" className="data-[state=active]:bg-rugby-red data-[state=active]:text-white">
              Upcoming Fixtures
            </TabsTrigger>
            <TabsTrigger value="results" className="data-[state=active]:bg-rugby-red data-[state=active]:text-white">
              Recent Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="fixtures">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fixtures.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="results">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {results.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Next Match Highlight */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-rugby-red to-rugby-red-dark text-white border-0">
            <CardHeader>
              <CardTitle className="section-heading text-3xl text-center pt-8">NEXT MATCH</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <h3 className="hero-text text-4xl mb-4">RC FOREST vs WAER SEN MEN 1</h3>
              <div className="flex justify-center items-center gap-8 mb-6">
                <div className="text-center">
                  <CalendarDaysIcon className="w-8 h-8 mx-auto mb-2" />
                  <div className="body-text-medium">Sept 14, 2025</div>
                </div>
                <div className="text-center">
                  <ClockIcon className="w-8 h-8 mx-auto mb-2" />
                  <div className="body-text-medium">3:00 PM</div>
                </div>
                <div className="text-center">
                  <MapPinIcon className="w-8 h-8 mx-auto mb-2" />
                  <div className="body-text-medium">Zuiderlann 30, 8790 Waregem</div>
                </div>
              </div>
              <Badge className="bg-white text-rugby-red text-lg px-6 py-2">
                {getTimeUntilMatch("2025-02-15", "15:00")} to kickoff
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FixturesSection;