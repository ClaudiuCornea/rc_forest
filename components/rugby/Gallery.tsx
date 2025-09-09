import React, { useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: 'matches' | 'training' | 'team' | 'stadium' | 'victories' | 'youth';
  title: string;
  description: string;
}

export const Gallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const galleryImages: GalleryImage[] = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1519297350257-638439b380bc?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMG1hdGNoJTIwYWN0aW9uJTIwc2NydW18ZW58MHwwfHx8MTc1NTM1MDMzOXww&ixlib=rb-4.1.0&q=85',
      alt: 'Quino Al on Unsplash',
      category: 'matches',
      title: 'Championship Final',
      description: 'Intense scrum formation during the championship final match'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1643130083953-a34f369b612a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxydWdieSUyMHRlYW0lMjBodWRkbGUlMjBzdHJhdGVneXxlbnwwfDB8fHwxNzU1MzUwMzM5fDA&ixlib=rb-4.1.0&q=85',
      alt: 'CFPhotosin Photography on Unsplash',
      category: 'team',
      title: 'Team Strategy',
      description: 'Players discussing tactics before the big match'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1626254304247-b2ec54c86cd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMHRyYWluaW5nJTIwZHJpbGwlMjBwcmFjdGljZXxlbnwwfDF8fHwxNzU1MzUwMzM5fDA&ixlib=rb-4.1.0&q=85',
      alt: 'Spikeball on Unsplash',
      category: 'training',
      title: 'Training Session',
      description: 'Intensive training drills on the practice field'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1713194723850-3d1b4e17fff3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxydWdieSUyMHN0YWRpdW0lMjBjcm93ZCUyMHN1cHBvcnRlcnN8ZW58MHwwfHx8MTc1NTM1MDMzOXww&ixlib=rb-4.1.0&q=85',
      alt: 'Rafael Camacho Greilberger on Unsplash',
      category: 'stadium',
      title: 'Home Support',
      description: 'Passionate supporters filling our home stadium'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1574602904316-f84f62477265?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwzfHxydWdieSUyMHZpY3RvcnklMjBjZWxlYnJhdGlvbiUyMHRyb3BoeXxlbnwwfDB8fHwxNzU1MzUwMzM5fDA&ixlib=rb-4.1.0&q=85',
      alt: 'Stefan Lehner on Unsplash',
      category: 'victories',
      title: 'Victory Celebration',
      description: 'Team celebrating another championship victory'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1613332331877-8a47030be80b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxydWdieSUyMHlvdXRoJTIwdHJhaW5pbmclMjBjb2FjaGluZ3xlbnwwfDF8fHwxNzU1MzUwMzM5fDA&ixlib=rb-4.1.0&q=85',
      alt: 'Philippa Rose-Tite on Unsplash',
      category: 'youth',
      title: 'Youth Development',
      description: 'Young players learning the fundamentals'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1603389658124-0288af3e66d7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxydWdieSUyMG1hdGNoJTIwYWN0aW9uJTIwc2NydW18ZW58MHwwfHx8MTc1NTM1MDMzOXww&ixlib=rb-4.1.0&q=85',
      alt: 'Quino Al on Unsplash',
      category: 'matches',
      title: 'Derby Match',
      description: 'Fierce competition in the local derby'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1631021694928-56b70c9be844?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxydWdieSUyMHRlYW0lMjBodWRkbGUlMjBzdHJhdGVneXxlbnwwfDB8fHwxNzU1MzUwMzM5fDA&ixlib=rb-4.1.0&q=85',
      alt: 'CFPhotosin Photography on Unsplash',
      category: 'team',
      title: 'Team Unity',
      description: 'Building team spirit and camaraderie'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1611812302630-8f2901a158a3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw3fHxydWdieSUyMHRyYWluaW5nJTIwZHJpbGwlMjBwcmFjdGljZXxlbnwwfDF8fHwxNzU1MzUwMzM5fDA&ixlib=rb-4.1.0&q=85',
      alt: 'Rahadiansyah on Unsplash',
      category: 'training',
      title: 'Fitness Training',
      description: 'Maintaining peak physical condition'
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1560003991-545650ee5f07?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw5fHxydWdieSUyMHZpY3RvcnklMjBjZWxlYnJhdGlvbiUyMHRyb3BoeXxlbnwwfDB8fHwxNzU1MzUwMzM5fDA&ixlib=rb-4.1.0&q=85',
      alt: 'Hadi Yazdi Aznaveh on Unsplash',
      category: 'victories',
      title: 'Trophy Presentation',
      description: 'Lifting the championship trophy'
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1718246425786-894821186deb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxMHx8cnVnYnklMjBzdGFkaXVtJTIwY3Jvd2QlMjBzdXBwb3J0ZXJzfGVufDB8MHx8fDE3NTUzNTAzMzl8MA&ixlib=rb-4.1.0&q=85',
      alt: 'happyinn 12 on Unsplash',
      category: 'stadium',
      title: 'Match Day Atmosphere',
      description: 'Electric atmosphere on match day'
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1612729153740-3f595f81651c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxydWdieSUyMHlvdXRoJTIwdHJhaW5pbmclMjBjb2FjaGluZ3xlbnwwfDF8fHwxNzU1MzUwMzM5fDA&ixlib=rb-4.1.0&q=85',
      alt: 'Philippa Rose-Tite on Unsplash',
      category: 'youth',
      title: 'Future Stars',
      description: 'Nurturing the next generation of rugby talent'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'matches', label: 'Matches' },
    { id: 'team', label: 'Team' },
    { id: 'training', label: 'Training' },
    { id: 'stadium', label: 'Stadium' },
    { id: 'victories', label: 'Victories' },
    { id: 'youth', label: 'Youth' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeFilter);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="gallery" className="section-rugby bg-gradient-to-br from-gray-50 to-white">
      <div className="container-rugby">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-gray-900">Gallery</h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Capturing the passion, dedication, and memorable moments that define RC Forest Rugby Club
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-red-50 hover:border-red-300'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <Card 
              key={image.id} 
              className="group cursor-pointer overflow-hidden hover-lift animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(image)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ width: '100%', height: '256px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm text-gray-200">{image.description}</p>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button variant="secondary" size="lg">
            Load More Photos
          </Button>
        </div>
      </div>
      
      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Image */}
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                style={{ width: 'auto', height: 'auto' }}
              />
              
              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <h3 className="text-white font-bold text-xl mb-2">{selectedImage.title}</h3>
                <p className="text-gray-200">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};