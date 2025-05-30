import { API_MANAGEMENT_FRIENDS } from '@/constants/BaseApi';
import axiosInstance from '../api/axiosInstance';

export const getFriends = async (request) => {
  const response = await axiosInstance.get(API_MANAGEMENT_FRIENDS, request);
  return response;
};

export const getFriendRequests = async (request) => {
  const response = await axiosInstance.get(API_MANAGEMENT_FRIENDS + '/requests', request);
  return response;
};

export const getSuggestedPeople = async (request) => {
  const response = await axiosInstance.get(API_MANAGEMENT_FRIENDS + '/suggestions', request);
  return response;
};

export const postFriend = async (user2Id) => {
  const response = await axiosInstance.post(API_MANAGEMENT_FRIENDS + `/request-friend/${user2Id}`);
  return response;
};

export const deleteFriend = async (userId) => {
  const response = await axiosInstance.delete(API_MANAGEMENT_FRIENDS + `/delete-friend/${userId}`);
  return response;
};

export const putAcceptFriend = async (user1Id) => {
  const response = await axiosInstance.put(API_MANAGEMENT_FRIENDS + `/accept-friend/${user1Id}`);
  return response;
};

export const putRejectFriend = async (user1Id) => {
  const response = await axiosInstance.put(API_MANAGEMENT_FRIENDS + `/reject-friend/${user1Id}`);
  return response;
};

export const putBlockFriend = async (userId) => {
  const response = await axiosInstance.put(API_MANAGEMENT_FRIENDS + `/accept-friend/${userId}`);
  return response;
};
