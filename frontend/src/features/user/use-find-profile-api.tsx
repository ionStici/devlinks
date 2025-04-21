import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export async function findProfileApi(username: string) {
  try {
    const response = await api.get(`/profile/${username}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Operation Failed');
  }
}

export function useFindProfile(username: string) {
  return useQuery({
    queryKey: ['profile', username],
    queryFn: () => findProfileApi(username),
  });
}
