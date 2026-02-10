import React from "react";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-stone-800 dark:text-white font-semibold mb-4">
              Contato
            </h4>
            <ul className="space-y-2 font-sans text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span> (81) 97318-1258</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>hello@vivianepontoaponto.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-stone-200 dark:border-stone-800 pt-8 text-center font-sans text-sm">
          <p>
            &copy; 2026 Viviane ponto a ponto. All rights reserved. Crafted with
            love and precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
