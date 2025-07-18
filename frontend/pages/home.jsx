import React from 'react';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Service from '../components/Services';
import Publicoalvo from '../components/publicoAlvo';
import Navbar from '../components/navbar';
import Quemsomos from '../components/quemsomos';

function Home() {
  return (
    <div>
      <div className='pl-10 pt-12'>
        <Banner />
      </div>
      <div className='mt-80 sm:mt-30'>
        <Service />
      </div>
      <div className=''>
        <Publicoalvo></Publicoalvo>
      </div>
      <div>
        <Quemsomos />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
