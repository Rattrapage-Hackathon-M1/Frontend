import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Remplacez par votre base URL si nécessaire
});

axiosInstance.interceptors.request.use(config => {
  if (config.method?.toUpperCase() === 'OPTIONS') {
    delete config.headers.Authorization;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosInstance;
