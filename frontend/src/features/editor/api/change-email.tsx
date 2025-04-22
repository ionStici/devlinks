import { api } from '@/lib/api';
import axios from 'axios';

export type ChangeEmailDto = {
  email: string;
  newEmail: string;
  password: string;
};

export async function changeEmailApi(data: ChangeEmailDto) {
  try {
    const response = await api.patch('/users/email', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Operation Failed');
  }
}
