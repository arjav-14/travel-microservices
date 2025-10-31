import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { Hero } from '../components/Hero';
import { Destinations } from '../components/Destinations';

export default function Home() {
  const destinationsRef = useRef(null);
  const packagesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  // Handle scroll to sections
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle scroll on component mount if there's a hash in the URL
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Small delay to ensure the page is fully loaded
    const timer = setTimeout(scrollToHash, 100);
    return () => clearTimeout(timer);
  }, []);

  // Add scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <Hero />
      {/* <section className="relative h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16">
      {/* Destinations Section */}
      <section 
        ref={destinationsRef}
        id="destinations" 
        className="py-20 bg-white fade-in-on-scroll opacity-0"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              Explore Destinations
            </span>
            
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <Destinations />
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="group" asChild>
              <Link to="/packages" className="flex items-center mx-auto">
                View All Packages
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section 
        ref={packagesRef}
        id="packages" 
        className="py-20 bg-gray-50 fade-in-on-scroll opacity-0"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Amazing Travel Experiences</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-12"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Add your packages content here */}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        ref={aboutRef}
        id="about" 
        className="py-20 bg-white fade-in-on-scroll opacity-0"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
                About Us
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Your Journey, Our Passion</h2>
              <div className="w-20 h-1 bg-blue-600 mb-8"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At WanderWay, we believe that travel is not just about the destination, but the journey and experiences along the way. 
                Our mission is to create unforgettable travel experiences that go beyond the ordinary.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                With over 10 years of experience in the travel industry, our team of experts is dedicated to crafting personalized 
                itineraries that cater to your unique travel style and preferences.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">10K+</h3>
                  <p className="text-gray-600">Happy Travelers</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
                  <p className="text-gray-600">Destinations</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
                  <p className="text-gray-600">Support</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">5.0</h3>
                  <p className="text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000" 
                  alt="Travel experience" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg hidden lg:block">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Need help with your trip?</p>
                    <p className="text-lg font-semibold text-gray-900">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        id="contact" 
        className="py-20 bg-gray-50 fade-in-on-scroll opacity-0"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full">
              Contact Us
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Have questions about our packages or need help planning your next adventure? 
              Our team is here to help!
            </p>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your dream vacation..."
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <Button type="submit" size="lg" className="px-8">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 bg-gradient-to-r from-blue-600 to-cyan-500 text-white overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-32 -right-20 w-80 h-80 bg-cyan-400/20 rounded-full filter blur-3xl"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-yellow-300/20 rounded-full filter blur-2xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-600 bg-white rounded-full">
              Start Your Journey
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready for Your Next <span className="text-yellow-300">Adventure</span>?
            </h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of travelers who have already discovered their perfect getaway with us.
              Create unforgettable memories with our handpicked experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="group px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
                asChild
              >
                <Link to="/signup" className="flex items-center">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg font-medium border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                asChild
              >
                <Link to="/packages" className="flex items-center">
                  Explore Packages
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-white/80 mb-4">TRUSTED BY 10,000+ TRAVELERS</p>
              <div className="flex flex-wrap justify-center items-center gap-6 opacity-80">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 w-auto grayscale contrast-200 brightness-0 invert">
                    <svg className="h-full w-auto" viewBox="0 0 100 24" fill="currentColor">
                      <path d="M12 0L4 6v12l8-6 8 6V6L12 0zM4 18v-9l8 6 8-6v9l-8-6-8 6z"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
