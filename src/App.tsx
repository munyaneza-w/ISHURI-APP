import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import { AuthForm } from "./components/auth/AuthForm";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { StudentDashboard } from "./components/StudentDashboard";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { ParentDashboard } from "./components/ParentDashboard";
import { useAuth } from "./providers/AuthProvider";
import { LandingPage } from "./components/LandingPage";

const queryClient = new QueryClient();

const DashboardByRole = () => {
  const { profile, loading } = useAuth();

  // We are inside a protected route, so a session is guaranteed.
  // We just need to wait for the profile to load.
  if (loading || !profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p className="text-foreground">Loading profile...</p>
      </div>
    );
  }

  switch (profile.role) {
    case 'student':
      return <StudentDashboard />;
    case 'teacher':
      return <TeacherDashboard />;
    case 'parent':
      return <ParentDashboard />;
    default:
      // This case should ideally not be reached.
      console.error("Unknown user role:", profile.role);
      return <Navigate to="/auth" replace />;
  }
};

const App = () => {
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/auth" element={<AuthForm onSuccess={() => navigate('/dashboard')} />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardByRole />} />
              {/* Add other protected routes here, e.g., /courses, /settings */}
            </Route>
          </Route>
          <Route path="/" element={<LandingPage onRoleSelect={() => navigate('/auth')} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
