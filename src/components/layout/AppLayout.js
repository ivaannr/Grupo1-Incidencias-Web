import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/authSlice";
import { isAdmin } from "../../utils/auth";

function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  const closeSession = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-group">
          <Link className="brand brand-with-icon" to="/panel">
            <img src="/img/n1circle.png" alt="Icono numero 1" className="brand-icon" />
            <span>Centro de Incidencias</span>
          </Link>
          <p className="muted">Gestion interna de soporte tecnico</p>
        </div>
        <div className="topbar-right">
          <div className="user-chip">
            <span>{currentUser?.nombre}</span>
            <small>{currentUser?.rol?.nombre_rol || "comun"}</small>
          </div>
          <button className="btn btn-ghost" type="button" onClick={closeSession}>
            Cerrar sesion
          </button>
        </div>
      </header>

      <nav className="nav-tabs-shell">
        <NavLink className="nav-tab" to="/panel" end>
          Panel
        </NavLink>
        <NavLink className="nav-tab" to="/incidencias" end>
          Ver incidencias
        </NavLink>
        <NavLink className="nav-tab" to="/incidencias/nueva">
          Registrar incidencia
        </NavLink>
        {isAdmin(currentUser) && (
          <NavLink className="nav-tab" to="/usuarios">
            Ver usuarios
          </NavLink>
        )}
      </nav>

      <main className="content-area">
        <Outlet />
      </main>

      <footer className="main-footer">
        <img src="/img/n1circle.png" alt="Logo numero 1" className="footer-icon" />
        <p>Grupo 1 · Sistema de incidencias</p>
      </footer>
    </div>
  );
}

export default AppLayout;
