import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Instagram, Facebook, Mail, Phone, ShoppingBag, Search, Menu, X } from 'lucide-react';

// Product data type
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

const EmbroideryEcommerce = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // Carousel images
  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1200&h=600&fit=crop',
      title: 'Handcrafted Elegance',
      subtitle: 'Artisan embroidery with timeless beauty'
    },
    {
      url: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?w=1200&h=600&fit=crop',
      title: 'Intricate Details',
      subtitle: 'Every stitch tells a story'
    },
    {
      url: 'https://images.unsplash.com/photo-1558769132-cb1aea8675c0?w=1200&h=600&fit=crop',
      title: 'Custom Designs',
      subtitle: 'Bring your vision to life'
    }
  ];

  // Featured products
  const products: Product[] = [
    { id: 1, name: 'Floral Table Runner', price: 89, image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=400&fit=crop', category: 'Home Decor' },
    { id: 2, name: 'Embroidered Cushion', price: 45, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', category: 'Home Decor' },
    { id: 3, name: 'Silk Handkerchief Set', price: 65, image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?w=400&h=400&fit=crop', category: 'Accessories' },
    { id: 4, name: 'Custom Monogram Towel', price: 38, image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=400&h=400&fit=crop', category: 'Bath' },
    { id: 5, name: 'Vintage Wall Art', price: 125, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=400&fit=crop', category: 'Art' },
    { id: 6, name: 'Garden Theme Napkins', price: 52, image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400&h=400&fit=crop', category: 'Dining' }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="min-h-screen bg-stone-50 font-serif">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap');
        
        body {
          font-family: 'Cormorant Garamond', serif;
        }
        
        .font-sans {
          font-family: 'Montserrat', sans-serif;
        }
        
        .fade-in {
          animation: fadeIn 0.8s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .slide-in {
          animation: slideIn 1s ease-out;
        }
        
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        
        .product-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .product-card:hover {
          transform: translateY(-8px);
        }
        
        .carousel-image {
          transition: opacity 0.6s ease-in-out;
        }
        
        .ornament {
          background: linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #8b7355 0%, #5d4e37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .shadow-elegant {
          box-shadow: 0 10px 40px rgba(139, 115, 85, 0.15);
        }
      `}</style>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-amber-900 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">E</span>
              </div>
              <h1 className="text-2xl font-bold text-gradient">Étoile Broderie</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 font-sans text-sm">
              <a href="#home" className="text-stone-700 hover:text-amber-800 transition-colors">Home</a>
              <a href="#shop" className="text-stone-700 hover:text-amber-800 transition-colors">Shop</a>
              <a href="#about" className="text-stone-700 hover:text-amber-800 transition-colors">About</a>
              <a href="#contact" className="text-stone-700 hover:text-amber-800 transition-colors">Contact</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-6">
              <button className="hidden md:block text-stone-600 hover:text-amber-800 transition-colors">
                <Search size={20} />
              </button>
              <button className="relative text-stone-600 hover:text-amber-800 transition-colors">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-sans">
                    {cartCount}
                  </span>
                )}
              </button>
              <button 
                className="md:hidden text-stone-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 fade-in">
              <nav className="flex flex-col space-y-3 font-sans text-sm">
                <a href="#home" className="text-stone-700 hover:text-amber-800 transition-colors py-2">Home</a>
                <a href="#shop" className="text-stone-700 hover:text-amber-800 transition-colors py-2">Shop</a>
                <a href="#about" className="text-stone-700 hover:text-amber-800 transition-colors py-2">About</a>
                <a href="#contact" className="text-stone-700 hover:text-amber-800 transition-colors py-2">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Carousel */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-stone-800">
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 carousel-image ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={slide.url} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
            
            {index === currentSlide && (
              <div className="absolute inset-0 flex items-center justify-center text-center px-4 fade-in">
                <div>
                  <p className="ornament text-xl md:text-2xl mb-3 font-light tracking-widest">✦ ✦ ✦</p>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                    {slide.title}
                  </h2>
                  <p className="text-xl md:text-2xl text-stone-200 font-light mb-8 font-sans">
                    {slide.subtitle}
                  </p>
                  <button className="bg-white text-amber-900 px-8 py-3 font-sans font-medium hover:bg-amber-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Explore Collection
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-3 rounded-full transition-all duration-300"
        >
          <ChevronRight className="text-white" size={24} />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <p className="ornament text-xl mb-2">✦</p>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">Featured Collection</h2>
          <p className="text-lg text-stone-600 font-sans font-light max-w-2xl mx-auto">
            Discover our curated selection of handcrafted embroidered pieces, each one a testament to artisan craftsmanship
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="product-card bg-white rounded-sm overflow-hidden shadow-elegant cursor-pointer fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden h-80">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-amber-800 text-white px-3 py-1 text-xs font-sans font-medium">
                  {product.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-stone-800 mb-2">{product.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-amber-800">${product.price}</span>
                  <button 
                    onClick={() => setCartCount(cartCount + 1)}
                    className="bg-stone-800 text-white px-5 py-2 text-sm font-sans font-medium hover:bg-amber-800 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-br from-amber-50 to-stone-100 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="ornament text-xl mb-2">✦</p>
              <h2 className="text-4xl md:text-5xl font-bold text-stone-800 mb-6">The Art of Embroidery</h2>
              <p className="text-lg text-stone-700 mb-4 leading-relaxed">
                For over three decades, we've been crafting exquisite embroidered pieces that blend traditional techniques with contemporary design. Each creation is a labor of love, meticulously stitched by skilled artisans.
              </p>
              <p className="text-lg text-stone-700 mb-6 leading-relaxed">
                Our commitment to quality means every thread is carefully chosen, every pattern thoughtfully designed, and every piece finished to perfection.
              </p>
              <button className="bg-amber-800 text-white px-8 py-3 font-sans font-medium hover:bg-amber-900 transition-all duration-300 shadow-md hover:shadow-lg">
                Our Story
              </button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-400 rounded-sm shadow-elegant overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=600&fit=crop"
                  alt="Artisan at work"
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white rounded-sm shadow-elegant p-6 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-800">30+</p>
                  <p className="text-sm font-sans text-stone-600">Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Media */}
      <section className="bg-stone-800 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-amber-400 text-xl mb-2">✦</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Connect With Us</h2>
            <p className="text-stone-300 font-sans font-light text-lg">
              Follow our journey and stay inspired
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Social Media Links */}
            <div className="bg-stone-700/50 backdrop-blur-sm p-8 rounded-sm text-center hover:bg-stone-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <Instagram size={40} className="mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-semibold mb-2">Instagram</h3>
              <p className="text-stone-300 font-sans text-sm mb-4">@etoilebroderie</p>
              <a href="#" className="text-amber-400 hover:text-amber-300 font-sans text-sm">Follow Us →</a>
            </div>

            <div className="bg-stone-700/50 backdrop-blur-sm p-8 rounded-sm text-center hover:bg-stone-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <Facebook size={40} className="mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-semibold mb-2">Facebook</h3>
              <p className="text-stone-300 font-sans text-sm mb-4">Étoile Broderie</p>
              <a href="#" className="text-amber-400 hover:text-amber-300 font-sans text-sm">Like Our Page →</a>
            </div>

            <div className="bg-stone-700/50 backdrop-blur-sm p-8 rounded-sm text-center hover:bg-stone-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
              <Mail size={40} className="mx-auto mb-4 text-amber-400" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-stone-300 font-sans text-sm mb-4">hello@etoilebroderie.com</p>
              <a href="mailto:hello@etoilebroderie.com" className="text-amber-400 hover:text-amber-300 font-sans text-sm">Send Message →</a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gradient-to-r from-amber-800 to-amber-900 p-8 md:p-12 rounded-sm text-center">
            <h3 className="text-3xl font-bold mb-4">Join Our Newsletter</h3>
            <p className="text-amber-100 font-sans mb-6 max-w-2xl mx-auto">
              Get exclusive access to new collections, special offers, and embroidery tips delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-sm text-stone-800 font-sans focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="bg-white text-amber-900 px-8 py-3 font-sans font-medium hover:bg-amber-50 transition-colors rounded-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Étoile Broderie</h4>
              <p className="font-sans text-sm leading-relaxed">
                Crafting timeless embroidered pieces with passion and precision since 1994.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 font-sans text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Home Decor</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Custom Orders</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 font-sans text-sm">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Care Instructions</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 font-sans text-sm">
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>hello@etoilebroderie.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 pt-8 text-center font-sans text-sm">
            <p>&copy; 2026 Étoile Broderie. All rights reserved. Crafted with love and precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EmbroideryEcommerce;