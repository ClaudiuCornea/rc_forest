import React, { useState } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  TrophyIcon, 
  LifebuoyIcon, 
  FlagIcon, 
  SparklesIcon,
  CalendarDaysIcon,
  ClockIcon,
  MapPinIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

// Types
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

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  size: 'small' | 'medium' | 'large';
}

// Data
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
  }
];

const fixtures: Match[] = [
  {
    id: 1,
    opponent: "Thunder Hawks",
    date: "2024-02-15",
    time: "15:00",
    venue: "Forest Ground",
    isHome: true,
    competition: "League Championship",
    status: "upcoming"
  },
  {
    id: 2,
    opponent: "Thunder Hawks",
    date: "2024-02-15",
    time: "15:00",
    venue: "Forest Ground",
    isHome: true,
    competition: "League Championship",
    status: "upcoming"
  },
];

const results: Match[] = [
  {
    id: 4,
    opponent: "River Eagles",
    date: "2024-01-28",
    time: "15:00",
    venue: "Forest Ground",
    isHome: true,
    competition: "League Championship",
    status: "completed",
    score: { home: 24, away: 18 }
  }
];

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1574602904316-f84f62477265?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85",
    alt: "Rugby team dancing in the field - Stefan Lehner on Unsplash",
    category: "Team Celebration",
    title: "Victory Dance",
    size: "large"
  }
];

