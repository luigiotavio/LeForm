import React from 'react';

const Filtros = ({ selectedFilters, setSelectedFilters }) => {
  const handleSpecializationChange = (specialization) => {
    const currentSpecializations = [...selectedFilters.specialization];
    
    if (currentSpecializations.includes(specialization)) {
      // Remove se já estiver selecionado
      setSelectedFilters({
        ...selectedFilters,
        specialization: currentSpecializations.filter(item => item !== specialization)
      });
    } else {
      // Adiciona se não estiver selecionado
      setSelectedFilters({
        ...selectedFilters,
        specialization: [...currentSpecializations, specialization]
      });
    }
  };

  const handlePriceChange = (priceRange) => {
    setSelectedFilters({
      ...selectedFilters,
      priceRange: selectedFilters.priceRange === priceRange ? '' : priceRange
    });
  };

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-2xl border border-gray-100">
      <h3 className="font-semibold text-lg mb-6">Aplicar filtros</h3>
      
      <div className="mb-8">
        <h4 className="font-medium mb-4">Especialização</h4>
        <div className="space-y-3">
          {['Rinoplastia', 'Mamoplastia', 'Lipoaspiração', 'Abdominoplastia'].map((item) => (
            <label key={item} className="flex items-center">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[#FF879B] focus:ring-[#FF879B]" 
                checked={selectedFilters.specialization.includes(item)}
                onChange={() => handleSpecializationChange(item)}
              />
              <span className="ml-3 text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-4">Valor</h4>
        <div className="space-y-3">
          {[
            { label: 'R$ 0-100', value: '0-100' },
            { label: 'R$ 100-200', value: '100-200' },
            { label: 'R$ 200-300', value: '200-300' },
            { label: 'R$ +300', value: '300-9999' }
          ].map((item) => (
            <label key={item.value} className="flex items-center">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[#FF879B] focus:ring-[#FF879B]" 
                checked={selectedFilters.priceRange === item.value}
                onChange={() => handlePriceChange(item.value)}
              />
              <span className="ml-3 text-gray-700">{item.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filtros;
