import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get access token from localStorage
    const accessToken = localStorage.getItem('accessToken');

    // Attach access token to Authorization header as Bearer token
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
