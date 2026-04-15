import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import incidentsReducer from "./slices/incidentsSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    incidents: incidentsReducer,
    users: usersReducer
  }
});
