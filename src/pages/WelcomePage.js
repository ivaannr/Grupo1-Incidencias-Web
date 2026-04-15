import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function WelcomePage() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/panel" replace />;
  }

  return (
    <div className="welcome-page">
      <section className="welcome-card">
        <img src="/img/n1circle.png" alt="Icono numero 1" className="welcome-logo" />
        <p className="eyebrow">SISTEMA INTERNO</p>
        <h1>Gestion de incidencias del centro</h1>
        <p>
          Registra problemas, prioriza tareas y coordina soporte tecnico con trazabilidad completa.
        </p>

        <div className="actions-row">
          <Link className="btn" to="/login">
            Iniciar sesion
          </Link>
          <Link className="btn btn-ghost" to="/registro">
            Crear cuenta
          </Link>
        </div>
      </section>
    </div>
  );
}

export default WelcomePage;
