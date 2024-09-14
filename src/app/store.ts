import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/authSlice"
import { authApi } from "@/features/auth/authApi"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

// Configure store with reducers and middleware
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

// Setup types for store, state, and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create custom hooks for useDispatch and useSelector
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
