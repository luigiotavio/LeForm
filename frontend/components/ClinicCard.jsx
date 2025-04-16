import React from 'react';

const ClinicCard = ({ name, specialty, address, imageUrl, whatsappLink }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Imagem */}
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col justify-between flex-1">
        {/* Nome, Especialidade e Endereço */}
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{name}</h3>
          <p className="text-gray-600 mb-2">{specialty}</p>
          <p className="text-sm text-gray-500 mb-4">{address}</p>
        </div>

        {/* Botões */}
        <div className="flex flex-col gap-2 mt-auto">
          {/* Link para Catálogo de Médicos */}
          <a 
            href="#" 
            className="text-[#FF879B] text-sm font-medium underline text-left"
          >
            Catálogo de médicos
          </a>

          {/* Botão para Agendar Consulta */}
          <a 
            href={whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#FF879B] hover:bg-[#E5677F] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm text-center"
          >
            Agendar consulta
          </a>
        </div>
      </div>
    </div>
  );
};

export default ClinicCard;
