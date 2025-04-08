import React from 'react';
import Cursos from '../pages/cursos';
import Footer from '../components/Footer';
import Navbar from '../components/navbar';
import Banner from '../components/banner';
import Service from '../components/services';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Service></Service>
      <Footer />
      
    </>
  );
}

export default App;
