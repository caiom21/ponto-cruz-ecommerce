import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Contact = () => {
  return (
    <section className="bg-stone-800 text-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-amber-400 text-xl mb-2">✦</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Entre em contato conosco</h2>
          <p className="text-stone-300 font-sans font-light text-lg">
            Siga nossa jornada e fique inspirado
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-stone-700/50 backdrop-blur-sm p-8 rounded-sm text-center hover:bg-stone-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <Instagram size={40} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">Instagram</h3>
            <p className="text-stone-300 font-sans text-sm mb-4">@vivianepontoaponto</p>
            <a href="https://www.instagram.com/viviane_ponto_a_ponto/" className="text-amber-400 hover:text-amber-300 font-sans text-sm">Follow Us →</a>
          </div>
          <div className="bg-stone-700/50 backdrop-blur-sm p-8 rounded-sm text-center hover:bg-stone-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <Facebook size={40} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">Facebook</h3>
            <p className="text-stone-300 font-sans text-sm mb-4">Viviane Ponto a Ponto</p>
            <a href="https://www.instagram.com/viviane_ponto_a_ponto/" className="text-amber-400 hover:text-amber-300 font-sans text-sm">Like Our Page →</a>
          </div>
          <div className="bg-stone-700/50 backdrop-blur-sm p-8 rounded-sm text-center hover:bg-stone-700 transition-all duration-300 cursor-pointer transform hover:-translate-y-2">
            <Mail size={40} className="mx-auto mb-4 text-amber-400" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-stone-300 font-sans text-sm mb-4">hello@vivianepontoaponto.com</p>
            <a href="mailto:hello@vivianepontoaponto.com" className="text-amber-400 hover:text-amber-300 font-sans text-sm">Mande uma mensagem →</a>
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 p-8 md:p-12 rounded-sm text-center">
          <h3 className="text-3xl font-bold mb-4">Participe da nossa Newsletter</h3>
          <p className="text-amber-100 font-sans mb-6 max-w-2xl mx-auto">
            Tenha acesso exclusivo a novas coleções, ofertas especiais e dicas de bordado entregues diretamente na sua caixa de entrada.
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
  );
};

export default Contact;