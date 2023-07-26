import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/global/globalSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
  },
});
