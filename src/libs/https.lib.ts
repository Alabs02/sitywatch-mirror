import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  HeadersDefaults,
} from "axios"
import Cookies from "js-cookie"
import { useAuthStore } from "@/store"
import { apiRoutes, baseURI } from "@/constants/apiRoutes"

class HttpService {
  private http: AxiosInstance

  constructor(baseURL: string = baseURI) {
    this.http = axios.create({
      baseURL,
      withCredentials: true, // Enable credentials for cross-origin requests
      headers: {
        common: {
          "Content-Type": "application/json",
          ...this.getAuthorization(),
        },
      } as HeadersDefaults,
    })

    this.http.interceptors.response.use(
      (response) => response,
      this.handleResponseError.bind(this),
    )
  }

  public service(
    hasAttachment: boolean = false,
    customHeaders: Record<string, string> = {},
  ) {
    this.http.defaults.headers.common = this.setupHeaders(
      hasAttachment,
      customHeaders,
    )
    return this
  }

  private setupHeaders(
    hasAttachment = false,
    customHeaders: Record<string, string> = {},
  ): Record<string, string> {
    const headers: Record<string, string> = hasAttachment
      ? {
          "Content-Type": "multipart/form-data",
          ...this.getAuthorization(),
          ...customHeaders,
        }
      : {
          "Content-Type": "application/json",
          ...this.getAuthorization(),
          ...customHeaders,
        }

    console.log("Setting up headers:", headers)
    return Object.fromEntries(
      Object.entries(headers).filter(([, value]) => value !== undefined),
    )
  }

  private getAuthorization(): Record<string, string> {
    const token = Cookies.get("ACCESS_TOKEN")
    console.log("Retrieved access token:", token) // Debugging log
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  private async handleResponseError(error: AxiosError): Promise<any> {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        console.log("Attempting token refresh after 401 error") // Debugging log
        const newAccessToken = await refreshTokens()
        originalRequest.headers = originalRequest.headers || {}
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`
        return this.http(originalRequest)
      } catch (err) {
        console.error("Token refresh failed, logging out") // Debugging log
        useAuthStore.getState().logout()
        return Promise.reject(err)
      }
    }
    console.error("Request failed with error:", error) // Debugging log
    return Promise.reject(error)
  }

  public get<T>(
    url: string,
    params?: object,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    console.log(`GET request to ${url} with params`, params) // Debugging log
    return this.http.get<T>(url, { ...options, params })
  }

  public post<T>(
    url: string,
    data?: object,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    console.log(`POST request to ${url} with data`, data) // Debugging log
    return this.http.post<T>(url, data, options)
  }

  public put<T>(
    url: string,
    data?: object,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    console.log(`PUT request to ${url} with data`, data) // Debugging log
    return this.http.put<T>(url, data, options)
  }

  public delete<T>(
    url: string,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    console.log(`DELETE request to ${url}`) // Debugging log
    return this.http.delete<T>(url, options)
  }
}

export const http = new HttpService()

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

      // Setting new access token in cookies with SameSite=None; Secure
      Cookies.set("ACCESS_TOKEN", accessToken, {
        sameSite: "None",
        secure: true,
      })
      Cookies.set("REFRESH_TOKEN", refreshToken, {
        sameSite: "None",
        secure: true,
      })
      Cookies.set("SESSION_ID", sessionId, {
        sameSite: "None",
        secure: true,
      })

      return accessToken
    } else {
      console.error("Failed to refresh token, logging out")
      logout()
      throw new Error("Failed to refresh token")
    }
  } catch (error) {
    console.error("Error refreshing tokens:", error)
    logout()
    throw error
  }
}
