import axios, { InternalAxiosRequestConfig } from "axios";
import { useLogin } from "../hooks/useLogin";
import { AUTH_TOKEN } from "../constants/query-client-constants";

const coreApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const onFulfilledRequest = (config: InternalAxiosRequestConfig) => {
  const { getAuthToken } = useLogin();
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const logoutInterceptor = (error: any) => {
  if (window.location.pathname === "/login") {
    return Promise.reject(error);
  }

  if (error.response?.status === 401) {
    localStorage.removeItem(AUTH_TOKEN);
  }

  return Promise.reject(error);
};

coreApi.interceptors.request.use(onFulfilledRequest, (error) =>
  Promise.reject(error)
);

coreApi.interceptors.response.use((response) => response, logoutInterceptor);

export { coreApi };