const RCForestHomePage: React.FC = () => {
  // State
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [activeTab, setActiveTab] = useState("fixtures");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  // Helper functions
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Team Celebration':
        return 'bg-rugby-red text-white';
      case 'Team Photo':
        return 'bg-rugby-black text-white';
      case 'Match Action':
        return 'bg-green-500 text-white';
      case 'Stadium':
        return 'bg-blue-500 text-white';
      case 'Training':
        return 'bg-purple-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  const filteredImages = filter === 'All' ? galleryImages : galleryImages.filter(img => img.category === filter);

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
    <>
      <Head>
        <title>RC Forest Rugby Club - Concentration • Intensity • Unity</title>
        <meta name="description" content="RC Forest Rugby Club - Founded in 1998, building champions both on and off the field. Join our family and experience the power of rugby." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1574602904316-f84f62477265?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85"
              alt="Rugby team dancing in the field - Stefan Lehner on Unsplash"
              className="w-full h-full object-cover"
              style={{ width: '100%', height: '100%' }}
            />
            <div className="absolute inset-0 gradient-red-black opacity-80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
            {/* Logo/Icon */}
            <div className="mb-8 flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 border border-white/30">
                <LifebuoyIcon className="w-16 h-16 text-white" />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="hero-text text-6xl md:text-8xl lg:text-9xl text-white mb-6 text-shadow-strong">
              RC FOREST
            </h1>
            
            {/* Subtitle */}
            <p className="section-heading text-2xl md:text-3xl lg:text-4xl text-white/90 mb-4 text-shadow-strong">
              RUGBY CLUB
            </p>
            
            {/* Tagline */}
            <p className="body-text-medium text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Concentration • Intensity • Unity
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-rugby-red hover:bg-rugby-red-dark text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover-lift"
              >
                Join Our Team
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-rugby-black px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                View Fixtures
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="hero-text text-3xl md:text-4xl text-white mb-2">25+</div>
                <div className="body-text text-white/70">Years</div>
              </div>
              <div className="text-center">
                <div className="hero-text text-3xl md:text-4xl text-white mb-2">150+</div>
                <div className="body-text text-white/70">Players</div>
              </div>
              <div className="text-center">
                <div className="hero-text text-3xl md:text-4xl text-white mb-2">12</div>
                <div className="body-text text-white/70">Trophies</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </section>

        {/* About Section */}
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
                    What started as a small group of rugby enthusiasts has grown into one of the region's 
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
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1652107948839-38313b628dae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85"
                    alt="A group of men in sports uniforms - Andrea Qoqonga on Unsplash"
                    className="w-full h-96 object-cover hover-lift"
                    style={{ width: '100%', height: '384px' }}
                  />
                </div>
                {/* Floating Stats Card */}
                <Card className="absolute -bottom-8 -left-8 bg-white shadow-xl border-0">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="hero-text text-4xl text-rugby-red mb-2">25+</div>
                      <div className="body-text-medium text-gray-600">Years of Excellence</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Achievement Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-rugby-red text-white border-0 hover-lift">
                <CardContent className="p-8 text-center">
                  <TrophyIcon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="section-heading text-2xl mb-2">12 Championships</h3>
                  <p className="body-text opacity-90">Regional and national titles won</p>
                </CardContent>
              </Card>
              
              <Card className="bg-rugby-black text-white border-0 hover-lift">
                <CardContent className="p-8 text-center">
                  <FlagIcon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="section-heading text-2xl mb-2">150+ Players</h3>
                  <p className="body-text opacity-90">Active members across all teams</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-rugby-red to-rugby-red-dark text-white border-0 hover-lift">
                <CardContent className="p-8 text-center">
                  <SparklesIcon className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="section-heading text-2xl mb-2">Community Impact</h3>
                  <p className="body-text opacity-90">Inspiring the next generation</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Squad Section */}
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

            {/* Player Detail Modal */}
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

        {/* Fixtures Section */}
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
                  <CardTitle className="section-heading text-3xl text-center">NEXT MATCH</CardTitle>
                </CardHeader>
                <CardContent className="text-center pb-8">
                  <h3 className="hero-text text-4xl mb-4">RC FOREST vs THUNDER HAWKS</h3>
                  <div className="flex justify-center items-center gap-8 mb-6">
                    <div className="text-center">
                      <CalendarDaysIcon className="w-8 h-8 mx-auto mb-2" />
                      <div className="body-text-medium">Feb 15, 2024</div>
                    </div>
                    <div className="text-center">
                      <ClockIcon className="w-8 h-8 mx-auto mb-2" />
                      <div className="body-text-medium">3:00 PM</div>
                    </div>
                    <div className="text-center">
                      <MapPinIcon className="w-8 h-8 mx-auto mb-2" />
                      <div className="body-text-medium">Forest Ground</div>
                    </div>
                  </div>
                  <Badge className="bg-white text-rugby-red text-lg px-6 py-2">
                    {getTimeUntilMatch("2024-02-15", "15:00")} to kickoff
                  </Badge>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="section-heading text-5xl md:text-6xl text-rugby-black mb-6">
                GALLERY
              </h2>
              <p className="body-text-medium text-xl text-gray-600 max-w-3xl mx-auto">
                Capturing the moments that define our journey
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-lg body-text-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-rugby-red text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredImages.map((image) => (
                <Card 
                  key={image.id}
                  className="break-inside-avoid bg-white border-0 shadow-lg hover-lift cursor-pointer overflow-hidden"
                  onClick={() => setSelectedImage(image)}
                >
                  <div className="relative">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full object-cover"
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className={`${getCategoryColor(image.category)} mb-2`}>
                          {image.category}
                        </Badge>
                        <h3 className="body-text-bold text-white text-lg">{image.title}</h3>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
              <div 
                className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
                onClick={() => setSelectedImage(null)}
              >
                <div className="relative max-w-4xl max-h-full">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                  >
                    <XMarkIcon className="w-8 h-8" />
                  </button>
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onClick={(e) => e.stopPropagation()}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <Badge className={`${getCategoryColor(selectedImage.category)} mb-2`}>
                      {selectedImage.category}
                    </Badge>
                    <h3 className="body-text-bold text-white text-xl">{selectedImage.title}</h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="section-heading text-5xl md:text-6xl text-rugby-black mb-6">
                GET IN TOUCH
              </h2>
              <p className="body-text-medium text-xl text-gray-600 max-w-3xl mx-auto">
                Ready to join the RC Forest family? Contact us today
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h3 className="section-heading text-3xl text-rugby-black mb-8">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-rugby-red/10 p-3 rounded-lg">
                        <MapPinIcon className="w-6 h-6 text-rugby-red" />
                      </div>
                      <div>
                        <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Address</h4>
                        <p className="body-text text-gray-600">
                          Rugby Club de Forest - Rugby Club Vorst<br />
                          Bd de la Deuxième Armée Britannique 580<br />
                          1190 Forest, Belgium
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-rugby-red/10 p-3 rounded-lg">
                        <PhoneIcon className="w-6 h-6 text-rugby-red" />
                      </div>
                      <div>
                        <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Phone</h4>
                        <p className="body-text text-gray-600">
                          Main: (555) 123-4567<br />
                          Training: (555) 123-4568
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-rugby-red/10 p-3 rounded-lg">
                        <EnvelopeIcon className="w-6 h-6 text-rugby-red" />
                      </div>
                      <div>
                        <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Email</h4>
                        <p className="body-text text-gray-600">
                          info@rugbyforest.be
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-rugby-red/10 p-3 rounded-lg">
                        <ClockIcon className="w-6 h-6 text-rugby-red" />
                      </div>
                      <div>
                        <h4 className="body-text-semibold text-lg text-rugby-black mb-1">Training Hours</h4>
                        <p className="body-text text-gray-600">
                          Wednesday & Friday: 20:00 - 22:00<br />
                          Sunday: Match Days (varies)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-rugby-red text-white border-0 hover-lift cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <UserIcon className="w-8 h-8 mx-auto mb-3" />
                      <h4 className="body-text-semibold text-lg mb-2">Join as Player</h4>
                      <p className="body-text text-sm opacity-90">Ready to play?</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-rugby-black text-white border-0 hover-lift cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <UsersIcon className="w-8 h-8 mx-auto mb-3" />
                      <h4 className="body-text-semibold text-lg mb-2">Become Supporter</h4>
                      <p className="body-text text-sm opacity-90">Support the team</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.563843836012!2d4.3101811!3d50.8021912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3c5ac5246033b%3A0x514040993b3a0e9c!2sRugby%20Club%20de%20Forest%20-%20Rugby%20Club%20Vorst!5e0!3m2!1sfr!2sbe!4v1757441430099!5m2!1sfr!2sbe" 
                    width="100%" 
                    height="300" 
                    allowFullScreen={true}
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="border-0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
    );
  };
