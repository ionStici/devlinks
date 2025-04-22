import { api } from '@/lib/api';
import axios from 'axios';

export type DeleteAccountDto = {
  email: string;
  password: string;
};

export async function deleteAccountApi(data: DeleteAccountDto) {
  try {
    const response = await api.delete('/users', { data });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Operation Failed');
  }
}
