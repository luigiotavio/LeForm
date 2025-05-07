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
      <Navbar></Navbar>
      <div className='pl-10'>
        <Banner />
      </div>
      <div className='!mt-30 sm:mt-10'>
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
