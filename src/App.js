import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Properties from './components/Properties.jsx';
import Footer from './components/Footer.jsx';
import PropertyDetail from './components/PropertyDetail.jsx';
import Nosotros from './components/Nosotros.jsx';
import Servicios from './components/Servicios.jsx';
import Contacto from './components/Contacto.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        <Header />
        <main className="flex-grow relative pt-[72px] md:pt-[80px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/propiedades/comprar" element={<Properties />} />
            <Route path="/propiedades/alquilar" element={<Properties isRental />} />
            <Route path="/property/:id" element={<PropertyDetail />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
