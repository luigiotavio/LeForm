import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../src/assets/logo.png"
import mulher from "../src/assets/mulher2.png"

function Banner() {
  const navigate = useNavigate();

  return (
<div id="home" className="flex flex-col sm:flex-row w-full">
  
  <div className="items-start sm:w-1/2 md:mt-10">

    <div>
      <img src={logo} alt="Logo" />
    </div>

    <div className="max-w-lg mt-10">
      <h1 className="!text-2xl sm:text-3xl lg:text-4xl font-light pr-10">
        Excelência, segurança e resultados naturais em <span className="font-bold text-[#FD919C]">cirurgia plástica.</span>
      </h1>
    </div>
    <div className="pr-10 py-8 max-w-md text-xl">
      <p>
        Referência na <span className="font-bold">realização</span> de cirurgias
        plásticas e <span className="font-bold">cursos avançados</span> para
        profissionais que desejam se especializar.
      </p>
    </div>
    <div className="flex flex-col items-start md:flex-row gap-4">
      <button onClick={() => navigate('/Cursos')} className="!bg-[#FD919C] text-white !border-[#FD919C] border-2 text-[#FD919C] px-11 py-2 rounded hover:scale-105 transition-transform">
        Quero ser parceiro
      </button>
      <button onClick={() => navigate('/Clinicas')} className="!bg-transparent !border-[#FD919C] border-2 text-[#FD919C] px-10 py-2 rounded hover:scale-105 transition-transform">
        Quero ser paciente
      </button>
    </div>
  </div>
  <div className="sm:w-1/2 flex justify-end mt-8 sm:mt-0 relative">
    <img
      src={mulher}
      className="w-full max-w-xs sm:max-w-md lg:max-w-lg object-contain absolute right-0 top-0 z-10"
      alt="Mulher"
    />
  </div>
</div>

  )
}

export default Banner
