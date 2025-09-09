"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDaysIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  featured: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "RC Forest Secures Victory Against River Eagles",
    excerpt: "In a thrilling match that went into overtime, RC Forest demonstrated exceptional teamwork and determination to secure a 24-18 victory against the River Eagles.",
    date: "2024-01-29",
    category: "Match Report",
    image: "https://images.unsplash.com/photo-1574602904316-f84f62477265?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85",
    featured: true
  },
  {
    id: 2,
    title: "New Training Facility Opens at Forest Ground",
    excerpt: "RC Forest unveils state-of-the-art training facilities designed to enhance player development and team performance.",
    date: "2024-01-25",
    category: "Club News",
    image: "https://images.unsplash.com/photo-1594038478460-b0c958354871?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxydWdieSUyMGZpZWxkJTIwc3RhZGl1bSUyMGdyYXNzJTIwc3BvcnR8ZW58MHwwfHxncmVlbnwxNzU1MzU2NjAyfDA&ixlib=rb-4.1.0&q=85",
    featured: false
  },
  {
    id: 3,
    title: "Youth Academy Welcomes New Recruits",
    excerpt: "Twenty talented young players join RC Forest's youth academy program, marking the largest intake in the club's history.",
    date: "2024-01-22",
    category: "Youth Development",
    image: "https://images.unsplash.com/photo-1486206137976-8a754c7b9cf1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85",
    featured: false
  },
  {
    id: 4,
    title: "Captain James Mitchell Extends Contract",
    excerpt: "Team captain and fly-half James Mitchell commits to RC Forest for another three years, bringing stability to the squad.",
    date: "2024-01-18",
    category: "Player News",
    image: "https://images.unsplash.com/photo-1652107948839-38313b628dae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85",
    featured: false
  }
];

const NewsSection: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Match Report':
        return 'bg-rugby-red text-white';
      case 'Club News':
        return 'bg-rugby-black text-white';
      case 'Youth Development':
        return 'bg-green-500 text-white';
      case 'Player News':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading text-5xl md:text-6xl text-rugby-black mb-6">
            LATEST NEWS
          </h2>
          <p className="body-text-medium text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest from RC Forest
          </p>
        </div>

        {/* Featured News */}
        {featuredNews && (
          <Card className="bg-white border-0 shadow-xl mb-16 overflow-hidden hover-lift">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredNews.image}
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                  style={{ width: '100%', height: '100%' }}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-rugby-red text-white">FEATURED</Badge>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <Badge className={getCategoryColor(featuredNews.category)}>
                    {featuredNews.category}
                  </Badge>
                </div>
                <h3 className="section-heading text-3xl text-rugby-black mb-4">
                  {featuredNews.title}
                </h3>
                <p className="body-text text-gray-600 mb-6 text-lg leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CalendarDaysIcon className="w-5 h-5" />
                    <span className="body-text">{formatDate(featuredNews.date)}</span>
                  </div>
                  <Button className="bg-rugby-red hover:bg-rugby-red-dark text-white">
                    Read More
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Regular News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularNews.map((item) => (
            <Card key={item.id} className="bg-white border-0 shadow-lg hover-lift overflow-hidden">
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ width: '100%', height: '192px' }}
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(item.category)}>
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="body-text-bold text-xl text-rugby-black mb-3 line-clamp-2">
                  {item.title}
                </h3>
                <p className="body-text text-gray-600 mb-4 line-clamp-3">
                  {item.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <CalendarDaysIcon className="w-4 h-4" />
                    <span className="body-text text-sm">{formatDate(item.date)}</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-rugby-red text-rugby-red hover:bg-rugby-red hover:text-white">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-gradient-to-r from-rugby-black to-rugby-black-light text-white border-0">
          <CardContent className="p-8 text-center">
            <h3 className="section-heading text-3xl mb-4">Stay in the Loop</h3>
            <p className="body-text-medium text-lg mb-6 opacity-90">
              Subscribe to our newsletter for the latest news, match updates, and exclusive content
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-rugby-black body-text"
              />
              <Button className="bg-rugby-red hover:bg-rugby-red-dark text-white px-8">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default NewsSection;