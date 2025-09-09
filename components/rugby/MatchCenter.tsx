import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

export const MatchCenter: React.FC = () => {
  const leagueStandings = [
    { position: 1, team: 'Toulouse', points: 52, isUs: false },
    { position: 2, team: 'La Rochelle', points: 48, isUs: false },
    { position: 3, team: 'RC Forest', points: 45, isUs: true },
    { position: 4, team: 'Bordeaux', points: 42, isUs: false },
    { position: 5, team: 'Clermont', points: 38, isUs: false }
  ];

  const recentResults = [
    {
      date: 'January 18, 2025',
      homeTeam: 'RC Forest',
      awayTeam: 'Montpellier',
      homeScore: 24,
      awayScore: 18,
      result: 'victory'
    },
    {
      date: 'January 11, 2025',
      homeTeam: 'Racing 92',
      awayTeam: 'RC Forest',
      homeScore: 15,
      awayScore: 22,
      result: 'victory'
    },
    {
      date: 'January 4, 2025',
      homeTeam: 'RC Forest',
      awayTeam: 'Toulon',
      homeScore: 19,
      awayScore: 21,
      result: 'defeat'
    }
  ];

  return (
    <section id="fixtures" className="section-rugby bg-gradient-to-br from-gray-50 to-white">
      <div className="container-rugby">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-gray-900">Match Center</h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest fixtures, results, and league standings
          </p>
        </div>
        
        {/* Match Center Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          
          {/* Next Fixture */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                  </svg>
                  <h3 className="heading-sm">Next Fixture</h3>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 mb-6">
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-4 uppercase tracking-wider">Championship Final</div>
                    
                    <div className="flex items-center justify-center gap-12 mb-6">
                      {/* Home Team */}
                      <div className="text-center">
                        <div className="w-20 h-20 rugby-gradient rounded-full flex items-center justify-center mb-3 mx-auto hover-glow">
                          <span className="text-white font-bold text-2xl">RC</span>
                        </div>
                        <div className="font-bold text-lg">RC Forest</div>
                        <div className="text-sm text-gray-600">Home</div>
                      </div>
                      
                      {/* VS */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-400 mb-2">VS</div>
                        <div className="text-sm text-gray-600">Saturday</div>
                        <div className="font-bold">Jan 25, 15:00</div>
                      </div>
                      
                      {/* Away Team */}
                      <div className="text-center">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-3 mx-auto">
                          <span className="text-white font-bold text-2xl">ST</span>
                        </div>
                        <div className="font-bold text-lg">Stade Toulousain</div>
                        <div className="text-sm text-gray-600">Away</div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-4">Stade Pierre-Fabre, Castres</div>
                      <Button variant="primary" size="sm">
                        Get Tickets
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Match Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Competition:</span>
                    <span className="font-medium">Top 14 Championship</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Referee:</span>
                    <span className="font-medium">Jerome Garces</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weather:</span>
                    <span className="font-medium">15°C, Partly Cloudy</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attendance:</span>
                    <span className="font-medium">12,000 / 12,500</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* League Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                <h3 className="heading-sm">League Standing</h3>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {leagueStandings.map((team) => (
                  <div
                    key={team.position}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      team.isUs
                        ? 'bg-red-50 border-l-4 border-red-500 hover-lift'
                        : 'bg-gray-50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-bold text-lg ${team.isUs ? 'text-red-600' : 'text-gray-600'}`}>
                        {team.position}
                      </span>
                      <span className="font-medium">{team.team}</span>
                    </div>
                    <span className="font-bold">{team.points} pts</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="outline" size="sm">
                  View Full Table →
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Results */}
        <div>
          <h3 className="heading-sm mb-8 text-center text-gray-900">Recent Results</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recentResults.map((match, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="text-sm text-gray-600 mb-4">{match.date}</div>
                  
                  <div className="flex items-center justify-center gap-6 mb-4">
                    <div className="text-right">
                      <div className="font-bold text-lg">{match.homeTeam}</div>
                      <div className={`text-3xl font-bold ${
                        match.result === 'victory' && match.homeTeam === 'RC Forest' 
                          ? 'text-red-600' 
                          : match.result === 'defeat' && match.homeTeam === 'RC Forest'
                          ? 'text-gray-600'
                          : 'text-gray-600'
                      }`}>
                        {match.homeScore}
                      </div>
                    </div>
                    
                    <div className="text-gray-400 text-xl">-</div>
                    
                    <div className="text-left">
                      <div className="font-bold text-lg">{match.awayTeam}</div>
                      <div className={`text-3xl font-bold ${
                        match.result === 'victory' && match.awayTeam === 'RC Forest' 
                          ? 'text-red-600' 
                          : match.result === 'defeat' && match.awayTeam === 'RC Forest'
                          ? 'text-gray-600'
                          : 'text-gray-600'
                      }`}>
                        {match.awayScore}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`text-sm font-medium ${
                    match.result === 'victory' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {match.result === 'victory' ? 'Victory' : 'Defeat'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};