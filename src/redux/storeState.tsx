import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./reducers/modalSlice";
import userReducer from "./reducers/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
