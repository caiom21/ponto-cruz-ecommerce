import React from "react";

const About = () => {
  return (
    <section className="bg-gradient-to-br from-amber-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="ornament text-xl mb-2">✦</p>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-800 dark:text-stone-200 mb-6">
              A Arte do Bordado
            </h2>
            <p className="text-lg text-stone-700 dark:text-stone-300 mb-4 leading-relaxed">
              criamos peças bordadas requintadas que mesclam técnicas
              tradicionais com design contemporâneo. Cada criação é um trabalho
              de amor.
            </p>
            <p className="text-lg text-stone-700 dark:text-stone-300 mb-6 leading-relaxed">
              Nosso compromisso com a qualidade garante que cada fio seja
              escolhido com cuidado, cada padrão seja pensado com carinho e cada
              peça finalizada à perfeição.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-200 to-amber-400 dark:from-amber-800 dark:to-amber-900 rounded-sm shadow-elegant overflow-hidden">
              <img
                src="/pexels-olgakalinina-7448413.jpg"
                alt="Artisan at work"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
