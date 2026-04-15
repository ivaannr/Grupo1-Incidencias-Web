import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncidents, updateIncidentAction } from "../store/slices/incidentsSlice";
import { canEditIncident, getIncidentOwnerLabel } from "../utils/auth";

function IncidentDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { items, status } = useSelector((state) => state.incidents);

  const incident = useMemo(
    () => items.find((candidate) => String(candidate.id) === String(id)),
    [items, id]
  );

  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIncidents());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (incident) {
      setForm({
        titulo: incident.titulo,
        descripcion: incident.descripcion,
        categoria: incident.categoria,
        nivel_urgencia: incident.nivel_urgencia,
        estado: incident.estado,
        ubicacion: incident.ubicacion
      });
    }
  }, [incident]);

  if (status === "loading" && !incident) {
    return <section className="panel-card">Cargando incidencia...</section>;
  }

  if (!incident) {
    return (
      <section className="panel-card">
        <h2>Incidencia no encontrada</h2>
        <Link className="link-inline" to="/incidencias">
          Volver al listado
        </Link>
      </section>
    );
  }

  const editable = canEditIncident(currentUser, incident);
  const ownerName = getIncidentOwnerLabel(incident.usuario);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSave = async (event) => {
    event.preventDefault();
    setMessage("");

    const action = await dispatch(
      updateIncidentAction({
        incidentId: incident.id,
        payload: {
          ...form
        }
      })
    );

    if (updateIncidentAction.fulfilled.match(action)) {
      setMessage("Cambios guardados correctamente.");
      return;
    }

    setMessage(action.payload || "No se pudieron guardar los cambios.");
  };

  return (
    <section className="panel-card form-card">
      <div className="row-between">
        <h1>Detalle de incidencia #{incident.id}</h1>
        <Link className="link-inline" to="/incidencias">
          Volver
        </Link>
      </div>

      <p className="muted">Reportada por: {ownerName || "Sin asignar"}</p>

      <form className="form-grid" onSubmit={onSave}>
        <label>
          Titulo
          <input type="text" name="titulo" value={form?.titulo || ""} onChange={onChange} disabled={!editable} />
        </label>

        <label>
          Descripcion
          <textarea
            name="descripcion"
            rows="4"
            value={form?.descripcion || ""}
            onChange={onChange}
            disabled={!editable}
          />
        </label>

        <label>
          Categoria
          <select name="categoria" value={form?.categoria || "Hardware"} onChange={onChange} disabled={!editable}>
            <option value="Hardware">Hardware</option>
            <option value="Software">Software</option>
            <option value="Conectividad">Conectividad</option>
            <option value="Infraestructura">Infraestructura</option>
            <option value="Usuarios">Usuarios</option>
          </select>
        </label>

        <label>
          Nivel urgencia
          <select
            name="nivel_urgencia"
            value={form?.nivel_urgencia || "Media"}
            onChange={onChange}
            disabled={!editable}
          >
            <option value="Baja">Baja</option>
            <option value="Media">Media</option>
            <option value="Alta">Alta</option>
          </select>
        </label>

        <label>
          Estado
          <select name="estado" value={form?.estado || "Pendiente"} onChange={onChange} disabled={!editable}>
            <option value="Pendiente">Pendiente</option>
            <option value="En Curso">En Curso</option>
            <option value="Cerrada">Cerrada</option>
          </select>
        </label>

        <label>
          Ubicacion
          <input type="text" name="ubicacion" value={form?.ubicacion || ""} onChange={onChange} disabled={!editable} />
        </label>

        {!editable && (
          <p className="muted">Solo el administrador o el propietario de la incidencia pueden editarla.</p>
        )}

        {message && <p className={message.includes("correctamente") ? "success-text" : "error-text"}>{message}</p>}

        {editable && (
          <button type="submit" className="btn">
            Guardar cambios
          </button>
        )}
      </form>
    </section>
  );
}

export default IncidentDetailPage;
