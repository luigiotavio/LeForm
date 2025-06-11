import { useState } from 'react'
import imagem from "../src/assets/imagemteste.png"
import { Plus, Minus } from "lucide-react";

function AccordionItem({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-2 w-full">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="font-medium">{title}</p>
        <span>{isOpen ? <Minus size={16} /> : <Plus size={16} />}</span>
      </div>
      {isOpen && (
        <div className="mt-2 text-sm text-gray-600">
          {content}
        </div>
      )}
    </div>
  );
}

function Quemsomos() {
  return (
    <div id="quemsomos" className='p-10'>
      <div className='flex flex-col md:flex-row gap-10'>
        <div className='md:w-1/2 flex justify-center items-center'>
          <img src={imagem}  alt="Avatar" className="w-full max-w-[500px] object-contain" />
        </div>
        <div className='md:w-1/2'>
          <h1 className='font-bold'>Quem somos?</h1>
          {/* <hr class="border-gray-800 w-80 mt-4 mb-4"/> */}
          <p className=''>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi luctus, velit sit amet tempus auctor, dolor augue aliquet ipsum, at maximus neque justo a nisl. Nunc vel tellus luctus, venenatis massa in, pulvinar turpis.<br></br><br></br>Aliquam neque justo, egestas nec dolor ac, semper aliquam ante. Aliquam erat volutpat. Donec lacus arcu, mattis ac lectus sed, egestas rhoncus mauris. Nunc efficitur risus id mi luctus, sit amet blandit magna tincidunt.
          </p>

        <div className='mt-10 space-y-4'>
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
      </div>

  )
}

export default Quemsomos;
