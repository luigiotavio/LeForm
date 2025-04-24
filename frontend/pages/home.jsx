import React from 'react';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Service from '../components/Services';
import Navbar from '../components/navbar';

function Home() {
  return (
    <div>
      <div className='px-10'>
        <Banner />
      </div>
      <div className='-mt-10 sm:-mt-14 md:-mt-20 lg:-mt-24 xl:-mt-28'>
        <Service />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
