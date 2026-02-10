import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
  {
    url: "/pexels-busrasahjn-13631019.jpg",
    title: "Rosas elegantes",
    subtitle: "Bordado artesanal com beleza atemporal",
  },
  {
    url: "/pexels-busrasahjn-13631021.jpg",
    title: "Detalhes Minuciosos",
    subtitle: "Cada ponto conta uma história",
  },
  {
    url: "/pexels-olgakalinina-7448413.jpg",
    title: "Criações Personalizadas",
    subtitle: "Transforme sua visão em realidade",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length,
    );

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-stone-800 dark:bg-stone-900">
      {carouselImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 carousel-image ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
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
                <p className="ornament text-xl md:text-2xl mb-3 font-light tracking-widest">
                  ✦ ✦ ✦
                </p>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-stone-200 font-light mb-8 font-sans">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          )}
        </div>
      ))}
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
