import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Footer from './components/Footer.jsx';
import PropertyDetail from './components/PropertyDetail.jsx';

// Componente principal que muestra una lista de propiedades inmobiliarias
function App() {
  // Lista de propiedades de ejemplo (hardcoded) con imágenes múltiples y ubicación para el carrusel y mapa
  const propiedades = [
    {
      id: 1,
      titulo: 'Departamento en el centro',
      descripcion: 'Departamento moderno con 2 habitaciones y 1 baño.',
      precio: 120000,
      imagen: '/imagenes/departamento1.jpg',
      imagenes: [
        '/imagenes/departamento1.jpg',
        '/imagenes/departamento1_2.jpg',
        '/imagenes/departamento1_3.jpg'
      ],
      tipo: 'departamento',
      ubicacion: [40.4168, -3.7038], // Madrid
      ubicacionTexto: 'Centro de Madrid',
      tamano: 85,
      caracteristicas: '2 habitaciones, 1 baño, balcón'
    },
    {
      id: 2,
      titulo: 'Casa con jardín',
      descripcion: 'Casa amplia con jardín y garaje para 2 autos.',
      precio: 250000,
      imagen: '/imagenes/casa2.jpg',
      imagenes: [
        '/imagenes/casa2.jpg',
        '/imagenes/casa2_2.jpg'
      ],
      tipo: 'casa',
      ubicacion: [40.4381, -3.8196], // Pozuelo de Alarcón
      ubicacionTexto: 'Pozuelo de Alarcón',
      tamano: 120,
      caracteristicas: '3 habitaciones, 2 baños, jardín'
    },
    {
      id: 3,
      titulo: 'Monoambiente cerca de la playa',
      descripcion: 'Monoambiente ideal para vacaciones, a 200 metros de la playa.',
      precio: 90000,
      imagen: '/imagenes/monoambiente3.jpg',
      imagenes: [
        '/imagenes/monoambiente3.jpg',
        '/imagenes/monoambiente4.jpg'
      ],
      tipo: 'monoambiente',
      ubicacion: [36.7213, -4.4214], // Málaga
      ubicacionTexto: 'Málaga',
      tamano: 40,
      caracteristicas: 'Monoambiente, 1 baño, cerca de la playa'
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
