import React from 'react';

const ClinicFilters = ({ selectedFilters, setSelectedFilters }) => {
  const locations = ['Norte', 'Nordeste', 'Centro-Oeste', 'Sudeste', 'Sul'];
  const services = ['Rinoplastia', 'Mamoplastia', 'Lipoaspiração', 'Abdominoplastia'];
  const categories = ['Cirurgia Estética', 'Cirurgia Reconstrutiva', 'Procedimentos'];

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
      
      <div className="mb-8">
        <h4 className="font-medium mb-4">Localização</h4>
        <div className="space-y-3">
          {locations.map((location) => (
            <label key={location} className="flex items-center">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[#FF879B] focus:ring-[#FF879B]" 
                checked={selectedFilters.location.includes(location)}
                onChange={() => handleFilterChange('location', location)}
              />
              <span className="ml-3 text-gray-700">{location}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h4 className="font-medium mb-4">Serviço</h4>
        <div className="space-y-3">
          {services.map((service) => (
            <label key={service} className="flex items-center">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[#FF879B] focus:ring-[#FF879B]" 
                checked={selectedFilters.services.includes(service)}
                onChange={() => handleFilterChange('services', service)}
              />
              <span className="ml-3 text-gray-700">{service}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Categoria</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[#FF879B] focus:ring-[#FF879B]" 
                checked={selectedFilters.categories.includes(category)}
                onChange={() => handleFilterChange('categories', category)}
              />
              <span className="ml-3 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClinicFilters;