import axios from 'axios';

// Base URLs for different services
const API_GATEWAY_URL = 'http://localhost:5000/api/v1';

/**
 * Creates a configured axios instance with interceptors
 * @param {string} baseURL - The base URL for the API
 * @returns {import('axios').AxiosInstance} Configured axios instance
 */
const createApiInstance = (baseURL) => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true
  });

  // Add request interceptor to include auth token
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Add response interceptor to handle errors
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create API instances
export const api = createApiInstance(API_GATEWAY_URL);
export const packageApi = createApiInstance('/api/v1/packages');
export const destinationApi = createApiInstance('/api/v1/destinations');

// Default export with all API instances
export default {
  api,
  packageApi,
  destinationApi
};
