import { Button } from "@/components/ui/button";
import { GraduationCap, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Profile {
  full_name: string;
  role: string;
  school_name?: string;
}

interface HeaderProps {
  userRole?: string;
  profile?: Profile;
}

export const Header = ({ userRole, profile }: HeaderProps) => {
  const { signOut } = useAuth();

  return (
    <header className="bg-card border-b border-border px-4 py-3 md:px-6">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">eShuri</h1>
              <p className="text-xs text-muted-foreground">Digital Learning Platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {profile && (
            <div className="hidden md:flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">{profile.full_name}</p>
                <p className="text-xs text-muted-foreground capitalize">{profile.role}</p>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={signOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};