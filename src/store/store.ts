import { configureStore } from "@reduxjs/toolkit"
import navlinksReducer from "./navlinksReducer"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"

const store = configureStore({
  reducer: navlinksReducer,
})

// Define types for Redux store state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Create typed hooks to use with useSelector and useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
