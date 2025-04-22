import { api } from '@/lib/api';
import axios from 'axios';

export type ChangePasswordDto = {
  email: string;
  password: string;
  newPassword: string;
};

export async function changePasswordApi(data: ChangePasswordDto) {
  try {
    const response = await api.patch('/users/password', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Operation Failed');
  }
}
