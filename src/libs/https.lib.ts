// src/libs/https.lib.ts
import axios from "axios"
import { useAuthStore } from "@/store"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"

// Create an Axios instance
export const http = axios.create({
  baseURL: baseURI,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor to add the access token to headers
http.interceptors.request.use(
  (config) => {
    const { tokens } = useAuthStore.getState()
    if (tokens && tokens.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor to handle global errors (optional)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle specific status codes
    return Promise.reject(error)
  },
)

// Function to sign out
export const signOut = async (): Promise<void> => {
  try {
    const { tokens } = useAuthStore.getState()
    console.log("Attempting to sign out with token:", tokens?.accessToken)

    const response = await http.post(apiRoutes.SIGN_OUT)
    console.log("Logout API response:", response)

    if (response.status === 200) {
      useAuthStore.getState().logout() // Clear the store
    } else {
      throw new Error("Logout failed.")
    }
  } catch (error: any) {
    console.error("Sign out error:", error)
    throw new Error("Logout failed. Please try again.")
  }
}
