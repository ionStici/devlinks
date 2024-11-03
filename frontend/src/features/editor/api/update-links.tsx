import { api } from '@/lib/api';
import { formatLinks } from '@/utils/format-links';
import axios from 'axios';

export async function updateLinks(formData: FormData) {
  const links = formatLinks(formData);

  try {
    const response = await api.patch('/profile/update-links', { links });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw new Error('Operation Failed');
  }
}
