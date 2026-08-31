import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});
api.interceptors.response.use(
  response => response,
  error => {
    // A simulation can fail in an upstream AI provider. Its authorization
    // response is not evidence that this user session is invalid.
    const isSimulationRequest = error.config?.url?.startsWith('/simulations');
    if ([401, 403].includes(error.response?.status) && !isSimulationRequest) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);
export default api;
