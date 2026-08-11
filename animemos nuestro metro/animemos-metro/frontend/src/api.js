import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const api = axios.create({ baseURL: API_URL });

// Adjunta automáticamente el token guardado (usuario o trabajador) si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('anm_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('anm_token');
      localStorage.removeItem('anm_role');
      localStorage.removeItem('anm_name');
      window.dispatchEvent(new Event('auth:expired'));
    }
    return Promise.reject(error);
  }
);

export default api;
export const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '573045217695';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
