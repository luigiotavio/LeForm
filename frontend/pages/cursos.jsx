import React, { useState, useEffect } from 'react';
import CursoCard from '../components/CursoCard';
import Filtros from '../components/Filtros';
import Hero from '../components/Hero';
import { Search, Filter } from 'lucide-react';

const Cursos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    specialization: [],
    priceRange: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar cursos do backend
  useEffect(() => {
    setLoading(true);
    fetch('/cursos')
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar cursos');
        return res.json();
      })
      .then(data => {
        // Mapeando campos do backend para o frontend
        const mappedCourses = data.map(course => ({
          id: course.id,
          title: course.nome,
          doctor: course.doutor,
          price: course.preco ? course.preco.toString().replace('.', ',') : '0',
          lessons: parseInt(course.atividades) || 0,
          specialization: course.especializacao,
          link: course.link,
          imageUrl: course.url_imagem 
        }));
        
        setCourses(mappedCourses);
        setFilteredCourses(mappedCourses);
        setError(null);
      })
      .catch(err => {
        console.error('Erro ao buscar cursos:', err);
        setError('Erro ao carregar cursos. Por favor, tente novamente.');
      })
      .finally(() => setLoading(false));
  }, []);

  // Função para filtrar cursos com base nos filtros selecionados
  useEffect(() => {
    let result = [...courses];
    
    // Filtrar por termo de pesquisa
    if (searchTerm) {
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por especialização
    if (selectedFilters.specialization.length > 0) {
      result = result.filter(course => 
        selectedFilters.specialization.includes(course.specialization)
      );
    }
    
    // Filtrar por faixa de preço
    if (selectedFilters.priceRange) {
      const [min, max] = selectedFilters.priceRange.split('-').map(Number);
      result = result.filter(course => {
        // Converter preço para número, considerando formato brasileiro (vírgula)
        const coursePrice = parseFloat(course.price.replace(',', '.'));
        return coursePrice >= min && coursePrice <= max;
      });
    }
    
    setFilteredCourses(result);
  }, [searchTerm, selectedFilters, courses]);

  // Função para limpar filtros
  const clearFilters = () => {
    setSelectedFilters({
      specialization: [],
      priceRange: ''
    });
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-8">
          Quer se especializar? Conheça nossos cursos.
        </h2>

        {/* Barra de Pesquisa e Botão de Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Pesquise pelo nome, especialização..."
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
            <Filtros 
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
          
          {/* Lista de Cursos */}
          <div className="flex-1">
            {/* Contador e Limpar Filtros */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{filteredCourses.length} cursos encontrados</p>
              {(selectedFilters.specialization.length > 0 || selectedFilters.priceRange || searchTerm) && (
                <button 
                  onClick={clearFilters}
                  className="text-[#FF879B] text-sm font-medium"
                >
                  Limpar filtros
                </button>
              )}
            </div>
            
            {/* Estados de loading e erro */}
            {loading ? (
              <div className="text-center py-10">
                <p className="text-gray-500">Carregando cursos...</p>
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <>
                {/* Grid de Cursos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((curso) => (
                    <CursoCard 
                      key={curso.id} 
                      {...curso}
                    />
                  ))}
                </div>

                {/* Mensagem Caso Não Haja Resultados */}
                {filteredCourses.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500">Nenhum curso encontrado com os filtros selecionados.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cursos;