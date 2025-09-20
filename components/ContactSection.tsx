"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  UserIcon,
  UsersIcon
} from '@heroicons/react/24/outline';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading text-5xl md:text-6xl text-rugby-black mb-6">
            JOIN US
          </h2>
          <p className="body-text-medium text-xl text-gray-600 max-w-5xl mx-auto my-6">
            Do you dream of chasing the ball, feeling the adrenaline of a perfect tackle,
            or simply sharing unforgettable moments with a passionate team? Then RC Forest Rugby Club is made for you!<br />
            Whether you are a beginner, an experienced player, or just curious to discover this incredible sport, we welcome you with open arms.<br />
            Join us to experience the magic of rugby: personal growth, team spirit, and guaranteed laughter!
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

          {/* Contact Form */}
          <div>
            <Card className="bg-white border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="section-heading text-3xl text-rugby-black pt-8">
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="body-text-medium text-rugby-black mb-2 block">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="border-gray-300 focus:border-rugby-red focus:ring-rugby-red"
                      />
                    </div>
                    <div>
                      <label className="body-text-medium text-rugby-black mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        required
                        className="border-gray-300 focus:border-rugby-red focus:ring-rugby-red"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="body-text-medium text-rugby-black mb-2 block">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(555) 123-4567"
                        className="border-gray-300 focus:border-rugby-red focus:ring-rugby-red"
                      />
                    </div>
                    <div>
                      <label className="body-text-medium text-rugby-black mb-2 block">
                        Subject *
                      </label>
                      <Input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        required
                        className="border-gray-300 focus:border-rugby-red focus:ring-rugby-red"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="body-text-medium text-rugby-black mb-2 block">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                      className="border-gray-300 focus:border-rugby-red focus:ring-rugby-red resize-none"
                    />
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-rugby-red hover:bg-rugby-red-dark text-white py-3 text-lg"
                  >
                    Send Message
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                  <p className="body-text text-gray-600">
                    Or reach out directly at{' '}
                    <a href="mailto:info@rugbyforest.be" className="text-rugby-red hover:underline">
                      info@rugbyforest.be
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;