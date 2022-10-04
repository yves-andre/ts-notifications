import { configureStore } from "@reduxjs/toolkit";
import filtersSlice from "./filters-slice";
import notificationSlice from "./notifications-slice";

const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
    filters: filtersSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
