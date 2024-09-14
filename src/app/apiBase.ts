import { fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { RootState } from "../app/store" 

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://sitywatch-backend.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("Authorization", `Bearer ${token}`)
    }
    return headers
  },
})

