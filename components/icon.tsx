'use client';

import { 
  Bolt, 
  Users, 
  Globe, 
  Heart, 
  MapPin, 
  Clock, 
  Mail, 
  Smartphone, 
  Facebook, 
  Github, 
  Linkedin, 
  X, 
  Youtube, 
  Instagram 
} from 'lucide-react';
import React from 'react';

export const IconOptions = {
  Tina: (props: any) => (
    <svg {...props} viewBox='0 0 66 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <title>Tina</title>
      <path
        d='M39.4615 36.1782C42.763 33.4475 44.2259 17.3098 45.6551 11.5091C47.0843 5.70828 52.995 6.0025 52.995 6.0025C52.995 6.0025 51.4605 8.67299 52.0864 10.6658C52.7123 12.6587 57 14.4401 57 14.4401L56.0752 16.8781C56.0752 16.8781 54.1441 16.631 52.995 18.9297C51.8459 21.2283 53.7336 43.9882 53.7336 43.9882C53.7336 43.9882 46.8271 57.6106 46.8271 63.3621C46.8271 69.1136 49.5495 73.9338 49.5495 73.9338H45.7293C45.7293 73.9338 40.1252 67.2648 38.9759 63.9318C37.8266 60.5988 38.2861 57.2658 38.2861 57.2658C38.2861 57.2658 32.1946 56.921 26.7931 57.2658C21.3915 57.6106 17.7892 62.2539 17.1391 64.8512C16.4889 67.4486 16.2196 73.9338 16.2196 73.9338H13.1991C11.3606 68.2603 9.90043 66.2269 10.6925 63.3621C12.8866 55.4269 12.4557 50.9263 11.9476 48.9217C11.4396 46.9172 8 45.1676 8 45.1676C9.68492 41.7349 11.4048 40.0854 18.8029 39.9133C26.201 39.7413 36.1599 38.9088 39.4615 36.1782Z'
        fill='currentColor'
      />
      <path
        d='M20.25 63.03C20.25 63.03 21.0305 70.2533 25.1773 73.9342H28.7309C25.1773 69.9085 24.7897 59.415 24.7897 59.415C22.9822 60.0035 20.4799 62.1106 20.25 63.03Z'
        fill='currentColor'
      />
    </svg>
  ),
  Bolt,
  Users,
  Globe,
  Heart,
  MapPin,
  Clock,
  Mail,
  Smartphone,
  Facebook,
  Github,
  Linkedin,
  X,
  Youtube,
  Instagram,
  // Fallback mappings
  HiBolt: Bolt,
  HiUsers: Users,
  HiGlobeAlt: Globe,
  HiHeart: Heart,
  HiMapPin: MapPin,
  HiClock: Clock,
  HiEnvelope: Mail,
  HiDevicePhoneMobile: Smartphone,
};

export type IconName = keyof typeof IconOptions;

const iconSizeClass = {
  xs: 'w-6 h-6',
  small: 'w-8 h-8',
  medium: 'w-10 h-10',
  large: 'w-12 h-12',
  xl: 'w-16 h-16',
  custom: '',
};

export type IconSize = keyof typeof iconSizeClass;

interface IconProps {
  data: {
    name: string;
    size?: IconSize;
    color?: string;
    style?: string;
  };
  className?: string;
  tinaField?: string;
}

export const Icon = ({ data, className = '', tinaField = '' }: IconProps) => {
  const iconOptions = IconOptions as Record<string, any>;
  if (!data?.name || !iconOptions[data.name]) {
    return null;
  }

  const { name, size = 'medium' } = data;
  const IconSVG = iconOptions[name];
  const iconSizeClasses = iconSizeClass[size] || iconSizeClass.medium;

  // Standardized "Pro" layout: Circular badge with subtle glow
  return (
    <div
      {...(tinaField ? { 'data-tina-field': tinaField } : {})}
      className={`relative z-10 inline-flex items-center justify-center shrink-0 ${iconSizeClasses} rounded-full bg-club-red text-white shadow-[0_0_1.5rem_rgba(var(--primary-color-rgb),0.25)] ${className}`}
    >
      <IconSVG className='w-[55%] h-[55%] stroke-[2.5px]' />
    </div>
  );
};
