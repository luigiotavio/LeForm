import React from 'react';

const Filtros = ({
  selectedFilters,
  setSelectedFilters,
  specializationOptions = [],
  priceRanges = []
}) => {
  const handleSpecializationChange = (specialization) => {
    const currentSpecializations = [...selectedFilters.specialization];
    if (currentSpecializations.includes(specialization)) {
      setSelectedFilters({
        ...selectedFilters,
        specialization: currentSpecializations.filter(item => item !== specialization)
      });
    } else {
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
      {/* Especialização */}
      <div className="mb-8">
        <h4 className="font-medium mb-4">Especialização</h4>
        <div className="space-y-3">
          {specializationOptions.length === 0 ? (
            <span className="text-gray-400 text-sm">Nenhuma especialização encontrada</span>
          ) : (
            specializationOptions.map((item) => (
              <label key={item} className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 accent-[#FF879B] focus:ring-[#FF879B]"
                  checked={selectedFilters.specialization.includes(item)}
                  onChange={() => handleSpecializationChange(item)}
                />
                <span className="ml-3 text-gray-700">{item}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Faixa de Valor */}
      <div>
        <h4 className="font-medium mb-4">Valor</h4>
        <div className="space-y-3">
          {priceRanges.length === 0 ? (
            <span className="text-gray-400 text-sm">Nenhuma faixa de valor encontrada</span>
          ) : (
            priceRanges.map((item) => (
              <label key={item.value} className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 accent-[#FF879B] focus:ring-[#FF879B]"
                  checked={selectedFilters.priceRange === item.value}
                  onChange={() => handlePriceChange(item.value)}
                />
                <span className="ml-3 text-gray-700">{item.label}</span>
              </label>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Filtros;
