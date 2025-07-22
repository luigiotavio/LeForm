import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const pathname = location.pathname;
  const isClinicasPage = location.pathname === '/Clinicas';
  const isEmpresas = pathname === '/Cursos'; 

  return (
    <nav className="fixed top-0 w-full bg-white flex items-center justify-between py-4 z-50 shadow-sm">
      <div className="hidden md:flex bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md gap-x-4 mx-auto justify-center">
        {isClinicasPage ? (
          <>
          <a href="/#" onClick={() => setActiveLink('Home')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Home' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Home</a>

        <a href="/Clinicas" onClick={() => setActiveLink('Clinicas')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Clinicas' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Clinicas</a>

        <a href="/Cursos" onClick={() => setActiveLink('Curso')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Curso' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Para empresas</a>
          </>
        ) : isEmpresas ? (
          <>
          <a href="/#" onClick={() => setActiveLink('Home')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Home' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Home</a>

        <a href="/Clinicas" onClick={() => setActiveLink('Curso')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Clinicas' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Clinicas</a>

        <a href="/Cursos" onClick={() => setActiveLink('Curso')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Curso' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Para empresas</a>
          </>
        ) : (
          <>
        <a href="/#" onClick={() => setActiveLink('Home')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Home' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Home</a>

        <a href="/#serviços" onClick={() => setActiveLink('Serviço')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Serviço' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Serviços</a>

        <a href="/#publico" onClick={() => setActiveLink('Publico')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Publico' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Público</a>

        <a href="/#quemsomos"onClick={() => setActiveLink('Quem')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Quem' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Quem somos</a>

        <a href="/Clinicas" onClick={() => setActiveLink('Clinicas')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Clinicas' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Clínicas</a>

        <a href="/Cursos" onClick={() => setActiveLink('Cursos')} className={`px-6 py-1 font-semibold rounded-full transition-all duration-300 
              ${activeLink === 'Cursos' ? 'bg-[#FD919C] text-white scale-110' : '!text-black hover:!text-[#FD919C] hover:scale-110'}
            `}>Para empresas</a>
        </>
            )}
          </div>
      

      <button 
        className="md:hidden text-pink-400 text-2xl" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu />
      </button>

    {menuOpen && (
      <div className="absolute top-16 bg-white shadow-lg rounded-lg p-4 flex flex-col items-start">
        {isClinicasPage ? (
          <>
            <a href="/" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-pink-500 font-semibold bg-pink-100 rounded-lg w-full text-center">Home</a>
            <a href="/Clinicas" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Clínicas</a>
            <a href="/Cursos" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Para empresas</a>
          </>
        ) : isEmpresas ? (
          <>
            <a href="/" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-pink-500 font-semibold bg-pink-100 rounded-lg w-full text-center">Home</a>
            <a href="/Cursos" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Para empresas</a>
            <a href="/Clinicas" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Clínicas</a>
          </>
        ) : (
          <>
            <a href="/" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-pink-500 font-semibold bg-pink-100 rounded-lg w-full text-center">Home</a>
            <a href="/#serviços" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Serviços</a>
            <a href="/#publico" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Público</a>
            <a href="/#quemsomos" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Quem somos</a>
            <a href="/Clinicas" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Clínicas</a>
            <a href="/Cursos" onClick={() => setMenuOpen(false)} className="px-4 py-2 text-gray-600 hover:text-pink-500">Para empresas</a>
          </>
        )}
      </div>
    )}

    </nav>
  )
}

export default Navbar
