const user = JSON.parse(localStorage.getItem("user"));

const welcome = document.getElementById("welcome");
welcome.innerText = "Bienvenido " + user.email;

if (user.rol.nombre_rol === "admin") {
  document.getElementById("adminBtn").style.display = "inline-block";
}

document.getElementById("loginFormDashboard").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("emailDash").value;
  const password = document.getElementById("passwordDash").value;

  const usuarioEncontrado = API_DATA.users.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (!usuarioEncontrado) {
    alert("Credenciales incorrectas");
    return;
  }

  localStorage.setItem("user", JSON.stringify(usuarioEncontrado));
  location.reload();
});

function mostrarIncidencias(filtro = {}) {
  const contenido = document.getElementById("contenido");
  contenido.classList.add("full-width");

  let filas = "";

  API_DATA.incidencias.forEach(function (i) {
    let cumpleEstado = true;
    let cumpleUrgencia = true;
    let cumpleUsuario = true;

    if (filtro.estado) {
      cumpleEstado = i.estado === filtro.estado;
    }

    if (filtro.urgencia) {
      cumpleUrgencia = i.nivel_urgencia === filtro.urgencia;
    }

    if (filtro.usuario) {
      cumpleUsuario = i.usuario.email.includes(filtro.usuario);
    }

    if (cumpleEstado && cumpleUrgencia && cumpleUsuario) {
      let accionAdmin = "";

      if (user.rol.nombre_rol === "admin") {
        if (i.estado !== "Cerrada") {
          accionAdmin = `<td><button class="cerrar-btn" onclick="cerrarIncidencia(${i.id})">Cerrar</button></td>`;
        } else {
          accionAdmin = `<td>—</td>`;
        }
      }

      filas += `
        <tr>
          <td style="cursor:pointer;color:blue;" onclick="verDetalleIncidencia(${i.id})">${i.titulo}</td>
          <td>${i.usuario.email}</td>
          <td>${i.ubicacion}</td>
          <td>${i.fecha_registro}</td>
          <td>${i.nivel_urgencia}</td>
          <td>${i.estado}</td>
          ${accionAdmin}
        </tr>
      `;
    }
  });

  contenido.innerHTML = `
    <h2>Listado de incidencias</h2>
    <div style="margin-bottom:15px;">
      <select id="filtroEstado">
        <option value="">Filtrar por estado</option>
        <option>Abierta</option>
        <option>En curso</option>
        <option>Cerrada</option>
      </select>
      <select id="filtroUrgencia">
        <option value="">Filtrar por urgencia</option>
        <option>Baja</option>
        <option>Media</option>
        <option>Alta</option>
      </select>
      <input id="filtroUsuario" placeholder="Filtrar por usuario/email">
      <button onclick="aplicarFiltros()">Aplicar filtros</button>
    </div>
    <table>
      <tr>
        <th>Título</th>
        <th>Usuario</th>
        <th>Ubicación</th>
        <th>Fecha registro</th>
        <th>Urgencia</th>
        <th>Estado</th>
        ${user.rol.nombre_rol === "admin" ? "<th>Acción</th>" : ""}
      </tr>
      ${filas}
    </table>
  `;
}

function aplicarFiltros() {
  const estado = document.getElementById("filtroEstado").value;
  const urgencia = document.getElementById("filtroUrgencia").value;
  const usuario = document.getElementById("filtroUsuario").value;

  mostrarIncidencias({
    estado: estado,
    urgencia: urgencia,
    usuario: usuario
  });
}

function verDetalleIncidencia(id) {
  const incidencia = API_DATA.incidencias.find(function (i) {
    return i.id === id;
  });

  const esAdmin = user.rol.nombre_rol === "admin";
  const esPropietario = user.email === incidencia.usuario.email;

  const contenido = document.getElementById("contenido");
  contenido.classList.add("full-width");

  let formularioEdicion = "";

  if (esAdmin || esPropietario) {
    formularioEdicion = `
      <div class="modificar-incidencia-container">
        <h3>Modificar incidencia</h3>

        <label>Título</label>
        <input id="editTitulo" value="${incidencia.titulo}">

        <label>Descripción</label>
        <textarea id="editDescripcion">${incidencia.descripcion}</textarea>

        <label>Ubicación</label>
        <input id="editUbicacion" value="${incidencia.ubicacion}">

        <label>Urgencia</label>
        <select id="editUrgencia">
          <option ${incidencia.nivel_urgencia === "Baja" ? "selected" : ""}>Baja</option>
          <option ${incidencia.nivel_urgencia === "Media" ? "selected" : ""}>Media</option>
          <option ${incidencia.nivel_urgencia === "Alta" ? "selected" : ""}>Alta</option>
        </select>

        <button onclick="guardarModificacion(${incidencia.id})">Guardar cambios</button>
      </div>
    `;
  }

  let comentariosHtml = "";
  incidencia.comentarios.forEach(function (c) {
    comentariosHtml += `<p><b>${c.usuario.email} (${c.fecha}):</b> ${c.texto}</p>`;
  });

  contenido.innerHTML = `
    <h2>Detalle de Incidencia: ${incidencia.titulo}</h2>

    <p><b>Usuario:</b> ${incidencia.usuario.email}</p>
    <p><b>Ubicación:</b> ${incidencia.ubicacion}</p>
    <p><b>Fecha registro:</b> ${incidencia.fecha_registro}</p>
    <p><b>Urgencia:</b> ${incidencia.nivel_urgencia}</p>
    <p><b>Estado:</b> ${incidencia.estado}</p>
    <p><b>Descripción:</b> ${incidencia.descripcion}</p>

    ${formularioEdicion}

    <h3>Comentarios</h3>
    <div>${comentariosHtml}</div>

    <textarea id="nuevoComentario" placeholder="Escribe un comentario"></textarea>
    <button onclick="agregarComentario(${incidencia.id})">Agregar comentario</button>

    <br><br>
    <button onclick="mostrarIncidencias()">Volver al listado</button>
  `;
}

