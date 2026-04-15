import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, deleteUser, getRoles, getUsers, updateUser } from "../../services/api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    return await getUsers();
  } catch (error) {
    return rejectWithValue(error.message || "No se pudieron cargar los usuarios.");
  }
});

export const fetchRoles = createAsyncThunk("users/fetchRoles", async (_, { rejectWithValue }) => {
  try {
    return await getRoles();
  } catch (error) {
    return rejectWithValue(error.message || "No se pudieron cargar los roles.");
  }
});

export const createUserAction = createAsyncThunk(
  "users/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const users = await getUsers();
      const exists = users.some((candidate) => candidate.email.toLowerCase() === payload.email.toLowerCase());
      if (exists) {
        return rejectWithValue("Ya existe un usuario con ese email.");
      }
      return await createUser(payload);
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo crear el usuario.");
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "users/updateUser",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      return await updateUser(userId, payload);
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo actualizar el usuario.");
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "users/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUser(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo eliminar el usuario.");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    items: [],
    roles: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error al cargar usuarios.";
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.roles = action.payload;
      })
      .addCase(createUserAction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        const index = state.items.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.items = state.items.filter((user) => user.id !== action.payload);
      });
  }
});

export default usersSlice.reducer;
