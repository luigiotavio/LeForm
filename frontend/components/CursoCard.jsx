import React, { useState } from 'react';

const CursoCard = ({
  title,
  doctor,
  price,
  lessons,
  link,
  imageUrl,
  lerMais,
  specialization
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
        <div className="h-48 overflow-hidden bg-gray-100">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3 className="text-lg font-semibold text-[#1A1A1A] mb-1">{title}</h3>
          {/* Linha com especialização e doctor, lado a lado, divididos por traço */}
          {(specialization || doctor) && (
            <div className="flex items-center text-sm mb-4">
              {specialization && (
                <span className="text-[#FF879B]">
                  {specialization}
                </span>
              )}
              {specialization && doctor && (
                <span className="mx-2 text-gray-300">|</span>
              )}
              {doctor && (
                <span className="text-gray-600">
                  {doctor}
                </span>
              )}
            </div>
          )}
          <div className="mb-4">
            <p className="text-[#1A1A1A] font-bold text-lg">R$ {price}</p>
            <p className="text-[#FF879B] text-sm">{lessons} aulas</p>
          </div>
          <button
            className="text-[#FF879B] text-sm font-medium underline text-left cursor-pointer mb-2"
            onClick={() => setShowModal(true)}
            type="button"
          >
            Ler mais
          </button>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-[#FF879B] hover:bg-[#E5677F] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm text-center"
          >
            Quero me inscrever
          </a>
        </div>
      </div>

      {/* Modal Ler Mais */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-xl shadow-lg max-w-lg w-full p-0 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Fechar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div className="px-8 pb-8 pt-8">
              <h2 className="text-xl font-bold mb-4">{title}</h2>
              {/* Também no modal, lado a lado e separados por traço */}
              {(specialization || doctor) && (
                <div className="flex items-center text-base mb-2">
                  {specialization && (
                    <span className="text-[#FF879B]">{specialization}</span>
                  )}
                  {specialization && doctor && (
                    <span className="mx-2 text-gray-300">|</span>
                  )}
                  {doctor && (
                    <span className="text-gray-600">{doctor}</span>
                  )}
                </div>
              )}
              <div className="mb-4 text-gray-700 whitespace-pre-line min-h-[70px]">
                {lerMais || 'Sem informações adicionais para este curso.'}
              </div>
              <div className="text-gray-700 mt-4">
                <span className="font-semibold">Investimento:</span> R$ {price}
              </div>
              <div className="text-gray-500 text-sm mt-2">{lessons} aulas</div>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-[#FF879B] hover:bg-[#E5677F] text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm text-center mt-6"
              >
                Quero me inscrever
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CursoCard;
