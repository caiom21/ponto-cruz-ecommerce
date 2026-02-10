import React, { useState } from "react";
import Header from "./sections/Header";
import HeroCarousel from "./sections/HeroCarousel";
import FeaturedProducts from "./sections/FeaturedProducts";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

const EmbroideryEcommerce = () => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div className="
    min-h-screen bg-stone-50 dark:bg-stone-900 font-serif">
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

      <Header cartCount={cartCount} />
      <HeroCarousel />
      <FeaturedProducts />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default EmbroideryEcommerce;
