import { api } from '@/lib/api';
import axios from 'axios';

interface ProfileDataType {
  username?: string;
  name?: string;
  about?: string;
  image?: File;
}

export async function updateProfile(profileData: ProfileDataType) {
  try {
    const response = await api.patch('/profile/update-profile', profileData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Operation Failed');
  }
}
