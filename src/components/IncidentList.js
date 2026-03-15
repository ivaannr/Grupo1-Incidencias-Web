import React from 'react';

function IncidentList({ incidencias, usuarios = [] }) {
  const resolveUsuario = (usuarioField) => {
    if (usuarioField == null) return '';
    if (typeof usuarioField === 'object') {
      const nombre = usuarioField?.nombre ?? 'Usuario';
      const email = usuarioField?.email ?? '';
      return email ? `${nombre} (${email})` : nombre;
    }
    const found = usuarios.find((u) => u.id === usuarioField);
    if (found) {
      const nombre = found.nombre ?? 'Usuario';
      const email = found.email ?? '';
      return email ? `${nombre} (${email})` : nombre;
    }
    return usuarioField;
  };
  return (
    <div className="container mt-3 bg-light p-3 rounded">
      <h3 className="text-primary">Lista de Incidencias</h3>
      <ul>
        {incidencias && incidencias.length > 0 ? (
          incidencias.map((i) => (
            <li key={i.id} className="mb-4 pb-2 border-bottom">
              <span className="text-primary"><strong>Título: </strong>{i.titulo}</span><br />
              <span className="mb-1 text-muted"><strong>Descripción: </strong>{i.descripcion}</span><br />
              <span className="mb-0">
                <strong>Usuario: </strong>
                {resolveUsuario(i.usuario)}
              </span><br />
              <span className="mb-0"><strong>Categoría: </strong>{i.categoria}</span><br />
              <span className="mb-0"><strong>Urgencia: </strong>{i.nivel_urgencia}</span><br />
              <span className="mb-0"><strong>Estado: </strong>{i.estado}</span><br />
              <span className="mb-0"><strong>Ubicación: </strong>{i.ubicacion}</span><br />
              <span className="mb-0"><strong>Fecha: </strong>{i.fecha_registro}</span>
            </li>
          ))
        ) : (
          <li>No hay incidencias registradas.</li>
        )}
      </ul>
    </div>
  );
}

export default IncidentList;