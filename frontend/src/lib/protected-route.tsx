import { useAuth } from './auth';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';

export const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};
