import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import IncidentList from './components/IncidentList';

function App() {
  const INCIDENCIA_API_URL = 'https://organic-engine-jjv556vrgwx7cpqjg-3004.app.github.dev/incidencias';
  const USUARIOS_API_URL = 'https://organic-engine-jjv556vrgwx7cpqjg-3004.app.github.dev/users';

  const [usuarios, setUsuarios] = useState([]);
  const [incidencias, setIncidencias] = useState([]);

  useEffect(() => {
    const obtenerIncidencias = async () => {
      try {
        let response = await fetch(INCIDENCIA_API_URL);
        if(response.ok){
          let data = await response.json();
          console.log(data);
          setIncidencias(data);
        }
      } catch(e){
        console.error("Error al cargar las incidencias:", e);
      }
    }

    const obtenerUsuarios = async () => {
      try {
        let response = await fetch(USUARIOS_API_URL);
        if(response.ok){
          let data = await response.json();
          console.log(data);
          setUsuarios(data);
        }
      } catch(e){
        console.error("Error al cargar las incidencias:", e);
      }
    }

    obtenerIncidencias();
    obtenerUsuarios();
  }, []);

  const agregarIncidencia = async ({titulo, usuario, descripcion, categoria, urgencia, ubicacion}) => {
    try{
      const usuarioEncontrado = usuarios.find((u) => u.email === usuario);
      if(!usuarioEncontrado){
        alert(`El email "${usuario}" no existe en el sistema.`);
        throw new Error("Usuario no encontrado");
      }

      const nueva_incidencia = {
        usuario: usuarioEncontrado,
        titulo,
        descripcion,
        categoria,
        nivel_urgencia: urgencia,
        fecha_registro: new Date().toISOString().slice(0, 10),
        ubicacion,
        estado: "Abierta",
        comentarios: []
      };

      let response = await fetch(INCIDENCIA_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nueva_incidencia)
      });

      if(!response.ok){
        throw new Error(`Fallo POST ${response.status}`);
      }

      let data = await response.json();
      console.log("nueva_incidencia: ", data);
      setIncidencias([...incidencias, data]);
    } catch(e){
      console.error("Fallo petición POST", e.message);
      alert("No se pudo crear incidencia. ");
    }
  };

  return (
    <div className="card" style={{ backgroundImage: `url('/img/fondo.png')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
      <Header />

      <div className="container">
        <h2 className="mb-4 text-center">Mi aplicación</h2>
      </div>
      <div id="contenedor-incidencias" className="container-fluid mt-4 row">
        <main className="col-md-6">
          <IncidentList incidencias={incidencias} />
        </main>
        <aside className="col-md-6">
          <Form agregarIncidencia={agregarIncidencia} />
        </aside>
      </div>
      <Footer />
    </div>
  );
}

export default App;