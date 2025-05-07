import { useState } from 'react'
import avatar1 from "../src/assets/avatar1.png"

function Publicoalvo() {
  return (
    <div className='bg-[#EF927F] px-10 py-14'>
      <div class="flex flex-col md:flex-row gap-10 bg-white rounded-xl shadow-md p-6 w-full max-w-5xl mx-auto border border-transparent">
        <div class="md:w-1/2 space-y-4">
          <h2 class="text-lg font-semibold text-red-500">Público-alvo</h2>
          <hr class="border-gray-300 w-24"/>
    
          <div class="bg-gray-100 p-4 rounded-md">
            Atendemos mulheres empoderadas que desejam valorizar sua beleza.
        </div>
        <div class="bg-gray-100 p-4 rounded-md">
            Contamos com mais de X pacientes satisfeitas com nosso cuidado e precisão.
        </div>
        <div class="bg-gray-100 p-4 rounded-md">
            Cada procedimento é planejado para elevar a autoestima e oferecer resultados confiáveis.
        </div>
        </div>
        <div class="md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <div class="bg-pink-100 p-6 rounded-lg">
            <img src={avatar1} alt="Avatar" className="!w-100 !h-100 !sm:w-40 sm:h-40 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain rounded-full" />
          </div>
          </div>
      </div>

</div>

    

  )
}

export default Publicoalvo
