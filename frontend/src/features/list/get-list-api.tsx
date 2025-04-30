import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const getListApi = async () => {
  try {
    const response = await api.get('/profile/list/usernames');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Operation Failed');
  }
};

export const useGetList = () => {
  return useQuery<string[]>({
    queryKey: ['list'],
    queryFn: getListApi,
  });
};
