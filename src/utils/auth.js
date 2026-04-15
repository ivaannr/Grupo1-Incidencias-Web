export function isAdmin(user) {
  const normalized = normalizeSessionUser(user);
  return normalized?.rol?.nombre_rol === "admin";
}

export function canEditIncident(user, incident) {
  const normalizedUser = normalizeSessionUser(user);
  if (!normalizedUser || !incident) {
    return false;
  }

  if (isAdmin(normalizedUser)) {
    return true;
  }

  const ownerId = extractUserId(incident.usuario);
  return ownerId === normalizedUser.id;
}

export function normalizeSessionUser(user) {
  if (!user) {
    return null;
  }

  if (user.user && typeof user.user === "object") {
    return user.user;
  }

  return user;
}

export function normalizeIncidentUser(user) {
  const normalized = normalizeSessionUser(user);

  if (!normalized) {
    return null;
  }

  return {
    id: normalized.id,
    nombre: normalized.nombre,
    email: normalized.email,
    rol: normalized.rol,
    fecha_registro: normalized.fecha_registro
  };
}

export function extractUserId(userField) {
  if (userField == null) {
    return null;
  }

  if (typeof userField === "number") {
    return userField;
  }

  if (typeof userField === "object") {
    if (typeof userField.id === "number") {
      return userField.id;
    }

    if (userField.user && typeof userField.user.id === "number") {
      return userField.user.id;
    }
  }

  return null;
}

export function getIncidentOwnerLabel(userField) {
  if (userField == null) {
    return "Sin asignar";
  }

  if (typeof userField === "number") {
    return `Usuario ${userField}`;
  }

  if (typeof userField === "object") {
    if (userField.nombre) {
      return userField.nombre;
    }

    if (userField.user?.nombre) {
      return userField.user.nombre;
    }
  }

  return "Sin asignar";
}

export function serializeSessionUser(user) {
  return JSON.stringify(user);
}

export function deserializeSessionUser(rawValue) {
  try {
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}
