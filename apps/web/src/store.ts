import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from "./features/tasks/api";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
