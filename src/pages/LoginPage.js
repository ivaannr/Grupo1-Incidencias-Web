import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  if (isAuthenticated) {
    return <Navigate to="/panel" replace />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const action = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(action)) {
      navigate("/panel");
    }
  };

  return (
    <div className="centered-page">
      <section className="panel-card form-card">
        <h2>Iniciar sesion</h2>
        <p className="muted">Accede con tu correo institucional.</p>
        <form onSubmit={onSubmit} className="form-grid">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="nombre@educastur.org"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              placeholder="Tu contraseña"
              required
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn" disabled={status === "loading"}>
            {status === "loading" ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <p className="muted inline-cta">
          Si no tienes cuenta, <Link to="/registro">registrate aqui</Link>.
        </p>
      </section>
    </div>
  );
}

export default LoginPage;
