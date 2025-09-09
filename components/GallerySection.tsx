"use client"
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
  size: 'small' | 'medium' | 'large';
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1574602904316-f84f62477265?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85",
    alt: "Rugby team dancing in the field - Stefan Lehner on Unsplash",
    category: "Team Celebration",
    title: "Victory Dance",
    size: "large"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1652107948839-38313b628dae?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85",
    alt: "A group of men in sports uniforms - Andrea Qoqonga on Unsplash",
    category: "Team Photo",
    title: "Squad Unity",
    size: "medium"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1486206137976-8a754c7b9cf1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxydWdieSUyMHRlYW0lMjBjZWxlYnJhdGlvbiUyMHZpY3RvcnklMjB0cm9waHl8ZW58MHwwfHx8MTc1NTM1NjYwMnww&ixlib=rb-4.1.0&q=85",
    alt: "Grayscale photography of men playing rugby on muddy land - Quino Al on Unsplash",
    category: "Match Action",
    title: "In the Thick of It",
    size: "medium"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1594038478460-b0c958354871?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw4fHxydWdieSUyMGZpZWxkJTIwc3RhZGl1bSUyMGdyYXNzJTIwc3BvcnR8ZW58MHwwfHxncmVlbnwxNzU1MzU2NjAyfDA&ixlib=rb-4.1.0&q=85",
    alt: "Green grass field during daytime - Mikhail Vasilyev on Unsplash",
    category: "Stadium",
    title: "Home Ground",
    size: "small"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1595317299544-017fc65565d5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxydWdieSUyMGZpZWxkJTIwc3RhZGl1bSUyMGdyYXNzJTIwc3BvcnR8ZW58MHwwfHxncmVlbnwxNzU1MzU2NjAyfDA&ixlib=rb-4.1.0&q=85",
    alt: "White metal frame on green grass field under blue sky during daytime - Jean-François JOUET on Unsplash",
    category: "Training",
    title: "Practice Session",
    size: "small"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1589473912363-c1c51a6f6fcd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxydWdieSUyMGZpZWxkJTIwc3RhZGl1bSUyMGdyYXNzJTIwc3BvcnR8ZW58MHwwfHxncmVlbnwxNzU1MzU2NjAyfDA&ixlib=rb-4.1.0&q=85",
    alt: "Aerial view of soccer field during daytime - LOGAN WEAVER | @LGNWVR on Unsplash",
    category: "Stadium",
    title: "Aerial View",
    size: "large"
  }
];

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  
  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

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

  return (
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
  );
};

export default GallerySection;