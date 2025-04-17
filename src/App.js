import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import PropertyDetail from './components/PropertyDetail.jsx';

// Componente principal que muestra una lista de propiedades inmobiliarias
function App() {
  // Lista de propiedades de ejemplo (hardcoded)
  const propiedades = [
    {
      id: 1,
      titulo: 'Departamento en el centro',
      descripcion: 'Departamento moderno con 2 habitaciones y 1 baño.',
      precio: 120000,
      imagen: 'https://via.placeholder.com/300x200?text=Departamento+1',
      tipo: 'departamento'
    },
    {
      id: 2,
      titulo: 'Casa con jardín',
      descripcion: 'Casa amplia con jardín y garaje para 2 autos.',
      precio: 250000,
      imagen: 'https://via.placeholder.com/300x200?text=Casa+2',
      tipo: 'casa'
    },
    {
      id: 3,
      titulo: 'Monoambiente cerca de la playa',
      descripcion: 'Monoambiente ideal para vacaciones, a 200 metros de la playa.',
      precio: 90000,
      imagen: 'https://via.placeholder.com/300x200?text=Monoambiente+3',
      tipo: 'monoambiente'
    }
  ];

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home propiedades={propiedades} />} />
          <Route path="/property/:id" element={<PropertyDetail propiedades={propiedades} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
