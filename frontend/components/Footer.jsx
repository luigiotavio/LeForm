import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">© 2025 Leform - Todos os direitos reservados.</p>
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="hover:text-[#FF879B] transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-[#FF879B] transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-[#FF879B] transition-colors">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
