import axios from 'axios';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '../constants/BaseApi';
import Loading from '../pages/clients/common/loading/Loading';
import { ROUTE_EXCEPTION } from '../routes/RouteException';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

// Gắn token tự động cho mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    const status = error.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN);
      ROUTE_EXCEPTION.forEach((route) => {
        if (status == route.props.title) {
          window.location.href = route.route;
        }
      });
    }

    return Promise.reject(error?.response?.data);
  },
);

export default axiosInstance;
