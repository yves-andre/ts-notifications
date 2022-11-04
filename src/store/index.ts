import { configureStore } from "@reduxjs/toolkit";
import applicationsSlice from "./applications-slice";
import filtersSlice from "./filters-slice";
import notificationSlice from "./notifications-slice";

const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
    filters: filtersSlice.reducer,
    applications: applicationsSlice.reducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
