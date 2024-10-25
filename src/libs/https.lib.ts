import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from "axios"
import { useAuthStore } from "@/store"
import Cookies from "js-cookie"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"

// Create an Axios instance
export const http = axios.create({
  baseURL: baseURI,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor to add the access token to each request
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { tokens } = useAuthStore.getState()
    if (tokens?.accessToken) {
      config.headers["Authorization"] = `Bearer ${tokens.accessToken}`
    }
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// Function to refresh tokens
const refreshTokens = async (): Promise<string> => {
  const { tokens, setTokens, logout } = useAuthStore.getState()

  if (!tokens?.refreshToken) {
    console.error("No refresh token available")
    logout()
    throw new Error("No refresh token available")
  }

  console.log("Refreshing tokens with:", {
    refreshToken: tokens.refreshToken,
    sessionId: tokens.sessionId,
  })

  try {
    const response = await axios.post(`${baseURI}${apiRoutes.REFRESH_TOKEN}`, {
      refreshToken: tokens.refreshToken,
      sessionId: tokens.sessionId,
    })

    console.log("Refresh tokens response:", response)

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
