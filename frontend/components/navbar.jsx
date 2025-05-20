import { useState } from 'react'
import { FiMenu } from 'react-icons/fi';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="top-0 w-full bg-white flex items-center justify-between py-10 z-50">
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md">
        <a href="#" className="px-6 py-1 !text-black font-semibold rounded-full transition-all duration-300 hover:bg-[#FD919C] hover:!text-white hover:scale-110 text-xs md:text-sm lg:text-base">Home</a>
        <a href="#" className="px-6 py-1 !text-black font-semibold rounded-full transition-all duration-300 hover:bg-[#FD919C] hover:!text-white hover:scale-110">Serviços</a>
        <a href="#" className="px-6 py-1 !text-black font-semibold rounded-full transition-all duration-300 hover:bg-[#FD919C] hover:!text-white hover:scale-110">Público</a>
        <a href="#" className="px-6 py-1 !text-black font-semibold rounded-full transition-all duration-300 hover:bg-[#FD919C] hover:!text-white hover:scale-110 whitespace-nowrap">Quem somos</a>
        <a href="#" className="px-6 py-1 !text-black font-semibold rounded-full transition-all duration-300 hover:bg-[#FD919C] hover:!text-white hover:scale-110 text-xs md:text-sm lg:text-base whitespace-nowrap">Clínicas</a>
        <a href="#" className="px-6 py-1 !text-black font-semibold rounded-full transition-all duration-300 hover:bg-[#FD919C] hover:!text-white hover:scale-110 text-xs md:text-sm lg:text-base whitespace-nowrap">Para empresas</a>
      </div>

      <button 
        className="md:hidden text-pink-400 text-2xl" 
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <FiMenu />
      </button>

      {/* Menu Dropdown Mobile */}
      {menuOpen && (
        <div className="absolute top-16 left-0 bg-white shadow-lg rounded-lg p-4 flex flex-col items-start">
          <a href="#" className="px-4 py-2 text-pink-500 font-semibold bg-pink-100 rounded-lg w-full text-center">Home</a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-pink-500">Serviços</a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-pink-500">Público</a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-pink-500">Quem somos</a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-pink-500">Clínicas</a>
          <a href="#" className="px-4 py-2 text-gray-600 hover:text-pink-500">Para empresas</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar
