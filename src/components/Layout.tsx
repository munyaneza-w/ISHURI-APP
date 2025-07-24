import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { useAuth } from '@/providers/AuthProvider';

export const Layout = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header profile={profile} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};