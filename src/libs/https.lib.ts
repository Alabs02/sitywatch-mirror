import axios, {
  AxiosError,
  AxiosResponse,
  AxiosInstance,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store";
import { apiRoutes, baseURI } from "@/constants/apiRoutes";

class HttpService {
  private http: AxiosInstance;

  constructor(baseURL: string = baseURI) {
    // Create an Axios instance with default settings
    this.http = axios.create({
      baseURL,
      withCredentials: false,
      headers: new AxiosHeaders({
        "Content-Type": "application/json",
      }) as AxiosHeaders,
    });

    // Set up request interceptor for authentication
    this.http.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleError.bind(this)
    );

    // Set up response interceptor to refresh token on 401 error
    this.http.interceptors.response.use(
      response => response,
      this.handleResponseError.bind(this)
    );
  }

  service(hasAttachment: boolean = false, customHeaders: any = {}) {
    this.http.defaults.headers = this.setupHeaders(hasAttachment, customHeaders);
    return this;
  }

  private setupHeaders(hasAttachment = false, customHeaders: any = {}): any {
    return hasAttachment
      ? { "Content-Type": "multipart/form-data", ...this.getAuthorization, ...customHeaders }
      : { "Content-Type": "application/json", ...this.getAuthorization, ...customHeaders };
  }

  private get getAuthorization() {
    const { tokens } = useAuthStore.getState();
    return tokens ? { Authorization: `Bearer ${tokens.accessToken}` } : {};
  }

  private async handleRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> {
    const { tokens } = useAuthStore.getState();
    if (tokens?.accessToken) {
      // Create or cast headers as AxiosHeaders to ensure compatibility
      const headers = config.headers as AxiosHeaders;
      headers.set("Authorization", `Bearer ${tokens.accessToken}`);
    }
    return config;
  }

  private handleError(error: AxiosError): Promise<never> {
    return Promise.reject(error);
  }

  private async handleResponseError(error: AxiosError): Promise<any> {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshTokens();
        // Set new Authorization header using AxiosHeaders
        const headers = originalRequest.headers as AxiosHeaders;
        headers.set("Authorization", `Bearer ${newAccessToken}`);
        return this.http(originalRequest);
      } catch (err) {
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }

  // Method for GET requests
  public get<T>(url: string, params?: object, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.get<T>(url, { ...options, params });
  }

  // Method for POST requests
  public post<T>(url: string, data?: object, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.post<T>(url, data, options);
  }

  // Method for PUT requests
  public put<T>(url: string, data?: object, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.put<T>(url, data, options);
  }

  // Method for DELETE requests
  public delete<T>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.http.delete<T>(url, options);
  }
}

export const http = new HttpService();

// Function to refresh tokens
const refreshTokens = async (): Promise<string> => {
  const { tokens, setTokens, logout } = useAuthStore.getState();

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
    const response = await axios.post( `${baseURI}${apiRoutes.REFRESH_TOKEN}`, {
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
    console.error("Error refreshing tokens:", error);
    logout();
    throw error;
  }
};