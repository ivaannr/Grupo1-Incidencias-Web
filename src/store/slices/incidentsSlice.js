import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createIncident, deleteIncident, getIncidents, updateIncident } from "../../services/api";
import { normalizeIncidentUser } from "../../utils/auth";

export const fetchIncidents = createAsyncThunk("incidents/fetchIncidents", async (_, { rejectWithValue }) => {
  try {
    return await getIncidents();
  } catch (error) {
    return rejectWithValue(error.message || "No se pudieron cargar las incidencias.");
  }
});

export const createIncidentAction = createAsyncThunk(
  "incidents/createIncident",
  async (payload, { rejectWithValue }) => {
    try {
      const normalizedPayload = {
        ...payload,
        usuario: normalizeIncidentUser(payload.usuario)
      };

      if (!normalizedPayload.usuario) {
        return rejectWithValue("No se pudo determinar el usuario de la incidencia.");
      }

      return await createIncident(normalizedPayload);
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo crear la incidencia.");
    }
  }
);

export const updateIncidentAction = createAsyncThunk(
  "incidents/updateIncident",
  async ({ incidentId, payload }, { rejectWithValue }) => {
    try {
      return await updateIncident(incidentId, payload);
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo actualizar la incidencia.");
    }
  }
);

export const deleteIncidentAction = createAsyncThunk(
  "incidents/deleteIncident",
  async (incidentId, { rejectWithValue }) => {
    try {
      await deleteIncident(incidentId);
      return incidentId;
    } catch (error) {
      return rejectWithValue(error.message || "No se pudo eliminar la incidencia.");
    }
  }
);

const incidentsSlice = createSlice({
  name: "incidents",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIncidents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Error al cargar incidencias.";
      })
      .addCase(createIncidentAction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateIncidentAction.fulfilled, (state, action) => {
        const index = state.items.findIndex((incident) => incident.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteIncidentAction.fulfilled, (state, action) => {
        state.items = state.items.filter((incident) => incident.id !== action.payload);
      });
  }
});

export default incidentsSlice.reducer;
