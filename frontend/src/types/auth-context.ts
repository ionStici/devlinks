import { type User } from './user';
import { type Credentials } from './credentials';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<string>;
  register: (credentials: Credentials) => Promise<void>;
  getUser: () => Promise<void>;
}
