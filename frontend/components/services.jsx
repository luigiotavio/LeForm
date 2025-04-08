import { useState } from 'react'
import icon1 from "../src/assets/icon1.png"

function Services() {
  return (
    <div className="w-screen bg-[#F36775]">
      <div>
        <h2 className='text-bold'>Serviços</h2>
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
            <div className='border-b-2 border-gray-400 mb-12'></div>
          </div>
        </div>
        
        

        

      </div>
    </div>
  )
}

export default Services
