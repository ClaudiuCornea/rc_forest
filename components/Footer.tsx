import React from 'react';
import { Separator } from '@/components/ui/separator';
import { 
  LifebuoyIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  return (
    <footer className="bg-rugby-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-rugby-red p-3 rounded-lg">
                <LifebuoyIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="section-heading text-2xl">RC FOREST</h3>
                <p className="body-text text-gray-300">Rugby Club</p>
              </div>
            </div>
            <p className="body-text text-gray-300 mb-6 max-w-md">
              Founded in 1998, RC Forest has been building champions both on and off the field. 
              Join our family and experience the power of rugby.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPinIcon className="w-5 h-5 text-rugby-red" />
                <span className="body-text text-gray-300">Bd de la Deuxième Armée Britannique 580, 1190 Forest, Belgium</span>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="w-5 h-5 text-rugby-red" />
                <span className="body-text text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="w-5 h-5 text-rugby-red" />
                <span className="body-text text-gray-300">info@rugbyforest.be</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="body-text-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="body-text text-gray-300 hover:text-rugby-red transition-colors">About Us</a></li>
              <li><a href="#squad" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Our Squad</a></li>
              <li><a href="#fixtures" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Fixtures</a></li>
              <li><a href="#news" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Latest News</a></li>
              <li><a href="#gallery" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Gallery</a></li>
              <li><a href="#contact" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h4 className="body-text-bold text-lg mb-6">Get Involved</h4>
            <ul className="space-y-3">
              <li><a href="#" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Join as Player</a></li>
              <li><a href="#" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Become Supporter</a></li>
              <li><a href="#" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Volunteer</a></li>
              <li><a href="#" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Sponsorship</a></li>
              <li><a href="#" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Youth Academy</a></li>
              <li><a href="#" className="body-text text-gray-300 hover:text-rugby-red transition-colors">Coaching</a></li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <p className="body-text text-gray-400">
              © 2025 RC Forest Rugby Club. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="body-text text-gray-400 hover:text-rugby-red transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="body-text text-gray-400 hover:text-rugby-red transition-colors">
              Terms of Service
            </a>
            <a href="#" className="body-text text-gray-400 hover:text-rugby-red transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="text-center">
            <h4 className="body-text-medium text-lg mb-4">Follow RC Forest</h4>
            <div className="flex justify-center gap-4">
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-rugby-red p-3 rounded-lg transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-rugby-red p-3 rounded-lg transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-rugby-red p-3 rounded-lg transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323C5.902 8.198 7.053 7.708 8.35 7.708s2.448.49 3.323 1.297c.876.876 1.366 2.027 1.366 3.324s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.876-.875-1.366-2.026-1.366-3.323s.49-2.448 1.366-3.323c.875-.876 2.026-1.366 3.323-1.366s2.448.49 3.323 1.366c.876.875 1.366 2.026 1.366 3.323s-.49 2.448-1.366 3.323c-.875.876-2.026 1.366-3.323 1.366z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="bg-gray-800 hover:bg-rugby-red p-3 rounded-lg transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;