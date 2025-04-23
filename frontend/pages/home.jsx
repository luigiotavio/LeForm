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
      <Service />
      <Footer />
    </div>
  );
}

export default Home;
