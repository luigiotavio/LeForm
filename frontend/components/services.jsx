import { useState } from 'react'
import icon1 from "../src/assets/icon1.png"
import card from "../src/assets/card.png"


function Services() {
  return (
    <div className="text-white py-10 pl-10 bg-[#F36775]">
      <div>
        <h1 className='font-bold'>Serviços</h1>
      </div>

      <div className='mt-16'>

        <div className='flex items-start'>
          <img src={icon1} alt="Icone" className='mr-4 mt-4' />
          <div>
            <h2 className=' font-bolt mb-2'>Cirurgia Plástica Facial</h2>
            <p className='mb-16'>Harmonização e rejuvenescimento para realçar sua beleza natural.</p>
            <div className='border-b-2 border-gray-400 mb-12'></div>
          </div>
        </div>
        <div className='flex items-start'>
          <img src={icon1} alt="Icone" className='mr-4 mt-4' />
          <div>
            <h2 className='mb-2'>Cirurgia Plástica Facial</h2>
            <p className='mb-16'>Harmonização e rejuvenescimento para realçar sua beleza natural.</p>
            <div className='border-b-2 border-gray-400 mb-12'></div>
          </div>
        </div>
        <div className='flex items-start'>
          <img src={icon1} alt="Icone" className='mr-4 mt-4' />
          <div>
            <h2 className='mb-2'>Cirurgia Plástica Facial</h2>
            <p className='mb-16'>Harmonização e rejuvenescimento para realçar sua beleza natural.</p>
          </div>
        </div>

        
        <div className="sm:w-1/2 flex justify-end mt-8 sm:mt-0 relative top-12">
          <img src={card} alt="Card de serviços" className="w-full max-w-md sm:max-w-lg object-contain" />
        </div>
        
      </div>
    </div>
  )
}

export default Services
