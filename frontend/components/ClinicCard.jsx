import React, { useState } from 'react';

const ClinicCard = ({
  name, specialty, address, imageUrl, whatsappLink, lerMais, medicos
}) => {
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('info');

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full">
        <div className="h-48 overflow-hidden">
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <h3 className="text-lg font-semibold text-[#1A1A1A] mb-2">{name}</h3>
            <p className="text-gray-600 mb-2">{specialty}</p>
            <p className="text-sm text-gray-500 mb-4">{address}</p>
          </div>
          <div className="flex flex-col gap-2 mt-auto">
            <button
              type="button"
              onClick={() => { setShowModal(true); setActiveTab('info'); }}
              className="text-[#FF879B] text-sm font-medium underline text-left cursor-pointer"
            >
              Ler mais
            </button>
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

      {/* Modal */}
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

            {/* Abas lado a lado, com mais espaçamento e fonte maior */}
            <div className="flex w-full gap-5 justify-center pt-5 pb-0">
              <button
                className={`font-medium text-lg cursor-pointer px-3 pb-2 transition-colors
                  ${activeTab === 'info'
                    ? 'text-[#FF879B]'
                    : 'text-gray-500 hover:text-[#FF879B]'}`}
                onClick={() => setActiveTab('info')}
              >
                Informações
              </button>
              <button
                className={`font-medium text-lg cursor-pointer px-3 pb-2 transition-colors
                  ${activeTab === 'medicos'
                    ? 'text-[#FF879B]'
                    : 'text-gray-500 hover:text-[#FF879B]'}`}
                onClick={() => setActiveTab('medicos')}
              >
                Médicos
              </button>
            </div>

            <div className="px-6 pb-6 pt-2 min-h-[160px]">
              {activeTab === 'info' && (
                <>
                  <h2 className="text-xl font-bold mb-4">{name}</h2>
                  <div className="mb-2 text-gray-700 whitespace-pre-line min-h-[70px]">
                    {lerMais || "Sem informações adicionais."}
                  </div>
                  <p className="text-gray-500 text-sm mt-3">{specialty} • {address}</p>
                </>
              )}
              {activeTab === 'medicos' && (
                <>
                  <h3 className="text-lg font-semibold mb-4">Médicos da clínica</h3>
                  {Array.isArray(medicos) && medicos.length > 0 ? (
                    <ul className="space-y-2">
                      {medicos.map((medico, idx) => (
                        <li key={idx} className="text-gray-800 border-l-4 border-[#FF879B] pl-2">{medico}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-gray-500">Nenhum médico cadastrado.</div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ClinicCard;