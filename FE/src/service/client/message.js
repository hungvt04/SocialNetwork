import { API_MANAGEMENT_CHAT } from '@/constants/BaseApi';
import axiosInstance from '../api/axiosInstance';

export const getMessageFriends = async (params) => {
  const response = await axiosInstance.get(API_MANAGEMENT_CHAT, { params });
  return response;
};

export const postMessage = async (data) => {
  const response = await axiosInstance.post(API_MANAGEMENT_CHAT, JSON.stringify(data));
  return response;
};
