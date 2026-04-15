import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, status, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ nombre: "", email: "", password: "" });

  if (isAuthenticated) {
    return <Navigate to="/panel" replace />;
  }

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (form.password.length < 6) {
      return;
    }

    const action = await dispatch(registerUser(form));
    if (registerUser.fulfilled.match(action)) {
      navigate("/panel");
    }
  };

  return (
    <div className="centered-page">
      <section className="panel-card form-card">
        <h2>Registro</h2>
        <p className="muted">Tu cuenta se crea con rol comun por defecto.</p>

        <form onSubmit={onSubmit} className="form-grid">
          <label>
            Nombre
            <input type="text" name="nombre" value={form.nombre} onChange={onChange} required />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={onChange} required />
          </label>
          <label>
            Password
            <input type="password" name="password" value={form.password} onChange={onChange} required />
          </label>

          {form.password && form.password.length < 6 && (
            <p className="error-text">La contraseña debe tener al menos 6 caracteres.</p>
          )}
          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="btn" disabled={status === "loading" || form.password.length < 6}>
            {status === "loading" ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>

        <p className="muted inline-cta">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesion</Link>.
        </p>
      </section>
    </div>
  );
}

export default RegisterPage;
