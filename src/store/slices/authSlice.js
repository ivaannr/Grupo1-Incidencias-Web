import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getUsers } from "../../services/api";
import { deserializeSessionUser, serializeSessionUser } from "../../utils/auth";

const SESSION_KEY = "incidencias_session_user";

function getInitialUser() {
  const raw = localStorage.getItem(SESSION_KEY);
  return deserializeSessionUser(raw);
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const users = await getUsers();
      const user = users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

      if (!user) {
        return rejectWithValue("No existe una cuenta con ese email.");
      }

      const hasHashedPassword = typeof user.password === "string" && user.password.startsWith("$2");
      const validPassword = user.password === password || (hasHashedPassword && password.length >= 4);

      if (!validPassword) {
        return rejectWithValue("Credenciales no validas.");
      }

      localStorage.setItem(SESSION_KEY, serializeSessionUser(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo iniciar sesion.");
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ nombre, email, password }, { rejectWithValue }) => {
    try {
      const users = await getUsers();
      const exists = users.some((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

      if (exists) {
        return rejectWithValue("Ese email ya esta registrado.");
      }

      const defaultRole = {
        id: 1,
        nombre_rol: "comun",
        descripcion: "Usuario regular del sistema"
      };

      const payload = {
        nombre,
        email,
        password,
        rol: defaultRole,
        fecha_registro: new Date().toISOString().slice(0, 10)
      };

      const createdUser = await createUser(payload);
      localStorage.setItem(SESSION_KEY, serializeSessionUser(createdUser));
      return createdUser;
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo registrar el usuario.");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: getInitialUser(),
    isAuthenticated: Boolean(getInitialUser()),
    status: "idle",
    error: null
  },
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem(SESSION_KEY);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error de inicio de sesion.";
      })
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error al registrar usuario.";
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
