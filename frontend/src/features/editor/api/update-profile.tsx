import { api } from '@/lib/api';
import axios from 'axios';

interface ProfileDataType {
  username?: string;
  name?: string;
  about?: string;
  image?: string;
}

export async function updateProfile(profileData: ProfileDataType) {
  try {
    const response = await api.patch('/profile/update-profile', profileData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Operation Failed');
  }
}
