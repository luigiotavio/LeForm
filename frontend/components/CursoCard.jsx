import React from 'react';

const CursoCard = ({ title, doctor, price, lessons, link, imageUrl }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* Imagem */}
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
        <p className="text-gray-600 mb-4">{doctor}</p>
        <div className="mb-4">
          <p className="text-[#1A1A1A] font-bold text-lg">R$ {price}</p>
          <p className="text-[#FF879B] text-sm">{lessons} aulas</p>
        </div>
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
  );
};


export default CursoCard;
