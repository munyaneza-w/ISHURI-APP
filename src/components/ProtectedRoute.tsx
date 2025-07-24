import { useAuth } from '@/providers/AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-foreground">Loading...</p>
      </div>
    );
  }

  return session ? <Outlet /> : <Navigate to="/auth" />;
};