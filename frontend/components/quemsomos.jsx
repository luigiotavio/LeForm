import { useState } from 'react';
import imagem from "../src/assets/imagemteste.png";
import { Plus, Minus } from "lucide-react";

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-2 w-full transition-all">
      <button
        className="flex justify-between items-center w-full cursor-pointer py-3 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-base">{title}</span>
        <span className="ml-2 text-[#FF879B]">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 text-sm text-gray-600 transition-all">
          {content}
        </div>
      )}
    </div>
  );
}

function Quemsomos() {
  return (
    <section id="quemsomos" className="py-12 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        {/* Imagem */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={imagem}
            alt="Avatar"
            className="w-full max-w-[420px] rounded-xl object-contain shadow-md"
          />
        </div>
        {/* Conteúdo */}
        <div className="md:w-1/2 flex flex-col">
          <h1 className="font-bold text-2xl md:text-3xl text-[#1A1A1A]">
            Quem somos?
          </h1>
          <div className="w-72 md:w-96 h-px bg-black rounded mt-6 mb-8" />
          <p className="text-gray-700 mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, velit sit amet tempus auctor, dolor augue aliquet ipsum, at maximus neque justo a nisl. Nunc vel tellus luctus, venenatis massa in, pulvinar turpis.<br /><br />
            Aliquam neque justo, egestas nec dolor ac, semper aliquam ante. Aliquam erat volutpat. Donec lacus arcu, mattis ac lectus sed, egestas rhoncus mauris. Nunc efficitur risus id mi luctus, sit amet blandit magna tincidunt.
          </p>
          <div className="space-y-2">
            <AccordionItem
              title="Lorem ipsum dolor sit amet."
              content="Conteúdo que aparece quando clica no +"
            />
            <AccordionItem
              title="Lorem ipsum dolor sit amet."
              content="Outro conteúdo expansível"
            />
            <AccordionItem
              title="Lorem ipsum dolor sit amet."
              content="Mais conteúdo ainda"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quemsomos;
