import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAction,
  deleteUserAction,
  fetchRoles,
  fetchUsers,
  updateUserAction
} from "../store/slices/usersSlice";

function UsersPage() {
  const dispatch = useDispatch();
  const { items, roles, status, error } = useSelector((state) => state.users);

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    rolId: "1"
  });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
    if (roles.length === 0) {
      dispatch(fetchRoles());
    }
  }, [dispatch, status, roles.length]);

  const roleMap = useMemo(() => {
    return roles.reduce((acc, role) => {
      acc[String(role.id)] = role;
      return acc;
    }, {});
  }, [roles]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onCreate = async (event) => {
    event.preventDefault();
    setNotice("");

    const selectedRole = roleMap[form.rolId] || {
      id: 1,
      nombre_rol: "comun",
      descripcion: "Usuario regular del sistema"
    };

    const payload = {
      nombre: form.nombre,
      email: form.email,
      password: form.password,
      rol: selectedRole,
      fecha_registro: new Date().toISOString().slice(0, 10)
    };

    const action = await dispatch(createUserAction(payload));
    if (createUserAction.fulfilled.match(action)) {
      setNotice("Usuario creado correctamente.");
      setForm({ nombre: "", email: "", password: "", rolId: "1" });
      return;
    }

    setNotice(action.payload || "No se pudo crear el usuario.");
  };

  const onRoleChange = async (userId, newRoleId) => {
    const selectedRole = roleMap[String(newRoleId)];
    if (!selectedRole) {
      return;
    }

    const action = await dispatch(
      updateUserAction({
        userId,
        payload: { rol: selectedRole }
      })
    );

    if (updateUserAction.fulfilled.match(action)) {
      setNotice("Rol actualizado correctamente.");
      return;
    }

    setNotice(action.payload || "No se pudo actualizar el rol.");
  };

  const onDeleteUser = async (user) => {
    const confirmed = window.confirm(`¿Eliminar el usuario "${user.nombre}"?`);
    if (!confirmed) {
      return;
    }

    const action = await dispatch(deleteUserAction(user.id));
    if (deleteUserAction.fulfilled.match(action)) {
      setNotice("Usuario eliminado correctamente.");
      return;
    }

    setNotice(action.payload || "No se pudo eliminar el usuario.");
  };

  return (
    <section className="panel-card">
      <h1>Gestion de usuarios</h1>
      <p className="muted">Solo administradores pueden crear usuarios y modificar roles.</p>

      <form className="form-grid compact" onSubmit={onCreate}>
        <h3>Crear usuario</h3>

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

        <label>
          Rol
          <select name="rolId" value={form.rolId} onChange={onChange}>
            {roles.map((role) => (
              <option value={role.id} key={role.id}>
                {role.nombre_rol}
              </option>
            ))}
          </select>
        </label>

        <button className="btn" type="submit">
          Crear usuario
        </button>
      </form>

      {notice && <p className={notice.includes("correctamente") ? "success-text" : "error-text"}>{notice}</p>}
      {error && <p className="error-text">{error}</p>}
      {status === "loading" && <p className="muted">Cargando usuarios...</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Actualizar rol</th>
              <th>Accion</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.rol?.nombre_rol || "comun"}</td>
                <td>
                  <select
                    value={String(user.rol?.id || 1)}
                    onChange={(event) => onRoleChange(user.id, event.target.value)}
                  >
                    {roles.map((role) => (
                      <option value={role.id} key={role.id}>
                        {role.nombre_rol}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button type="button" className="btn btn-danger btn-small" onClick={() => onDeleteUser(user)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && status === "succeeded" && (
              <tr>
                <td colSpan="6" className="empty-cell">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default UsersPage;
