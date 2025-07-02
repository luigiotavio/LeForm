import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Edit2, Trash2, Move, LogOut } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('cursoslista');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal ref para detectar clique fora
  const modalRef = useRef(null);

  // Fechar modal ao clicar fora
  useEffect(() => {
    if (!(isEditing || showAddModal)) return;
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsEditing(false);
        setShowAddModal(false);
        setCurrentItem(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing, showAddModal]);

  // Buscar dados de cursos e clínicas
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Buscar cursos
        const coursesResponse = await fetch('/cursoslista');
        if (!coursesResponse.ok) throw new Error('Erro ao buscar cursos');
        const coursesData = await coursesResponse.json();

        // Mapear cursos
        const mappedCourses = coursesData.map(course => ({
          id: course.id,
          title: course.nome,
          doctor: course.doutor,
          price: course.preco ? course.preco.toString() : '0',
          lessons: parseInt(course.atividades) || 0,
          specialization: course.especializacao,
          link: course.link,
          imageUrl: course.url_imagem
        }));
        setCourses(mappedCourses);

        // Buscar clínicas
        const clinicsResponse = await fetch('/clinicas');
        if (!clinicsResponse.ok) throw new Error('Erro ao buscar clínicas');
        const clinicsData = await clinicsResponse.json();

        // Mapear clínicas
        const mappedClinics = clinicsData.map(clinic => ({
          id: clinic.id,
          name: clinic.nome,
          specialty: clinic.especialidade,
          address: clinic.endereco,
          imageUrl: clinic.url_imagem,
          whatsappLink: clinic.link_whatsapp
        }));
        setClinics(mappedClinics);

      } catch (err) {
        console.error('Erro:', err);
        setError('Erro ao carregar dados. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // CRUD para cursos
  const handleSaveCourse = async () => {
    try {
      const backendFormat = {
        nome: currentItem.title,
        doutor: currentItem.doctor,
        preco: parseFloat(currentItem.price.replace(',', '.')),
        atividades: currentItem.lessons.toString(),
        especializacao: currentItem.specialization,
        link: currentItem.link,
        url_imagem: currentItem.imageUrl || ''
      };

      let response;

      if (currentItem.id) {
        // Atualizar existente
        response = await fetch(`/cursoslista/${currentItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backendFormat)
        });
      } else {
        // Criar novo
        response = await fetch('/cursoslista', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backendFormat)
        });
      }

      if (!response.ok) throw new Error('Erro ao salvar curso');

      // Recarregar cursos após salvar
      const coursesResponse = await fetch('/cursoslista');
      const coursesData = await coursesResponse.json();
      const mappedCourses = coursesData.map(course => ({
        id: course.id,
        title: course.nome,
        doctor: course.doutor,
        price: course.preco ? course.preco.toString() : '0',
        lessons: parseInt(course.atividades) || 0,
        specialization: course.especializacao,
        link: course.link,
        imageUrl: course.url_imagem
      }));
      setCourses(mappedCourses);

      setIsEditing(false);
      setCurrentItem(null);
      setShowAddModal(false);
    } catch (error) {
      console.error('Erro ao salvar curso:', error);
      alert('Erro ao salvar curso. Tente novamente.');
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`/cursoslista/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erro ao deletar curso');

      setCourses(courses.filter(course => course.id !== id));
    } catch (error) {
      console.error('Erro ao deletar curso:', error);
      alert('Erro ao deletar curso. Tente novamente.');
    }
  };

  // CRUD para clínicas
  const handleSaveClinic = async () => {
    try {
      const backendFormat = {
        nome: currentItem.name,
        especialidade: currentItem.specialty,
        endereco: currentItem.address,
        url_imagem: currentItem.imageUrl,
        link_whatsapp: currentItem.whatsappLink
      };

      let response;

      if (currentItem.id) {
        // Atualizar existente
        response = await fetch(`/clinicas/${currentItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backendFormat)
        });
      } else {
        // Criar novo
        response = await fetch('/clinicas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(backendFormat)
        });
      }

      if (!response.ok) throw new Error('Erro ao salvar clínica');

      // Recarregar clínicas após salvar
      const clinicsResponse = await fetch('/clinicas');
      const clinicsData = await clinicsResponse.json();
      const mappedClinics = clinicsData.map(clinic => ({
        id: clinic.id,
        name: clinic.nome,
        specialty: clinic.especialidade,
        address: clinic.endereco,
        imageUrl: clinic.url_imagem,
        whatsappLink: clinic.link_whatsapp
      }));
      setClinics(mappedClinics);

      setIsEditing(false);
      setCurrentItem(null);
      setShowAddModal(false);
    } catch (error) {
      console.error('Erro ao salvar clínica:', error);
      alert('Erro ao salvar clínica. Tente novamente.');
    }
  };

  const handleDeleteClinic = async (id) => {
    try {
      const response = await fetch(`/clinicas/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Erro ao deletar clínica');

      setClinics(clinics.filter(clinic => clinic.id !== id));
    } catch (error) {
      console.error('Erro ao deletar clínica:', error);
      alert('Erro ao deletar clínica. Tente novamente.');
    }
  };

  // Funções generalizadas para operações CRUD
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (activeTab === 'cursoslista') {
      handleDeleteCourse(id);
    } else {
      handleDeleteClinic(id);
    }
  };

  const handleSave = () => {
    if (activeTab === 'cursoslista') {
      handleSaveCourse();
    } else {
      handleSaveClinic();
    }
  };

  const handleAddNew = () => {
    if (activeTab === 'cursoslista') {
      setCurrentItem({
        title: '',
        doctor: '',
        price: '0',
        lessons: 0,
        specialization: '',
        link: '',
        imageUrl: ''
      });
    } else {
      setCurrentItem({
        name: '',
        specialty: '',
        address: '',
        imageUrl: '',
        whatsappLink: '',
      });
    }
    setShowAddModal(true);
  };

  // Função para filtrar itens
  const getFilteredItems = () => {
    if (activeTab === 'cursoslista') {
      return courses.filter(course =>
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.doctor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return clinics.filter(clinic =>
        clinic.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  // Função para reordenar itens (drag and drop)
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(activeTab === 'cursoslista' ? courses : clinics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    if (activeTab === 'cursoslista') {
      setCourses(items);
    } else {
      setClinics(items);
    }
  };

  // Renderizar formulário do curso
  const renderCourseForm = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#1A1A1A]">
        {currentItem.id ? 'Editar Curso' : 'Adicionar Novo Curso'}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Título</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.title || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Professor</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.doctor || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, doctor: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Preço (R$)</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.price || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Número de Aulas</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.lessons || 0}
            onChange={(e) => setCurrentItem({ ...currentItem, lessons: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Especialização</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.specialization || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, specialization: e.target.value })}
          >
            <option value="">Selecione...</option>
            <option value="Rinoplastia">Rinoplastia</option>
            <option value="Mamoplastia">Mamoplastia</option>
            <option value="Lipoaspiração">Lipoaspiração</option>
            <option value="Abdominoplastia">Abdominoplastia</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Link de Inscrição</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.link || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, link: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">URL da Imagem</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.imageUrl || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, imageUrl: e.target.value })}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setCurrentItem(null);
              setShowAddModal(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#FF879B] text-white rounded-lg hover:bg-[#E5677F] cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar formulário da clínica
  const renderClinicForm = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#1A1A1A]">
        {currentItem.id ? 'Editar Clínica' : 'Adicionar Nova Clínica'}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.name || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Especialidade</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.specialty || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, specialty: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Endereço</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.address || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, address: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">URL da Imagem</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.imageUrl || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, imageUrl: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Link do WhatsApp</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.whatsappLink || ''}
            onChange={(e) => setCurrentItem({ ...currentItem, whatsappLink: e.target.value })}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setCurrentItem(null);
              setShowAddModal(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-[#FF879B] text-white rounded-lg hover:bg-[#E5677F] cursor-pointer"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );

  // Botão de logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Cabeçalho */}
      <div className="bg-white py-6 border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            Painel de Administração
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#FF879B] font-medium py-2 px-4 rounded-lg transition-colors absolute right-4 top-6 cursor-pointer"
            title="Logout"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs para alternar entre cursos e clínicas */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('cursoslista')}
            className={`py-3 px-6 font-medium cursor-pointer ${activeTab === 'cursoslista'
              ? 'text-[#FF879B] border-b-2 border-[#FF879B]'
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Cursos
          </button>
          <button
            onClick={() => setActiveTab('clinicas')}
            className={`py-3 px-6 font-medium cursor-pointer ${activeTab === 'clinicas'
              ? 'text-[#FF879B] border-b-2 border-[#FF879B]'
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Clínicas
          </button>
        </div>

        {/* Barra de pesquisa e botão de adicionar */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF879B] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 bg-[#FF879B] hover:bg-[#E5677F] text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer"
          >
            <Plus size={18} />
            {activeTab === 'cursoslista' ? 'Adicionar Curso' : 'Adicionar Clínica'}
          </button>
        </div>

        {/* Estados de loading e erro */}
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Carregando dados...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          /* Lista de itens */
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="items">
                {(provided) => (
                  <div
                    className="divide-y divide-gray-200"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {getFilteredItems().length > 0 ? (
                      getFilteredItems().map((item, index) => (
                        <Draggable
                          key={item.id}
                          draggableId={item.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="p-4 hover:bg-gray-50 flex items-center justify-between"
                            >
                              <div className="flex items-center gap-4">
                                <div {...provided.dragHandleProps} className="cursor-move text-gray-400">
                                  <Move size={20} />
                                </div>
                                {activeTab === 'cursoslista' ? (
                                  <div>
                                    <p className="font-medium text-[#1A1A1A]">{item.title}</p>
                                    <p className="text-sm text-gray-500">{item.doctor} • R$ {item.price} • {item.lessons} aulas</p>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="font-medium text-[#1A1A1A]">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.specialty}</p>
                                    <p className="text-sm text-gray-400">{item.address}</p>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleEdit(item)}
                                  className="p-2 text-gray-500 hover:text-[#FF879B] transition-colors cursor-pointer"
                                >
                                  <Edit2 size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(item.id)}
                                  className="p-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">
                        Nenhum item encontrado
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>

      {/* Modal de edição/adicionar */}
      {(isEditing || showAddModal) && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative"
          >
            {/* Botão X para fechar */}
            <button
              onClick={() => {
                setIsEditing(false);
                setShowAddModal(false);
                setCurrentItem(null);
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Fechar modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {activeTab === 'cursoslista' ? renderCourseForm() : renderClinicForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;