import React from 'react';

const ClinicFilters = ({
  selectedFilters,
  setSelectedFilters,
  locationOptions = [],
  specialtyOptions = [],
}) => {
  // Função para atualizar filtros (localização/especialidade)
  const handleFilterChange = (type, value) => {
    const currentFilters = [...selectedFilters[type]];
    if (currentFilters.includes(value)) {
      setSelectedFilters({
        ...selectedFilters,
        [type]: currentFilters.filter(item => item !== value)
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        [type]: [...currentFilters, value]
      });
    }
  };

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-2xl border border-gray-100">
      <h3 className="font-semibold text-lg mb-6">Aplicar filtros</h3>
      {/* Localização */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Localização</h4>
        <div className="space-y-3">
          {locationOptions.map(({ location, count }) => (
            <label key={location} className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 accent-[#FF879B] focus:ring-[#FF879B]"
                checked={selectedFilters.location.includes(location)}
                onChange={() => handleFilterChange('location', location)}
              />
              <span className="ml-3 text-gray-700">{location}</span>
              {/* <span className="ml-1 text-xs text-gray-400">({count})</span> */}
            </label>
          ))}
        </div>
      </div>
      {/* Especialidade */}
      <div>
        <h4 className="font-medium mb-4">Especialidade</h4>
        <div className="space-y-3">
          {specialtyOptions.map(({ specialty, count }) => (
            <label key={specialty} className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 accent-[#FF879B] focus:ring-[#FF879B]"
                checked={selectedFilters.specialties.includes(specialty)}
                onChange={() => handleFilterChange('specialties', specialty)}
              />
              <span className="ml-3 text-gray-700">{specialty}</span>
              {/* <span className="ml-1 text-xs text-gray-400">({count})</span> */}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicFilters;
