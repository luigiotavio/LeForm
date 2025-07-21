import React, { useState, useEffect } from 'react';
import ClinicCard from '../components/ClinicCard';
import ClinicFilters from '../components/ClinicFilters';
import { Search, Filter } from 'lucide-react';

const Clinicas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [filteredClinics, setFilteredClinics] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    location: [],
    services: [],
    categories: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar clínicas do backend
  useEffect(() => {
    setLoading(true);
    const url = 'https://leform.onrender.com/clinicas/'
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar clínicas');
        return res.json();
      })
      .then(data => {
        const mapped = data.map(clinic => ({
          id: clinic.id,
          name: clinic.nome,
          specialty: clinic.especialidade,
          address: clinic.endereco,
          imageUrl: clinic.url_imagem,
          whatsappLink: clinic.link_whatsapp
        }));
        setClinics(mapped);
        setFilteredClinics(mapped);
        setError(null);
      })
      .catch(() => setError('Erro ao carregar clínicas.'))
      .finally(() => setLoading(false));
  }, []);

  // Filtragem
  useEffect(() => {
    let result = [...clinics];
    if (searchTerm) {
      result = result.filter(clinic =>
        clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedFilters.location.length > 0) {
      result = result.filter(clinic =>
        selectedFilters.location.some(location => clinic.address.includes(location))
      );
    }
    if (selectedFilters.services.length > 0) {
      result = result.filter(clinic =>
        selectedFilters.services.some(service => clinic.specialty.includes(service))
      );
    }
    if (selectedFilters.categories.length > 0) {
      result = result.filter(clinic =>
        selectedFilters.categories.some(category => clinic.specialty.includes(category))
      );
    }
    setFilteredClinics(result);
  }, [searchTerm, selectedFilters, clinics]);

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
        <div className="flex flex-col sm:flex-row gap-8">
          <div className={`${showFilters ? 'block' : 'hidden'} sm:block flex-shrink-0`}>
            <ClinicFilters
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
          <div className="flex-1">
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
            {loading ? (
              <div className="text-center py-10 text-gray-500">Carregando clínicas...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-500">{error}</div>
            ) : (
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
            )}
            {!loading && !error && filteredClinics.length === 0 && (
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
