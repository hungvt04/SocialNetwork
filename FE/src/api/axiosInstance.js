import axios from 'axios';
import { LOCAL_STORAGE_ACCESS_TOKEN } from '../constants/BaseApi';
import Loading from '../pages/clients/common/loading/Loading';

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
    console.log({ token });

    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
