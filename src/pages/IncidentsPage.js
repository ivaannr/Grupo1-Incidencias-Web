import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteIncidentAction, fetchIncidents } from "../store/slices/incidentsSlice";
import { getIncidentOwnerLabel, isAdmin } from "../utils/auth";

function IncidentsPage() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.incidents);
  const { currentUser } = useSelector((state) => state.auth);
  const [sortBy, setSortBy] = useState("newest");
  const [query, setQuery] = useState("");
  const canDelete = isAdmin(currentUser);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIncidents());
    }
  }, [dispatch, status]);

  const displayedItems = useMemo(() => {
    const urgencyWeight = {
      Alta: 3,
      Media: 2,
      Baja: 1
    };

    const filtered = items.filter((incident) => {
      const text = `${incident.titulo || ""} ${incident.descripcion || ""} ${incident.ubicacion || ""}`.toLowerCase();
      return text.includes(query.toLowerCase());
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return String(b.fecha_registro || "").localeCompare(String(a.fecha_registro || ""));
      }

      if (sortBy === "oldest") {
        return String(a.fecha_registro || "").localeCompare(String(b.fecha_registro || ""));
      }

      if (sortBy === "urgency") {
        return (urgencyWeight[b.nivel_urgencia] || 0) - (urgencyWeight[a.nivel_urgencia] || 0);
      }

      if (sortBy === "status") {
        return String(a.estado || "").localeCompare(String(b.estado || ""));
      }

      return 0;
    });

    return sorted;
  }, [items, query, sortBy]);

  const onDeleteIncident = async (incident) => {
    const confirmed = window.confirm(`¿Eliminar la incidencia "${incident.titulo}"?`);
    if (!confirmed) {
      return;
    }

    const action = await dispatch(deleteIncidentAction(incident.id));
    if (!deleteIncidentAction.fulfilled.match(action)) {
      window.alert(action.payload || "No se pudo eliminar la incidencia.");
    }
  };

  return (
    <section className="panel-card">
      <div className="row-between">
        <h1>Incidencias</h1>
        <Link className="btn" to="/incidencias/nueva">
          Nueva incidencia
        </Link>
      </div>

      <div className="toolbar-row">
        <label>
          Buscar
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Titulo, descripcion o ubicacion"
          />
        </label>

        <label>
          Ordenar por
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="newest">Mas nuevas</option>
            <option value="oldest">Mas antiguas</option>
            <option value="urgency">Mayor urgencia</option>
            <option value="status">Estado</option>
          </select>
        </label>
      </div>

      {status === "loading" && <p className="muted">Cargando incidencias...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Usuario</th>
              <th>Categoria</th>
              <th>Urgencia</th>
              <th>Estado</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.map((incident) => {
              const ownerName = getIncidentOwnerLabel(incident.usuario);

              return (
                <tr key={incident.id}>
                  <td>{incident.titulo}</td>
                  <td>{ownerName}</td>
                  <td>{incident.categoria}</td>
                  <td>{incident.nivel_urgencia}</td>
                  <td>{incident.estado}</td>
                  <td>
                    <div className="table-actions">
                      <Link className="link-inline" to={`/incidencias/${incident.id}`}>
                        Ver detalle
                      </Link>
                      {canDelete && (
                        <button
                          type="button"
                          className="btn btn-danger btn-small"
                          onClick={() => onDeleteIncident(incident)}
                        >
                          Borrar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {displayedItems.length === 0 && status === "succeeded" && (
              <tr>
                <td colSpan="6" className="empty-cell">
                  No hay incidencias registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default IncidentsPage;
