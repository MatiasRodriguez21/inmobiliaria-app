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
      ubicacion: [-34.6037, -58.3816], // Buenos Aires
      ubicacionTexto: 'Centro de Buenos Aires',
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
      ubicacion: [-31.4201, -64.1888], // Córdoba
      ubicacionTexto: 'Córdoba Capital',
      tamano: 120,
      caracteristicas: '3 habitaciones, 2 baños, jardín'
    },
    {
      id: 3,
      titulo: 'Monoambiente en zona céntrica',
      descripcion: 'Monoambiente ideal para inversión, cerca de zona comercial.',
      precio: 90000,
      imagen: '/imagenes/propiedad3.jpg',
      imagenes: [
        '/imagenes/monoambiente3.jpg',
        '/imagenes/monoambiente4.jpg'
      ],
      tipo: 'monoambiente',
      ubicacion: [-32.8908, -68.8272], // Mendoza
      ubicacionTexto: 'Mendoza Capital',
      tamano: 40,
      caracteristicas: 'Monoambiente, 1 baño, excelente ubicación'
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
      ubicacion: [-31.6187, -60.7012], // Santa Fe
      ubicacionTexto: 'Santa Fe Capital',
      tamano: 280,
      caracteristicas: '5 habitaciones, 4 baños, piscina, jardín, garaje'
    }
  ];

  const propiedadesAlquiler = [
    {
      id: 5,
      titulo: 'Departamento moderno para alquilar',
      descripcion: 'Hermoso departamento con vista a la ciudad, totalmente amueblado.',
      precio: 800,
      imagen: '/imagenes/propiedad1.jpg',
      imagenes: [
        '/imagenes/prop1-1.jpg',
        '/imagenes/prop1-2.jpg',
      ],
      tipo: 'departamento',
      ubicacion: [-34.6037, -58.3816],
      ubicacionTexto: 'Recoleta, Buenos Aires',
      tamano: 75,
      caracteristicas: '2 habitaciones, 1 baño, amueblado'
    },
    {
      id: 6,
      titulo: 'Casa familiar en alquiler',
      descripcion: 'Espaciosa casa con jardín, perfecta para familias.',
      precio: 1200,
      imagen: '/imagenes/propiedad2.jpg',
      imagenes: [
        '/imagenes/casa2.jpg',
        '/imagenes/casa2_2.jpg'
      ],
      tipo: 'casa',
      ubicacion: [-31.4201, -64.1888],
      ubicacionTexto: 'Barrio Jardín, Córdoba',
      tamano: 150,
      caracteristicas: '3 habitaciones, 2 baños, jardín, garage'
    },
    {
      id: 7,
      titulo: 'Monoambiente céntrico',
      descripcion: 'Acogedor monoambiente en pleno centro, ideal para estudiantes.',
      precio: 500,
      imagen: '/imagenes/propiedad3.jpg',
      imagenes: [
        '/imagenes/monoambiente3.jpg',
        '/imagenes/monoambiente4.jpg'
      ],
      tipo: 'monoambiente',
      ubicacion: [-32.8908, -68.8272],
      ubicacionTexto: 'Centro, Mendoza',
      tamano: 35,
      caracteristicas: 'Monoambiente, 1 baño, cocina integrada'
    }
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative">
        <Header />
        <main className="flex-grow relative pt-[72px] md:pt-[80px]">
          <Routes>
            <Route path="/" element={<Home propiedades={propiedades} />} />
            <Route path="/propiedades/comprar" element={<Properties propiedades={propiedades} />} />
            <Route path="/propiedades/alquilar" element={<Properties propiedades={propiedadesAlquiler} isRental={true} />} />
            <Route path="/property/:id" element={<PropertyDetail propiedades={[...propiedades, ...propiedadesAlquiler]} />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
