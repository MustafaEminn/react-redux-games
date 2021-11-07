import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebar";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
