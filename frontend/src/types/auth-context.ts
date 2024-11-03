import { type User } from './user';
import { type Credentials } from './credentials';
import { type SetStateAction, type Dispatch } from 'react';

export interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  login: (credentials: Credentials) => Promise<void>;
  logout: () => Promise<string>;
  register: (credentials: Credentials) => Promise<void>;
  getUser: () => Promise<void>;
}
