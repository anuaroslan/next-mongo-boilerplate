import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as originalUseDispatch,
  useSelector as originalUseSelector,
} from "react-redux";
import user from "./slices/user";

const reducer = combineReducers({
  user,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => originalUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = originalUseSelector;
