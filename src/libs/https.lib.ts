import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosHeaders,
} from "axios"
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
  (config: InternalAxiosRequestConfig) => {
    const { tokens } = useAuthStore.getState()
    if (tokens?.accessToken && config.headers) {
      // Use the set method on headers to avoid type mismatch
      ;(config.headers as AxiosHeaders).set(
        "Authorization",
        `Bearer ${tokens.accessToken}`,
      )
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// Function to refresh tokens
// src/libs/https.lib.ts
const refreshTokens = async (): Promise<string> => {
  const { tokens, setTokens, logout } = useAuthStore.getState()

  if (!tokens?.refreshToken) {
    console.error("No refresh token available");
    logout();
    throw new Error("No refresh token available");
  }

  console.log("Refreshing tokens with:", {
    refreshToken: tokens.refreshToken,
    sessionId: tokens.sessionId,
  });

  try {
    const response = await axios.post(`${baseURI}${apiRoutes.REFRESH_TOKEN}`, {
      refreshToken: tokens.refreshToken,
      sessionId: tokens.sessionId,
    });

    console.log("Refresh tokens response:", response);

    if (response.status === 200) {
      const { accessToken, refreshToken, sessionId } = response.data.success;
      setTokens({ accessToken, refreshToken, sessionId });
      return accessToken;
    } else {
      logout();
      throw new Error("Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing tokens:",);
    logout();
    throw error;
  }
};


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
        if (originalRequest.headers) {
          // Use the set method on headers
          ;(originalRequest.headers as AxiosHeaders).set(
            "Authorization",
            `Bearer ${newAccessToken}`,
          )
        }
        return http(originalRequest)
      } catch (refreshError) {
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

// Sign out function
export const signOut = async (): Promise<any> => {
  try {
    const response = await axios.post(
      `${baseURI}${apiRoutes.SIGN_OUT}`,
      {},
      {
        withCredentials: true, // if you are handling cookies or session credentials
      },
    )
    return response.data
  } catch (error) {
    console.error("Error during sign out:", error)
    throw error
  }
}
