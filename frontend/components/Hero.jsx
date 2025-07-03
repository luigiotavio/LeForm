import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const whatsappLink =
  "https://wa.me/5511984057846?text=Ol%C3%A1!%20Gostaria%20de%20ser%20um%20parceiro!%20Pode%20me%20passar%20mais%20informa%C3%A7%C3%B5es%20por%20favor%3F%F0%9F%98%8A";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-[#FAFAFA] to-[#F0F0F0] flex items-center min-h-[60vh] lg:min-h-[50vh]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center lg:justify-between w-full h-full">
        {/* Texto e Botão */}
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-[2rem] lg:text-[2.5rem] font-bold text-[#1A1A1A] leading-tight mb-6">
            Seja <span className="text-[#FF879B]">parceiro</span> da clínica referência em cirurgia plástica no Brasil!
          </h1>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#FF879B] hover:bg-[#E5677F] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all"
          >
            <FaWhatsapp size={22} />
            Entrar em contato
          </a>
        </div>

        {/* Imagem */}
        <div className="hidden lg:block w-full lg:w-[40%] h-full">
          <img
            src="/medico_hero.svg"
            alt="Médico"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;