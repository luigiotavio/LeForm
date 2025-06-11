import { useState } from 'react'
import icon1 from "../src/assets/icon1.png"
import icon2 from "../src/assets/guardian.svg"
import icon3 from "../src/assets/health_metrics.svg"
import card from "../src/assets/card.png"


function Services() {
  return (
    <div id="serviços" className="pr-10 md:pr-0 pt-100 text-white md:py-10 pl-12 bg-[#F36775]">
      <div>
        <h1 className='text-xl md:text-2xl font-bold'>Serviços</h1>
      </div>

      <div className='mt-16'>

        <div className='flex items-start'>
          <img src={icon1} alt="Icone" className='mr-4 mt-4' />
          <div>
            <h2 className='font-bolt mb-2 text-xl'>Cirurgia Plástica Facial</h2>
            <p className='mb-16 text-lg md:pr-0'>Harmonização e rejuvenescimento para realçar sua beleza natural.</p>
            <div className='border-b-2 border-white mb-12'></div>
          </div>
        </div>
        <div className='flex items-start'>
          <img src={icon2} alt="Icone" className='mr-4 mt-4' />
          <div>
            <h2 className='mb-2 text-xl'>Cirurgia Plástica Corporal</h2>
            <p className='mb-16 text-lg'>Esculpa seu corpo com procedimentos seguros e personalizados.</p>
            <div className='border-b-2 border-white mb-12'></div>
          </div>
        </div>
        <div className='flex items-start'>
          <img src={icon3} alt="Icone" className='mr-4 mt-4' />
          <div>
            <h2 className='mb-2 text-xl'>Tratamentos Estéticos Avançados</h2>
            <p className='mb-16 text-lg'>Tecnologias inovadoras para cuidar da sua pele e bem-estar.</p>
          </div>
        </div>

        
        {/* <div className="sm:w-1/2 flex justify-end mt-8 sm:mt-0 relative top-12">
          <img src={card} alt="Card de serviços" className="w-full max-w-md sm:max-w-lg object-contain" />
        </div> */}
        
      </div>
    </div>
  )
}

export default Services
