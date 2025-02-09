import { configureStore } from "@reduxjs/toolkit";
import webInfoReducer from "./slices/webInfo";

export const store = configureStore({
  reducer: {
    webInfo: webInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
