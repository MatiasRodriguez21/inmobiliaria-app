import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header.jsx';
import Home from './components/Home.jsx';
import Properties from './components/Properties.jsx';
import Footer from './components/Footer.jsx';
import PropertyDetail from './components/PropertyDetail.jsx';

function App() {
  const propiedades = [
    {
      id: 1,
      titulo: 'Departamento en el centro',
      descripcion: 'Departamento moderno con 2 habitaciones y 1 baño.',
      precio: 120000,
      imagen: '/imagenes/propiedad1.jpg',
      imagenes: [
        '/imagenes/prop1-1.jpg',
        '/imagenes/prop1-2.jpg',
        
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
      imagen: '/imagenes/propiedad2.jpg',
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
      imagen: '/imagenes/propiedad3.jpg',
      imagenes: [
        '/imagenes/monoambiente3.jpg',
        '/imagenes/monoambiente4.jpg'
      ],
      tipo: 'monoambiente',
      ubicacion: [36.7213, -4.4214], // Málaga
      ubicacionTexto: 'Málaga',
      tamano: 40,
      caracteristicas: 'Monoambiente, 1 baño, cerca de la playa'
    },
    {
      id: 4,
      titulo: 'Casa de Lujo con Piscina',
      descripcion: 'Espectacular casa con piscina, jardín y vista panorámica.',
      precio: 450000,
      imagen: '/imagenes/propiedad1.jpg',
      imagenes: [
        '/imagenes/casa1.jpg',
        '/imagenes/prop1-1.jpg'
      ],
      tipo: 'casa',
      ubicacion: [40.4215, -3.6923], // Madrid Este
      ubicacionTexto: 'Madrid Este',
      tamano: 280,
      caracteristicas: '5 habitaciones, 4 baños, piscina, jardín, garaje'
    }
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home propiedades={propiedades} />} />
            <Route path="/propiedades/comprar" element={<Properties propiedades={propiedades} />} />
            <Route path="/property/:id" element={<PropertyDetail propiedades={propiedades} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
