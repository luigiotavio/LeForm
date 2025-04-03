import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Move, Save, X, ChevronDown } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { mockCourses } from '../data/mockCourses';
import { mockClinics } from '../data/mockClinics';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('cursos');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(mockCourses);
  const [clinics, setClinics] = useState(mockClinics);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Função para filtrar itens
  const getFilteredItems = () => {
    if (activeTab === 'cursos') {
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
    
    const items = Array.from(activeTab === 'cursos' ? courses : clinics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    if (activeTab === 'cursos') {
      setCourses(items);
    } else {
      setClinics(items);
    }
  };

  // Funções de manipulação (CRUD)
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (activeTab === 'cursos') {
      setCourses(courses.filter(course => course.id !== id));
    } else {
      setClinics(clinics.filter(clinic => clinic.id !== id));
    }
  };

  const handleSave = () => {
    if (!currentItem) return;
    
    if (activeTab === 'cursos') {
      if (currentItem.id) {
        // Editar existente
        setCourses(courses.map(course => course.id === currentItem.id ? currentItem : course));
      } else {
        // Adicionar novo
        const newId = Math.max(...courses.map(c => c.id), 0) + 1;
        setCourses([...courses, { ...currentItem, id: newId }]);
      }
    } else {
      if (currentItem.id) {
        // Editar existente
        setClinics(clinics.map(clinic => clinic.id === currentItem.id ? currentItem : clinic));
      } else {
        // Adicionar novo
        const newId = Math.max(...clinics.map(c => c.id), 0) + 1;
        setClinics([...clinics, { ...currentItem, id: newId }]);
      }
    }
    
    setIsEditing(false);
    setCurrentItem(null);
    setShowAddModal(false);
  };

  const handleAddNew = () => {
    if (activeTab === 'cursos') {
      setCurrentItem({
        title: '',
        doctor: '',
        price: '',
        lessons: 0,
        specialization: '',
        link: '',
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

  // Renderizar formulário do curso
  const renderCourseForm = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
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
            onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Professor</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.doctor || ''}
            onChange={(e) => setCurrentItem({...currentItem, doctor: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Preço (R$)</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.price || ''}
            onChange={(e) => setCurrentItem({...currentItem, price: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Número de Aulas</label>
          <input 
            type="number" 
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.lessons || 0}
            onChange={(e) => setCurrentItem({...currentItem, lessons: parseInt(e.target.value)})}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Especialização</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.specialization || ''}
            onChange={(e) => setCurrentItem({...currentItem, specialization: e.target.value})}
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
            onChange={(e) => setCurrentItem({...currentItem, link: e.target.value})}
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={() => {
              setIsEditing(false);
              setCurrentItem(null);
              setShowAddModal(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-[#FF879B] text-white rounded-lg hover:bg-[#E5677F]"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );

  // Renderizar formulário da clínica
  const renderClinicForm = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
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
            onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Especialidade</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.specialty || ''}
            onChange={(e) => setCurrentItem({...currentItem, specialty: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Endereço</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.address || ''}
            onChange={(e) => setCurrentItem({...currentItem, address: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">URL da Imagem</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.imageUrl || ''}
            onChange={(e) => setCurrentItem({...currentItem, imageUrl: e.target.value})}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-1">Link do WhatsApp</label>
          <input 
            type="text" 
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.whatsappLink || ''}
            onChange={(e) => setCurrentItem({...currentItem, whatsappLink: e.target.value})}
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button 
            onClick={() => {
              setIsEditing(false);
              setCurrentItem(null);
              setShowAddModal(false);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-[#FF879B] text-white rounded-lg hover:bg-[#E5677F]"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <div className="bg-white py-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            Painel de Administração
          </h1>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs para alternar entre cursos e clínicas */}
        <div className="flex mb-6 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('cursos')}
            className={`py-3 px-6 font-medium ${activeTab === 'cursos' 
              ? 'text-[#FF879B] border-b-2 border-[#FF879B]' 
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            Cursos
          </button>
          <button 
            onClick={() => setActiveTab('clinicas')}
            className={`py-3 px-6 font-medium ${activeTab === 'clinicas' 
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
            className="flex items-center gap-2 bg-[#FF879B] hover:bg-[#E5677F] text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            <Plus size={18} />
            {activeTab === 'cursos' ? 'Adicionar Curso' : 'Adicionar Clínica'}
          </button>
        </div>

        {/* Lista de itens */}
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
                              
                              {activeTab === 'cursos' ? (
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
                                className="p-2 text-gray-500 hover:text-[#FF879B] transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button 
                                onClick={() => handleDelete(item.id)}
                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
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
      </div>

      {/* Modal de edição */}
      {(isEditing || showAddModal) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-2xl">
            {activeTab === 'cursos' ? renderCourseForm() : renderClinicForm()}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
