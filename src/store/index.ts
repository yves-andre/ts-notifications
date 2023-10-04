import { configureStore, Middleware, PayloadAction } from "@reduxjs/toolkit";
import applicationsSlice from "./applications-slice";
import filtersSlice from "./filters-slice";
import notificationSlice, { notificationActions } from "./notifications-slice";

const forceUpdateMiddleware: Middleware = storeAPI => next => action => {
  const result = next(action);
  const UPDATE_FREQUENCY_IN_MINUTES = 2;

  if (!(storeAPI as any).forceUpdateInterval) {
      (storeAPI as any).forceUpdateInterval = setInterval(() => {
          storeAPI.dispatch(notificationActions.forceUpdate());
      }, 1000 * 60 * UPDATE_FREQUENCY_IN_MINUTES); // 2 minutes
  }

  return result;
};

const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
    filters: filtersSlice.reducer,
    applications: applicationsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(forceUpdateMiddleware)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
