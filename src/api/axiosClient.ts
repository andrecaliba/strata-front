import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const axiosClient: AxiosInstance = (() => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
})();

// Request Interceptor - Attach Auth Token
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Error Handling
axiosClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<any> => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        window.location.href = "/";
      }
    }
    
    // Extract serializable error data to avoid cloning issues
    const errorData = error.response?.data as AxiosError;
    const serializableError = {
      message: errorData?.message || error.message || 'An error occurred',
      status: error.response?.status,
      data: errorData,
    };
    
    return Promise.reject(serializableError);
  }
);

export default axiosClient;
