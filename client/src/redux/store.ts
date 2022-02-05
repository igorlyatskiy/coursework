import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./index";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: () => customizedMiddleware,
});