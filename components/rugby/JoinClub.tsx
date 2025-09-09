import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';

interface MembershipTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export const JoinClub: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    membership: '',
    message: ''
  });

  const membershipTiers: MembershipTier[] = [
    {
      id: 'youth',
      name: 'Youth Member',
      description: 'Ages 8-17',
      price: 120,
      features: [
        'Weekly training sessions',
        'Youth league participation',
        'Equipment provided',
        'Coaching certification'
      ]
    },
    {
      id: 'adult',
      name: 'Adult Member',
      description: 'Ages 18+',
      price: 250,
      features: [
        'Professional training',
        'League competitions',
        'Gym access',
        'Social events',
        'Match tickets included'
      ],
      popular: true
    },
    {
      id: 'supporter',
      name: 'Supporter',
      description: 'All ages',
      price: 80,
      features: [
        'Match tickets discount',
        'Club merchandise discount',
        'Newsletter subscription',
        'Social events access'
      ]
    }
  ];

  const benefits = [
    {
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Community',
      description: 'Join a tight-knit community of rugby enthusiasts who share your passion for the sport and support each other on and off the field.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: 'Excellence',
      description: 'Train with professional coaches and experienced players to develop your skills and reach your full potential in rugby.'
    },
    {
      icon: (
        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Activities',
      description: 'Participate in regular training sessions, competitive matches, social events, and community outreach programs.'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest in RC Forest! We will contact you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      membership: '',
      message: ''
    });
  };

  return (
    <section id="join" className="section-rugby bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container-rugby">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 text-gray-900">Join RC Forest</h2>
          <p className="body-lg text-gray-600 max-w-2xl mx-auto">
            Become part of our rugby family and experience the passion, camaraderie, and excellence that defines RC Forest
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 hover-glow">
                {benefit.icon}
              </div>
              <h3 className="heading-sm mb-3 text-gray-900">{benefit.title}</h3>
              <p className="body-sm text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        {/* Membership Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {membershipTiers.map((tier, index) => (
            <Card 
              key={tier.id} 
              className={`text-center hover-lift animate-scale-in ${
                tier.popular ? 'border-2 border-red-500 relative' : ''
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader>
                <h3 className="heading-sm mb-2 text-gray-900">{tier.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{tier.description}</p>
                <div className="text-4xl font-bold mb-2 text-gray-900">€{tier.price}</div>
                <p className="text-gray-600 text-sm">per season</p>
              </CardHeader>
              
              <CardContent>
                <ul className="text-left space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={tier.popular ? "primary" : "secondary"} 
                  className="w-full"
                >
                  {tier.id === 'supporter' ? 'Become Supporter' : `Join ${tier.name.split(' ')[0]} Program`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <h3 className="heading-sm text-center text-gray-900">Get in Touch</h3>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="rugby-input"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="rugby-input"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="rugby-input"
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="rugby-input"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="membership" className="block text-sm font-medium text-gray-700 mb-2">
                    Membership Interest
                  </label>
                  <select
                    id="membership"
                    name="membership"
                    value={formData.membership}
                    onChange={handleInputChange}
                    required
                    className="rugby-input"
                  >
                    <option value="">Select membership type</option>
                    <option value="youth">Youth Member (€120)</option>
                    <option value="adult">Adult Member (€250)</option>
                    <option value="supporter">Supporter (€80)</option>
                    <option value="info">Just want information</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="rugby-input rugby-textarea"
                    placeholder="Tell us about your rugby experience or any questions you have..."
                  />
                </div>
                
                <div className="text-center">
                  <Button type="submit" variant="primary" size="lg">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Information */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 text-center">
          <div>
            <h4 className="font-bold mb-2 text-gray-900">Visit Us</h4>
            <p className="text-gray-600 text-sm">
              Stade Municipal<br />
              123 Rue du Rugby<br />
              31000 Toulouse, France
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-2 text-gray-900">Contact</h4>
            <p className="text-gray-600 text-sm">
              Phone: +33 5 61 12 34 56<br />
              Email: contact@rcforest.fr<br />
              Training: Tue/Thu 19:00
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-2 text-gray-900">Follow Us</h4>
            <div className="flex justify-center gap-4">
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors hover-lift">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors hover-lift">
                <span className="text-sm font-bold">t</span>
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors hover-lift">
                <span className="text-sm font-bold">i</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};