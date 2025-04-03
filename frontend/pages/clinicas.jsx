import React, { useState, useEffect } from 'react';
import ClinicCard from '../components/ClinicCard';
import ClinicFilters from '../components/ClinicFilters';
import { Search, Filter } from 'lucide-react';
import { mockClinics } from '../data/mockClinics';

const Clinicas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredClinics, setFilteredClinics] = useState(mockClinics);
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    services: [],
    categories: []
  });

  // Função para filtrar clínicas com base nos filtros selecionados
  useEffect(() => {
    let result = [...mockClinics];

    // Filtrar por termo de pesquisa
    if (searchTerm) {
      result = result.filter(clinic =>
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por localização
    if (selectedFilters.location.length > 0) {
      result = result.filter(clinic =>
        selectedFilters.location.some(location => clinic.address.includes(location))
      );
    }

    // Filtrar por serviços
    if (selectedFilters.services.length > 0) {
      result = result.filter(clinic =>
        selectedFilters.services.some(service => clinic.specialty.includes(service))
      );
    }

    // Filtrar por categorias
    if (selectedFilters.categories.length > 0) {
      result = result.filter(clinic =>
        selectedFilters.categories.some(category => clinic.specialty.includes(category))
      );
    }

    setFilteredClinics(result);
  }, [searchTerm, selectedFilters]);

  // Função para limpar filtros
  const clearFilters = () => {
    setSelectedFilters({
      location: [],
      services: [],
      categories: []
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">
          Encontre a clínica ideal para você.
        </h2>

        {/* Barra de Pesquisa e Botão de Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Pesquise pelo nome, especialidade..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF879B] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <button 
            className="sm:hidden flex items-center justify-center gap-2 py-3 px-4 border border-gray-200 rounded-xl"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filtrar
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex flex-col sm:flex-row gap-8">
          {/* Filtros */}
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block flex-shrink-0`}>
            <ClinicFilters 
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
          
          {/* Lista de Clínicas */}
          <div className="flex-1">
            {/* Contador e Limpar Filtros */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredClinics.length} clínicas encontradas</p>
              {(selectedFilters.location.length > 0 || selectedFilters.services.length > 0 || selectedFilters.categories.length > 0 || searchTerm) && (
                <button 
                  onClick={clearFilters}
                  className="text-[#FF879B] text-sm font-medium"
                >
                  Limpar filtros
                </button>
              )}
            </div>
            
            {/* Grid de Clínicas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClinics.map((clinic) => (
                <ClinicCard 
                  key={clinic.id} 
                  name={clinic.name}
                  specialty={clinic.specialty}
                  address={clinic.address}
                  imageUrl={clinic.imageUrl}
                  whatsappLink={clinic.whatsappLink}
                />
              ))}
            </div>

            {/* Mensagem Caso Não Haja Resultados */}
            {filteredClinics.length === 0 && (
              <div className="text-center py-10">
                <p className="text-gray-500">Nenhuma clínica encontrada com os filtros selecionados.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clinicas;
