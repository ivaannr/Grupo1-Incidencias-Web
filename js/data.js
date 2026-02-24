const API_DATA = {
  incidencias: [
    {
      id: 1,
      usuario: {
        id: 1,
        nombre: "Ana",
        email: "ana.lopez@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 1, nombre_rol: "comun" },
        fecha_registro: "2025-10-21"
      },
      titulo: "No funciona la impresora",
      descripcion: "La impresora no responde al enviar trabajos desde las computadoras del laboratorio.",
      categoria: "Hardware",
      nivel_urgencia: "Media",
      estado: "Abierta",
      ubicacion: "A301",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 2,
      usuario: {
        id: 2,
        nombre: "Carlos",
        email: "carlos.perez@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 1, nombre_rol: "comun" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Error de conexion Wi-Fi",
      descripcion: "Varios estudiantes reportan que no pueden conectarse a la red Wi-Fi.",
      categoria: "Conectividad",
      nivel_urgencia: "Alta",
      estado: "Abierta",
      ubicacion: "A302",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 3,
      usuario: {
        id: 3,
        nombre: "Maria",
        email: "maria.garcia@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 1, nombre_rol: "comun" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Proyector del aula magna no enciende",
      descripcion: "El proyector no muestra imagen al conectarlo a cualquier computadora.",
      categoria: "Hardware",
      nivel_urgencia: "Alta",
      estado: "Abierta",
      ubicacion: "A301",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 4,
      usuario: {
        id: 4,
        nombre: "Luis",
        email: "luis.torres@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 1, nombre_rol: "comun" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Computadora con pantalla azul",
      descripcion: "Una computadora muestra BSOD constantemente al iniciar.",
      categoria: "Hardware",
      nivel_urgencia: "Alta",
      estado: "En Curso",
      ubicacion: "B104",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 5,
      usuario: {
        id: 5,
        nombre: "Sofia",
        email: "sofia.martinez@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 1, nombre_rol: "comun" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Software antivirus no actualizado",
      descripcion: "El antivirus en varias maquinas no se ha actualizado en las ultimas semanas.",
      categoria: "Software",
      nivel_urgencia: "Media",
      estado: "Abierta",
      ubicacion: "B104",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 6,
      usuario: {
        id: 6,
        nombre: "Jorge",
        email: "jorge.fernandez@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 1, nombre_rol: "comun" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Problemas con el sistema de asistencia",
      descripcion: "El software de control de asistencia no permite registrar nuevas entradas.",
      categoria: "Software",
      nivel_urgencia: "Alta",
      estado: "Abierta",
      ubicacion: "B105",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 7,
      usuario: {
        id: 7,
        nombre: "Elena",
        email: "elena.sanchez@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 1, nombre_rol: "comun" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Fallo en el servidor de archivos",
      descripcion: "Algunos archivos compartidos no se pueden abrir o guardar.",
      categoria: "Infraestructura",
      nivel_urgencia: "Alta",
      estado: "En Curso",
      ubicacion: "B205",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 8,
      usuario: {
        id: 8,
        nombre: "Miguel",
        email: "miguel.ramirez@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 1, nombre_rol: "comun" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Teclado y raton sin respuesta",
      descripcion: "Los perifericos de todas las computadoras del aula no responden.",
      categoria: "Hardware",
      nivel_urgencia: "Media",
      estado: "Cerrada",
      ubicacion: "A303",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 9,
      usuario: {
        id: 9,
        nombre: "Patricia",
        email: "patricia.gomez@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 2, nombre_rol: "admin" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Pantalla tactil falla",
      descripcion: "La pantalla tactil no registra los toques correctamente.",
      categoria: "Hardware",
      nivel_urgencia: "Baja",
      estado: "Cerrada",
      ubicacion: "B105",
      fecha_registro: "2025-10-21",
      comentarios: []
    },
    {
      id: 10,
      usuario: {
        id: 10,
        nombre: "David",
        email: "david.ruiz@educastur.org",
        password: "ENCRIPTADA",
        rol: { id: 2, nombre_rol: "admin" },
        fecha_registro: "2025-10-21"
      },
      titulo: "Correo institucional con errores de envio",
      descripcion: "Algunos usuarios no pueden enviar correos desde su cuenta del instituto.",
      categoria: "Software",
      nivel_urgencia: "Media",
      estado: "Resuelta",
      ubicacion: "B205",
      fecha_registro: "2025-10-21",
      comentarios: []
    }
  ],

  users: [
    { id: 1, nombre: "Ana", email: "ana.lopez@educastur.org", password: "ENCRIPTADA", rol: { id: 1, nombre_rol: "comun" } },
    { id: 2, nombre: "Carlos", email: "carlos.perez@educastur.org", password: "ENCRIPTADA", rol: { id: 1, nombre_rol: "comun" } },
    { id: 3, nombre: "Maria", email: "maria.garcia@educastur.org", password: "ENCRIPTADA", rol: { id: 1, nombre_rol: "comun" } },
    { id: 4, nombre: "Luis", email: "luis.torres@educastur.org", password: "ENCRIPTADA", rol: { id: 1, nombre_rol: "comun" } },
    { id: 5, nombre: "Sofia", email: "sofia.martinez@educastur.org", password: "ENCRIPTADA", rol: { id: 1, nombre_rol: "comun" } },
    { id: 6, nombre: "Jorge", email: "jorge.fernandez@educastur.org", password: "ENCRIPTADA", rol: { id: 1, nombre_rol: "comun" } },
    { id: 7, nombre: "Elena", email: "elena.sanchez@educastur.org", password: "ENCRIPTADA", rol: { id: 1, nombre_rol: "comun" } },
    { id: 8, nombre: "Miguel", email: "miguel.ramirez@educastur.org", password: "ENCRIPTADA", rol: { id: 1, nombre_rol: "comun" } },
    { id: 9, nombre: "Patricia", email: "patricia.gomez@educastur.org", password: "ENCRIPTADA", rol: { id: 2, nombre_rol: "admin" } },
    { id: 10, nombre: "David", email: "david.ruiz@educastur.org", password: "ENCRIPTADA", rol: { id: 2, nombre_rol: "admin" } }
  ],

  roles: [
    { id: 1, nombre_rol: "comun", descripcion: "Usuario regular del sistema" },
    { id: 2, nombre_rol: "admin", descripcion: "Administrador del sistema con permisos totales" }
  ],

  comentarios: []
};
