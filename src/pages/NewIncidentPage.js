import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createIncidentAction } from "../store/slices/incidentsSlice";
import { normalizeIncidentUser } from "../utils/auth";

function NewIncidentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "Hardware",
    nivel_urgencia: "Media",
    estado: "Pendiente",
    ubicacion: ""
  });
  const [error, setError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const owner = normalizeIncidentUser(currentUser);
    if (!owner) {
      setError("No hay usuario activo. Cierra sesion e inicia de nuevo.");
      return;
    }

    const payload = {
      ...form,
      usuario: owner,
      fecha_registro: new Date().toISOString().slice(0, 10),
      comentarios: []
    };

    const action = await dispatch(createIncidentAction(payload));
    if (createIncidentAction.fulfilled.match(action)) {
      navigate("/incidencias");
      return;
    }

    setError(action.payload || "No se pudo guardar la incidencia.");
  };

  return (
    <section className="panel-card form-card">
      <h1>Registrar incidencia</h1>
      <p className="muted">La incidencia quedara asociada al usuario logeado.</p>

      <form className="form-grid" onSubmit={onSubmit}>
        <label>
          Titulo
          <input type="text" name="titulo" value={form.titulo} onChange={onChange} required />
        </label>

        <label>
          Descripcion
          <textarea name="descripcion" rows="4" value={form.descripcion} onChange={onChange} required />
        </label>

        <label>
          Categoria
          <select name="categoria" value={form.categoria} onChange={onChange}>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Conectividad">Conectividad</option>
            <option value="Infraestructura">Infraestructura</option>
            <option value="Usuarios">Usuarios</option>
          </select>
        </label>

        <label>
          Nivel urgencia
          <select name="nivel_urgencia" value={form.nivel_urgencia} onChange={onChange}>
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </label>

        <label>
          Estado
          <select name="estado" value={form.estado} onChange={onChange}>
            <option value="Pendiente">Pendiente</option>
            <option value="En Curso">En Curso</option>
            <option value="Cerrada">Cerrada</option>
          </select>
        </label>

        <label>
          Ubicacion
          <input type="text" name="ubicacion" value={form.ubicacion} onChange={onChange} required />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button className="btn" type="submit">
          Guardar incidencia
        </button>
      </form>
    </section>
  );
}

export default NewIncidentPage;
