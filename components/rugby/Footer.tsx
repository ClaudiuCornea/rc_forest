import React from 'react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#squad', label: 'Squad' },
    { href: '#fixtures', label: 'Fixtures' },
    { href: '#news', label: 'News' },
    { href: '#history', label: 'History' }
  ];

  const socialLinks = [
    { href: '#', label: 'Facebook', icon: 'f' },
    { href: '#', label: 'Twitter', icon: 't' },
    { href: '#', label: 'Instagram', icon: 'i' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-rugby">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Club Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rugby-gradient rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">RC</span>
              </div>
              <h3 className="font-bold text-xl">RC Forest</h3>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              A proud rugby club with over 40 years of excellence, tradition, and community spirit in the heart of Toulouse.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors hover-lift"
                  aria-label={social.label}
                >
                  <span className="text-sm font-bold">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Stade Municipal</li>
              <li>123 Rue du Rugby</li>
              <li>31000 Toulouse, France</li>
              <li className="pt-2">
                <a href="tel:+33561123456" className="hover:text-white transition-colors">
                  +33 5 61 12 34 56
                </a>
              </li>
              <li>
                <a href="mailto:contact@rcforest.fr" className="hover:text-white transition-colors">
                  contact@rcforest.fr
                </a>
              </li>
            </ul>
          </div>
          
          {/* Training Schedule */}
          <div>
            <h4 className="font-bold mb-4">Training Schedule</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex justify-between">
                <span>Tuesday:</span>
                <span>19:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span>Thursday:</span>
                <span>19:00 - 21:00</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>14:00 - 16:00</span>
              </li>
              <li className="flex justify-between">
                <span>Youth:</span>
                <span>Wed 18:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 RC Forest Rugby Club. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};