import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin } from "../utils/auth";
import { getIncidentOwnerLabel } from "../utils/auth";
import { fetchIncidents } from "../store/slices/incidentsSlice";

function DashboardPage() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { items: incidents, status } = useSelector((state) => state.incidents);
  const showAdmin = isAdmin(currentUser);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchIncidents());
    }
  }, [dispatch, status]);

  const total = incidents.length;
  const pending = incidents.filter((incident) => incident.estado === "Pendiente").length;
  const inProgress = incidents.filter((incident) => incident.estado === "En Curso").length;

  const lastThree = [...incidents]
    .sort((a, b) => String(b.fecha_registro || "").localeCompare(String(a.fecha_registro || "")))
    .slice(0, 3);

  return (
    <section className="panel-card">
      <div className="row-between">
        <h1>Panel principal</h1>
        <img src="/img/n1circle.png" alt="Icono n1circle" className="panel-logo" />
      </div>
      <p className="muted">Selecciona una accion para continuar.</p>

      <div className="stats-grid">
        <article className="stat-card">
          <p className="muted">Incidencias totales</p>
          <h2>{total}</h2>
        </article>
        <article className="stat-card">
          <p className="muted">Pendientes</p>
          <h2>{pending}</h2>
        </article>
        <article className="stat-card">
          <p className="muted">En curso</p>
          <h2>{inProgress}</h2>
        </article>
      </div>

      <div className="grid-cards">
        <Link className="action-card" to="/incidencias">
          <h3>Ver incidencias</h3>
          <p>Consulta estado, urgencia y ubicacion de cada caso.</p>
        </Link>

        <Link className="action-card" to="/incidencias/nueva">
          <h3>Registrar incidencias</h3>
          <p>Abre una nueva incidencia y asigna prioridad.</p>
        </Link>

        {showAdmin && (
          <Link className="action-card" to="/usuarios">
            <h3>Ver usuarios</h3>
            <p>Gestiona altas y roles del sistema.</p>
          </Link>
        )}
      </div>

      <div className="recent-box">
        <div className="row-between">
          <h3>Actividad reciente</h3>
          <Link className="link-inline" to="/incidencias">
            Ir al listado completo
          </Link>
        </div>
        {lastThree.length === 0 && <p className="muted">Aun no hay incidencias registradas.</p>}
        {lastThree.map((incident) => (
          <article key={incident.id} className="recent-item">
            <strong>{incident.titulo}</strong>
            <span className="muted">
              {getIncidentOwnerLabel(incident.usuario)} · {incident.fecha_registro || "Sin fecha"}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
