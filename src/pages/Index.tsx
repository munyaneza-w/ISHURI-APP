import { useAuth } from "@/hooks/useAuth";
import { Header } from "@/components/Header";
import { LandingPage } from "@/components/LandingPage";
import { StudentDashboard } from "@/components/StudentDashboard";
import { TeacherDashboard } from "@/components/TeacherDashboard";
import { ParentDashboard } from "@/components/ParentDashboard";
import { AuthForm } from "@/components/auth/AuthForm";

const Index = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return <AuthForm onSuccess={() => window.location.reload()} />;
  }

  const renderDashboard = () => {
    switch (profile.role) {
      case 'student':
        return <StudentDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <LandingPage onRoleSelect={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole={profile.role} profile={profile} />
      {renderDashboard()}
    </div>
  );
};

export default Index;
