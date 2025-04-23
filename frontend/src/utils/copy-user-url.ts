import { APP_URL } from '@/config';
import toast from 'react-hot-toast';

export function copyUserUrl(username: string) {
  navigator.clipboard.writeText(`${APP_URL}/@${username}`);
  toast.success('The link has been copied to your clipboard!');
}
