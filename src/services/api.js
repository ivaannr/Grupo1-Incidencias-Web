const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3004";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Error ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getUsers() {
  return request("/users");
}

export function getRoles() {
  return request("/roles");
}

export function createUser(payload) {
  return request("/users", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateUser(userId, payload) {
  return request(`/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

export function deleteUser(userId) {
  return request(`/users/${userId}`, {
    method: "DELETE"
  });
}

export function getIncidents() {
  return request("/incidencias");
}

export function createIncident(payload) {
  return request("/incidencias", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function updateIncident(incidentId, payload) {
  return request(`/incidencias/${incidentId}`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });
}

export function deleteIncident(incidentId) {
  return request(`/incidencias/${incidentId}`, {
    method: "DELETE"
  });
}

export { API_BASE_URL };
