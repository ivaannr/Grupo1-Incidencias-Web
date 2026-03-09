import React from 'react';

function Form({ agregarIncidencia }) {
    const enviarFormulario = (event) => {
        event.preventDefault();
        const { titulo, usuario, descripcion, categoria, urgencia, ubicacion } = event.target;
        const data = {
            titulo: titulo.value,
            usuario: usuario.value,
            descripcion: descripcion.value,
            categoria: categoria.value,
            urgencia: urgencia.value.charAt(0).toUpperCase() + urgencia.value.slice(1),
            ubicacion: ubicacion.value,
        };
        if (agregarIncidencia) {
            agregarIncidencia(data);
        }
        event.target.reset();
    };

    return (
        <div className="card p-4 shadow-sm">
            <h2 className="card-title mb-4 text-center">Registrar Incidencia</h2>
            <form onSubmit={enviarFormulario}>
                <div className="elemento-form">
                    <label className="mb-3 form-label">Titulo incidencia:</label>
                    <input className="mb-3 form-control" type="text" name="titulo" id="titulo" placeholder='Introduce titulo incidencia' required />
                </div>
                <div className="elemento-form">
                    <label className="mb-3 form-label">Email:</label>
                    <input className="mb-3 form-control" type="email" name="usuario" id="usuario" required />
                </div>
                <div className="elemento-form">
                    <label className="mb-3 form-label">Descripción:</label> 
                    <textarea className="mb-3 form-control" name="descripcion" id="descripcion" required />
                </div>
                <div className="elemento-form">
                    <label className="mb-3 form-label">Categoría:</label>
                    <select className="mb-3 form-control" name="categoria" id="categoria" required>
                        <option value="Hardware">Hardware</option>
                        <option value="Software">Software</option>
                        <option value="Conectividad">Conectividad</option>
                        <option value="Usuarios">Usuarios</option>
                        <option value="Infraestructura">Infraestructura</option>
                    </select>
                </div>
                <div className="elemento-form">
                    <label className="mb-3 form-label">Urgencia:</label>
                    <select className="mb-3 form-control" name="urgencia" id="urgencia" required>
                        <option value="alta">Alta</option>
                        <option value="media">Media</option>
                        <option value="baja">Baja</option>
                    </select>
                </div>
                <div className="elemento-form">
                    <label className="mb-3 form-label">Ubicación:</label>
                    <input className="mb-3 form-control" type="text" name="ubicacion" id="ubicacion" required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
}

export default Form;