function agregarComentario(id) {
  const texto = document.getElementById("nuevoComentario").value.trim();
  if (!texto) {
    alert("Comentario vacío");
    return;
  }

  const incidencia = API_DATA.incidencias.find(i => i.id === id);

  incidencia.comentarios.push({
    usuario: user,
    texto: texto,
    fecha: new Date().toLocaleString()
  });

  verDetalleIncidencia(id);
}

function guardarModificacion(id) {
  const incidencia = API_DATA.incidencias.find(i => i.id === id);

  incidencia.titulo = document.getElementById("editTitulo").value;
  incidencia.descripcion = document.getElementById("editDescripcion").value;
  incidencia.ubicacion = document.getElementById("editUbicacion").value;
  incidencia.nivel_urgencia = document.getElementById("editUrgencia").value;

  alert("Incidencia modificada correctamente");
  verDetalleIncidencia(id);
}

function cerrarIncidencia(id) {
  const incidencia = API_DATA.incidencias.find(i => i.id === id);
  incidencia.estado = "Cerrada";
  alert("Incidencia cerrada correctamente");
  mostrarIncidencias();
}

function mostrarFormularioIncidencia() {
  const contenido = document.getElementById("contenido");
  contenido.classList.add("full-width");

  contenido.innerHTML = `
    <h2>Registrar incidencia</h2>
    <form id="incidenciaForm">
      <input id="titulo" placeholder="Título" required>
      <textarea id="descripcion" placeholder="Descripción" required></textarea>
      <input id="ubicacion" placeholder="Ubicación" required>
      <select id="urgencia" required>
        <option value="">Urgencia</option>
        <option>Baja</option>
        <option>Media</option>
        <option>Alta</option>
      </select>
      <button>Registrar</button>
    </form>
  `;

  document.getElementById("incidenciaForm").addEventListener("submit", registrarIncidencia);
}

function registrarIncidencia(e) {
  e.preventDefault();

  API_DATA.incidencias.push({
    id: API_DATA.incidencias.length + 1,
    usuario: user,
    titulo: titulo.value,
    descripcion: descripcion.value,
    ubicacion: ubicacion.value,
    nivel_urgencia: urgencia.value,
    estado: "Abierta",
    fecha_registro: new Date().toLocaleDateString(),
    comentarios: []
  });

  alert("Incidencia registrada correctamente");
  mostrarIncidencias();
}

function mostrarGestionUsuarios() {
  const contenido = document.getElementById("contenido");
  contenido.classList.remove("full-width");

  let filas = "";

  API_DATA.users.forEach(function (u) {
    filas += `
      <tr>
        <td>${u.email}</td>
        <td>${u.rol.nombre_rol}</td>
        <td><button onclick="cambiarRol(${u.id})">Cambiar</button></td>
      </tr>
    `;
  });

  contenido.innerHTML = `
    <h2>Gestión de usuarios / roles</h2>
    <div class="gestion-container">
      <table>
        <tr>
          <th>Usuario</th>
          <th>Rol</th>
          <th>Cambio rol</th>
        </tr>
        ${filas}
      </table>

      <h3>Agregar usuario</h3>
      <form id="userForm">
        <input id="nombre" placeholder="Nombre" required>
        <input id="apellido" placeholder="Apellido" required>
        <input id="email" type="email" placeholder="Email" required>
        <input id="password" type="password" placeholder="Contraseña" required>
        <select id="rol" required>
          <option value="">Seleccionar rol</option>
          <option value="comun">Común</option>
          <option value="admin">Admin</option>
        </select>
        <button>Registrar</button>
      </form>
    </div>
  `;

  document.getElementById("userForm").addEventListener("submit", registrarUsuario);
}

function cambiarRol(id) {
  const usuario = API_DATA.users.find(u => u.id === id);
  usuario.rol.nombre_rol = usuario.rol.nombre_rol === "ADMIN" ? "COMUN" : "ADMIN";
  mostrarGestionUsuarios();
}

function registrarUsuario(e) {
  e.preventDefault();

  API_DATA.users.push({
    id: API_DATA.users.length + 1,
    email: email.value,
    nombre: nombre.value + " " + apellido.value,
    password: password.value,
    rol: { nombre_rol: rol.value }
  });

  alert("Usuario registrado");
  mostrarGestionUsuarios();
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
