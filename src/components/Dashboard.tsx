import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';

export const Dashboard = () => {
  const { user, profile, loading } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading user data...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">eShuri Dashboard</h1>
        <Button onClick={handleSignOut} variant="outline">
          Sign Out
        </Button>
      </div>
      <div className="mt-6">
        <p className="text-xl">Welcome back, <span className="font-semibold">{profile?.full_name || user?.email}</span>!</p>
        <p>Your role is: <span className="capitalize">{profile?.role}</span></p>
      </div>
      {/* Your main app components (e.g., Courses, Progress) would go here */}
    </div>
  );
};