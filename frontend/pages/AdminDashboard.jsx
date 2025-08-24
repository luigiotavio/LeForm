import React, { useRef, useEffect, useState } from 'react';
import { Search, Plus, Edit2, Trash2, Move, LogOut } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useLocation, Navigate } from 'react-router-dom';

const CLOUD_NAME = "ddhxypadw";
const UPLOAD_PRESET = "leform";

function ImageUploadField({ value, onChange }) {
  const handleCloudinaryUpload = () => {
    if (!window.cloudinary) {
      alert("Cloudinary carregando... Aguarde um momento e tente novamente.");
      return;
    }
    window.cloudinary.openUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        sources: ["local", "camera", "url"],
        multiple: false,
        cropping: false,
        resourceType: "image",
        maxFileSize: 5 * 1024 * 1024, // 5 MB
        folder: "leform"
      },
      (error, result) => {
        if (!error && result && result.event === "success" && result.info.secure_url) {
          onChange(result.info.secure_url);
        }
      }
    );
  };

  // Load widget
  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <label className="block text-gray-700 mb-1">URL da Imagem</label>
      <div className="flex gap-2 items-center">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={value || ''}
          onChange={e => onChange(e.target.value)}
          placeholder="URL da imagem ou clique em Upload"
        />
        <button
          type="button"
          className="bg-[#FF879B] text-white py-2 px-3 rounded-lg cursor-pointer"
          onClick={handleCloudinaryUpload}
        >
          Upload
        </button>
      </div>
      {value &&
        <img src={value} alt="prévia" className="mt-2 border rounded w-24 h-24 object-cover" />
      }
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('cursoslista');
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal ref para fechar ao clicar fora
  const modalRef = useRef(null);
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

  // Buscar cursos e clínicas
  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch('https://leform.onrender.com/cursoslista/').then(r => r.json()),
      fetch('https://leform.onrender.com/clinicas/').then(r => r.json())
    ])
      .then(([coursesData, clinicsData]) => {
        setCourses(coursesData.map(course => ({
          id: course.id,
          title: course.nome,
          doctor: course.doutor,
          price: course.preco ? course.preco.toString() : '0',
          lessons: parseInt(course.atividades) || 0,
          specialization: course.especializacao,
          link: course.link,
          imageUrl: course.url_imagem,
          ler_mais: course.ler_mais
        })));
        setClinics(clinicsData.map(clinic => ({
          id: clinic.id,
          name: clinic.nome,
          specialty: clinic.especialidade,
          address: clinic.endereco,
          imageUrl: clinic.url_imagem,
          whatsappLink: clinic.link_whatsapp,
          ler_mais: clinic.ler_mais
        })));
        setError(null);
      })
      .catch(() => setError('Erro ao carregar dados.'))
      .finally(() => setLoading(false));
  }, []);

  // CRUD
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
        response = await fetch(`https://leform.onrender.com/cursoslista/${currentItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(backendFormat) });
      } else {
        response = await fetch('https://leform.onrender.com/cursoslista', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(backendFormat) });
      }
      if (!response.ok) throw new Error();
      const data = await fetch('https://leform.onrender.com/cursoslista').then(r => r.json());
      setCourses(data.map(course => ({
        id: course.id, title: course.nome, doctor: course.doutor, price: course.preco ? course.preco.toString() : '0',
        lessons: parseInt(course.atividades) || 0, specialization: course.especializacao, link: course.link, imageUrl: course.url_imagem,
      })));
      setIsEditing(false); setCurrentItem(null); setShowAddModal(false);
    } catch {
      alert('Erro ao salvar curso');
    }
  };
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
        response = await fetch(`https://leform.onrender.com/clinicas/${currentItem.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(backendFormat) });
      } else {
        response = await fetch('https://leform.onrender.com/clinicas', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(backendFormat) });
      }
      if (!response.ok) throw new Error();
      const data = await fetch('https://leform.onrender.com/clinicas').then(r => r.json());
      setClinics(data.map(clinic => ({
        id: clinic.id, name: clinic.nome, specialty: clinic.especialidade, address: clinic.endereco, imageUrl: clinic.url_imagem, whatsappLink: clinic.link_whatsapp
      })));
      setIsEditing(false); setCurrentItem(null); setShowAddModal(false);
    } catch {
      alert('Erro ao salvar clínica');
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`https://leform.onrender.com/cursoslista/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error();
      setCourses(courses.filter(c => c.id !== id));
    } catch { alert('Erro ao deletar curso'); }
  };
  const handleDeleteClinic = async (id) => {
    try {
      const response = await fetch(`https://leform.onrender.com/clinicas/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error();
      setClinics(clinics.filter(c => c.id !== id));
    } catch { alert('Erro ao deletar clínica'); }
  };

  // Ações gerais
  const handleEdit = (item) => { setCurrentItem(item); setIsEditing(true); };
  const handleDelete = (id) => { activeTab === 'cursoslista' ? handleDeleteCourse(id) : handleDeleteClinic(id); };
  const handleSave = () => { activeTab === 'cursoslista' ? handleSaveCourse() : handleSaveClinic(); };
  const handleAddNew = () => {
    if (activeTab === 'cursoslista') setCurrentItem({ title: '', doctor: '', price: '0', lessons: 0, specialization: '', link: '', imageUrl: '' });
    else setCurrentItem({ name: '', specialty: '', address: '', imageUrl: '', whatsappLink: '' });
    setShowAddModal(true);
  };

  // Lista filtrada
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

  // Drag/drop
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(activeTab === 'cursoslista' ? courses : clinics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    if (activeTab === 'cursoslista') setCourses(items); else setClinics(items);
  };

  // Forms
  const renderCourseForm = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#1A1A1A]">{currentItem.id ? 'Editar Curso' : 'Adicionar Novo Curso'}</h3>
      <div className="space-y-4">
        <div><label className="block text-gray-700 mb-1">Título</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={currentItem.title || ''}
            onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} />
        </div>
        <div><label className="block text-gray-700 mb-1">Professor</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={currentItem.doctor || ''}
            onChange={e => setCurrentItem({ ...currentItem, doctor: e.target.value })} />
        </div>
        <div><label className="block text-gray-700 mb-1">Preço (R$)</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" value={currentItem.price || ''}
            onChange={e => setCurrentItem({ ...currentItem, price: e.target.value })} />
        </div>
        <div><label className="block text-gray-700 mb-1">Número de Aulas</label>
          <input type="number" className="w-full p-2 border border-gray-300 rounded-lg" value={currentItem.lessons || 0}
            onChange={e => setCurrentItem({ ...currentItem, lessons: parseInt(e.target.value) })} />
        </div>
        <div><label className="block text-gray-700 mb-1">Especialização</label>
          <select className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.specialization || ''} onChange={e => setCurrentItem({ ...currentItem, specialization: e.target.value })}>
            <option value="">Selecione...</option>
            <option value="Rinoplastia">Rinoplastia</option>
            <option value="Mamoplastia">Mamoplastia</option>
            <option value="Lipoaspiração">Lipoaspiração</option>
            <option value="Abdominoplastia">Abdominoplastia</option>
          </select>
        </div>
        <div><label className="block text-gray-700 mb-1">Link de Inscrição</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.link || ''} onChange={e => setCurrentItem({ ...currentItem, link: e.target.value })} />
        </div>
        <ImageUploadField value={currentItem.imageUrl} onChange={url => setCurrentItem({ ...currentItem, imageUrl: url })} />
        <div className="flex justify-end space-x-3 mt-6">
          <button type="button" onClick={() => { setIsEditing(false); setCurrentItem(null); setShowAddModal(false); }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">Cancelar</button>
          <button type="button" onClick={handleSave}
            className="px-4 py-2 bg-[#FF879B] text-white rounded-lg hover:bg-[#E5677F] cursor-pointer">Salvar</button>
        </div>
      </div>
    </div>
  );

  const renderClinicForm = () => (
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#1A1A1A]">{currentItem.id ? 'Editar Clínica' : 'Adicionar Nova Clínica'}</h3>
      <div className="space-y-4">
        <div><label className="block text-gray-700 mb-1">Nome</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.name || ''} onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })} />
        </div>
        <div><label className="block text-gray-700 mb-1">Especialidade</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.specialty || ''} onChange={e => setCurrentItem({ ...currentItem, specialty: e.target.value })} />
        </div>
        <div><label className="block text-gray-700 mb-1">Endereço</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.address || ''} onChange={e => setCurrentItem({ ...currentItem, address: e.target.value })} />
        </div>
        <ImageUploadField value={currentItem.imageUrl} onChange={url => setCurrentItem({ ...currentItem, imageUrl: url })} />
        <div><label className="block text-gray-700 mb-1">Link do WhatsApp</label>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-lg"
            value={currentItem.whatsappLink || ''} onChange={e => setCurrentItem({ ...currentItem, whatsappLink: e.target.value })} />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button type="button" onClick={() => { setIsEditing(false); setCurrentItem(null); setShowAddModal(false); }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 cursor-pointer">Cancelar</button>
          <button type="button" onClick={handleSave}
            className="px-4 py-2 bg-[#FF879B] text-white rounded-lg hover:bg-[#E5677F] cursor-pointer">Salvar</button>
        </div>
      </div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.reload();
  };

  //Lógica para bloquear acesso direto na ROTA:
  const location = useLocation();
  // Verifica se veio da tela de login com autenticação
  const authenticated = location.state?.authenticated;

  if (!authenticated) {
    return <Navigate to="/Login" />; // Bloqueia acesso direto
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="bg-white py-6 border-b border-gray-200 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Painel de Administração</h1>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF879B] focus:border-transparent"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
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
        {loading ? (
          <div className="text-center py-10">
            <p className="text-gray-500">Carregando dados...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
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
                        <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
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
                                <button onClick={() => handleEdit(item)}
                                  className="p-2 text-gray-500 hover:text-[#FF879B] transition-colors cursor-pointer"><Edit2 size={18} /></button>
                                <button onClick={() => handleDelete(item.id)}
                                  className="p-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"><Trash2 size={18} /></button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className="p-8 text-center text-gray-500">Nenhum item encontrado</div>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}
      </div>
      {(isEditing || showAddModal) && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => { setIsEditing(false); setShowAddModal(false); setCurrentItem(null); }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 cursor-pointer"
              aria-label="Fechar modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            {activeTab === 'cursoslista' ? renderCourseForm() : renderClinicForm()}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
  