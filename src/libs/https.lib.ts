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

// Function to refresh tokens
const refreshTokens = async () => {
  const { tokens, setTokens, logout } = useAuthStore.getState()

  if (!tokens?.refreshToken) {
    logout()
    throw new Error("No refresh token available")
  }

  try {
    const response = await axios.post(`${baseURI}${apiRoutes.REFRESH_TOKEN}`, {
      refreshToken: tokens.refreshToken,
    })

    if (response.status === 200) {
      const { accessToken, refreshToken, sessionId } = response.data.success
      setTokens({ accessToken, refreshToken, sessionId })
      return accessToken
    } else {
      logout()
      throw new Error("Failed to refresh token")
    }
  } catch (error) {
    console.error("Error refreshing tokens:", error)
    logout()
    throw error
  }
}

// Response interceptor to handle token refresh
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(apiRoutes.SIGN_IN)
    ) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshTokens()
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return http(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

// Function to sign out
export const signOut = async (): Promise<void> => {
  try {
    const { tokens, logout } = useAuthStore.getState()
    console.log("Attempting to sign out with token:", tokens?.accessToken)

    const response = await http.post(apiRoutes.SIGN_OUT)
    console.log("Logout API response:", response)

    if (response.status === 200) {
      logout() 
      localStorage.removeItem("accessToken")
      localStorage.removeItem("refreshToken")
    } else {
      throw new Error("Logout failed.")
    }
  } catch (error: any) {
    console.error("Sign out error:", error)
    throw new Error("Logout failed. Please try again.")
  }
}
