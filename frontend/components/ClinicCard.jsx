import React, { useState } from 'react';

const ClinicCard = ({ name, specialty, address, imageUrl, whatsappLink }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
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
          <div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{name}</h3>
            <p className="text-gray-600 mb-2">{specialty}</p>
            <p className="text-sm text-gray-500 mb-4">{address}</p>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            {/* Botão Ler mais */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-[#FF879B] text-sm font-medium underline text-left cursor-pointer"
            >
              Ler mais
            </button>

            {/* Botão para Agendar Consulta */}
            <a 
              href={whatsappLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#FF879B] hover:bg-[#E5677F] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm text-center cursor-pointer"
            >
              Agendar consulta
            </a>
          </div>
        </div>
      </div>

      {/* Modal Ler mais */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div
            className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Fechar modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">{name}</h2>
            <p className="mb-2 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Mauris euismod, nisl eget aliquam ultricies, nunc nisl aliquam nunc, eget aliquam massa nisl quis neque.
            </p>
            <p className="text-gray-500 text-sm">{specialty} • {address}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ClinicCard;
