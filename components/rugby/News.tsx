import React from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  featured?: boolean;
}

export const News: React.FC = () => {
  const articles: NewsArticle[] = [
    {
      id: 1,
      title: 'Historic Victory Against Montpellier Secures Playoff Position',
      excerpt: 'RC Forest delivered a masterclass performance against Montpellier, securing a crucial 24-18 victory that puts us in prime position for the playoffs. Captain Antoine Dupont led from the front with two tries and exceptional leadership throughout the match.',
      date: 'January 20, 2025',
      author: 'Coach Martin',
      category: 'Match Report',
      image: 'https://images.unsplash.com/photo-1574602904316-f84f62477265?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3Rvcnl8ZW58MHwwfHx8MTc1NTM0ODA3OXww&ixlib=rb-4.1.0&q=85',
      featured: true
    },
    {
      id: 2,
      title: 'New Training Facility Opens Next Month',
      excerpt: 'Our state-of-the-art training facility will feature modern equipment, recovery pools, and enhanced medical facilities to support our players\' development.',
      date: 'January 18, 2025',
      author: 'Club Management',
      category: 'Training',
      image: 'https://images.unsplash.com/flagged/photo-1568733278674-2de10ea3ded1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxydWdieSUyMHRyYWluaW5nJTIwcHJhY3RpY2UlMjBwbGF5ZXJzfGVufDB8MHx8Z3JlZW58MTc1NTM0ODk2MHww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 3,
      title: 'Youth Academy Welcomes 50 New Players',
      excerpt: 'Our youth development program continues to grow with 50 talented young players joining the academy this season, ensuring a bright future for RC Forest.',
      date: 'January 15, 2025',
      author: 'Youth Coordinator',
      category: 'Community',
      image: 'https://images.unsplash.com/photo-1551095318-8583a8da870b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3Rvcnl8ZW58MHwwfHx8MTc1NTM0ODA3OXww&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 4,
      title: 'New Sponsorship Deal with Local Business',
      excerpt: 'We\'re proud to announce a new partnership with Forest Industries, strengthening our ties with the local community and supporting our championship ambitions.',
      date: 'January 12, 2025',
      author: 'Marketing Team',
      category: 'Partnership',
      image: 'https://images.unsplash.com/photo-1647494131690-d9a1107be31f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxydWdieSUyMHBsYXllcnMlMjBhY3Rpb24lMjBzcG9ydHxlbnwwfDB8fGdyZWVufDE3NTUzNDg5NjB8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 5,
      title: 'Thomas Ramos Returns from Injury',
      excerpt: 'Our star fullback Thomas Ramos has made a full recovery from his shoulder injury and is expected to return to action for the upcoming championship final.',
      date: 'January 10, 2025',
      author: 'Medical Team',
      category: 'Injury Update',
      image: 'https://images.unsplash.com/photo-1615288668751-0f04abd008fd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMHBsYXllcnMlMjBhY3Rpb24lMjBzcG9ydHxlbnwwfDB8fGdyZWVufDE3NTUzNDg5NjB8MA&ixlib=rb-4.1.0&q=85'
    },
    {
      id: 6,
      title: 'Stadium Renovations Complete',
      excerpt: 'Our home stadium has undergone major renovations including new seating, improved facilities, and enhanced accessibility for all supporters.',
      date: 'January 8, 2025',
      author: 'Facilities Manager',
      category: 'Stadium',
      image: 'https://images.unsplash.com/photo-1589180966590-d432994dc2b6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxydWdieSUyMHN0YWRpdW0lMjBmaWVsZCUyMGFlcmlhbHxlbnwwfDB8fGdyZWVufDE3NTUzNDg5NjB8MA&ixlib=rb-4.1.0&q=85'
    }
  ];

  const featuredArticle = articles.find(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Match Report': 'bg-green-100 text-green-800',
      'Training': 'bg-blue-100 text-blue-800',
      'Community': 'bg-purple-100 text-purple-800',
      'Partnership': 'bg-orange-100 text-orange-800',
      'Injury Update': 'bg-red-100 text-red-800',
      'Stadium': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="news" className="section-rugby bg-white">
      <div className="container-rugby">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-gray-900">Latest News</h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest news, match reports, and club announcements from RC Forest
          </p>
        </div>
        
        {/* Featured Article */}
        {featuredArticle && (
          <div className="mb-16">
            <Card className="overflow-hidden hover-lift">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredArticle.image}
                    alt="Stefan Lehner on Unsplash"
                    className="w-full h-64 md:h-full object-cover"
                    style={{ width: '100%', height: '256px' }}
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      <span>{featuredArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{featuredArticle.author}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(featuredArticle.category)}`}>
                      {featuredArticle.category}
                    </span>
                  </div>
                  
                  <h3 className="heading-md mb-4 text-gray-900">
                    {featuredArticle.title}
                  </h3>
                  
                  <p className="body-md text-gray-600 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <Button variant="primary">
                    Read Full Report
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularArticles.map((article, index) => (
            <Card key={article.id} className="overflow-hidden hover-lift animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <img 
                src={article.image}
                alt={`News article image`}
                className="w-full h-48 object-cover"
                style={{ width: '100%', height: '192px' }}
              />
              
              <CardContent className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                    </svg>
                    <span>{article.date}</span>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                    {article.category}
                  </span>
                </div>
                
                <h3 className="heading-sm mb-3 text-gray-900">
                  {article.title}
                </h3>
                
                <p className="body-sm text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                
                <Button variant="outline" size="sm">
                  Read More →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* View All News Button */}
        <div className="text-center">
          <Button variant="secondary" size="lg">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
};