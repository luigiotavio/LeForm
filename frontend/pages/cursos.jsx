import React, { useState, useEffect } from 'react';
import CursoCard from '../components/CursoCard';
import Filtros from '../components/Filtros';
import Hero from '../components/Hero';
import { Search, Filter } from 'lucide-react';

const getPriceRanges = (prices) => {
  if (!prices.length) return [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const step = Math.ceil((maxPrice - minPrice) / 4) || 100;
  let ranges = [];
  let from = Math.floor(minPrice / 10) * 10;

  for (let i = 0; i < 4; i++) {
    let to = i < 3 ? from + step : maxPrice;
    ranges.push({
      label: i < 3 ? `R$ ${from} - R$ ${to}` : `R$ ${from}+`,
      value: i < 3 ? `${from}-${to}` : `${from}-99999`
    });
    from = to + 1;
  }
  return ranges;
};

const Cursos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    specialization: [],
    priceRange: ''
  });
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = 'http://localhost:5000/cursoslista/'; //alterar

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao buscar cursos');
        return res.json();
      })
      .then(data => {
        // LOG para depuração
        // console.log('Cursos recebidos:', data);
        // console.log('Especializações:', data.map(c => c.especializacao));

        // Mapeando campos do backend para o frontend
        const mappedCourses = data.map(course => ({
          id: course.id,
          title: course.nome,
          doctor: course.doutor,
          price: course.preco ? course.preco.toString().replace('.', ',') : '0',
          lessons: parseInt(course.atividades) || 0,
          specialization: course.especializacao,
          link: course.link,
          imageUrl: course.url_imagem,
          lerMais: course.ler_mais
        }));

        // Gera lista de especializações únicas (split seguro)
        const specMap = {};
        mappedCourses.forEach((course) => {
          if (typeof course.specialization === 'string' && course.specialization.trim().length > 0) {
            course.specialization
              .split(/,| e |\/|;/i)
              .map(s => s.trim())
              .filter(Boolean)
              .forEach(spec => {
                specMap[spec] = true;
              });
          }
        });
        const specs = Object.keys(specMap);

        // Gera lista de preços numéricos
        const prices = mappedCourses.map(c =>
          parseFloat(c.price.replace(',', '.'))
        ).filter(v => !isNaN(v));
        const ranges = getPriceRanges(prices);

        setCourses(mappedCourses);
        setFilteredCourses(mappedCourses);
        setSpecializationOptions(specs);
        setPriceRanges(ranges);
        setError(null);
      })
      .catch(err => {
        console.error('Erro ao buscar cursos:', err);
        setError('Erro ao carregar cursos. Por favor, tente novamente.');
      })
      .finally(() => setLoading(false));
  }, []);

  // FILTRO
  useEffect(() => {
    let result = [...courses];

    // Filtro por pesquisa
    if (searchTerm) {
      result = result.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.doctor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por especialização
    if (selectedFilters.specialization.length > 0) {
      result = result.filter(course => {
        const specs = typeof course.specialization === 'string'
          ? course.specialization.split(/,| e |\/|;/i).map(s => s.trim()).filter(Boolean)
          : [];
        return selectedFilters.specialization.some(sel =>
          specs.includes(sel)
        );
      });
    }

    // Filtro por valor
    if (selectedFilters.priceRange) {
      const [min, max] = selectedFilters.priceRange.split('-').map(Number);
      result = result.filter(course => {
        const coursePrice = parseFloat(course.price.replace(',', '.'));
        return coursePrice >= min && coursePrice <= max;
      });
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedFilters, courses]);

  // Limpar filtros
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
              specializationOptions={specializationOptions}
              priceRanges={priceRanges}
            />
          </div>
          {/* Lista de Cursos */}
          <div className="flex-1">
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
            {/* Loading/Erro/Lista */}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((curso) => (
                    <CursoCard
                      key={curso.id}
                      {...curso}
                    />
                  ))}
                </div>
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