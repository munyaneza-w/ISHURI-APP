import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Globe,
  CheckCircle,
  Play,
  Star
} from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

interface LandingPageProps {
  onRoleSelect: (role: 'student' | 'teacher' | 'parent') => void;
}

export const LandingPage = ({ onRoleSelect }: LandingPageProps) => {
  const features = [
    {
      icon: BookOpen,
      title: "REB Curriculum Aligned",
      description: "All content follows the official Rwandan Education Board curriculum for S1-S6."
    },
    {
      icon: Users,
      title: "Multi-Role Platform",
      description: "Designed for students, teachers, and parents with personalized dashboards."
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Real-time analytics and performance monitoring for academic success."
    },
    {
      icon: Globe,
      title: "Offline Access",
      description: "Download lessons and materials for learning without internet connectivity."
    }
  ];

  const testimonials = [
    {
      name: "Marie Uwimana",
      role: "Student, S5",
      content: "eShuri helped me improve my mathematics scores by 30%. The interactive lessons make learning fun!",
      rating: 5
    },
    {
      name: "Teacher Mukamuganga",
      role: "Mathematics Teacher",
      content: "Creating and sharing lessons has never been easier. My students are more engaged than ever.",
      rating: 5
    },
    {
      name: "Mr. Nkurunziza",
      role: "Parent",
      content: "I can finally track my child's progress and communicate directly with teachers. Excellent platform!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-light to-accent-light py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Empowering Rwanda's 
                <span className="text-primary"> Future Leaders</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Bridge the education quality gap with our comprehensive digital learning platform. 
                Aligned with REB curriculum for S1-S6 students, teachers, and parents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => onRoleSelect('student')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Learning
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => onRoleSelect('teacher')}
                >
                  For Educators
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Students learning with eShuri platform"
                className="rounded-lg shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-success" />
                  <div>
                    <p className="font-semibold">1,200+ Students</p>
                    <p className="text-sm text-muted-foreground">Learning Daily</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose eShuri?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is specifically designed for the Rwandan education system, 
              ensuring quality learning for every student.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-primary-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join thousands of Rwandan students, teachers, and parents on their educational journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:scale-105 transition-transform cursor-pointer" 
                  onClick={() => onRoleSelect('student')}>
              <CardContent className="pt-8 pb-6">
                <BookOpen className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Students</h3>
                <p className="text-muted-foreground mb-4">
                  Access lessons, take quizzes, and track your academic progress.
                </p>
                <Button className="w-full">Enter Student Portal</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => onRoleSelect('teacher')}>
              <CardContent className="pt-8 pb-6">
                <Users className="h-16 w-16 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Teachers</h3>
                <p className="text-muted-foreground mb-4">
                  Create lessons, manage classes, and monitor student performance.
                </p>
                <Button variant="secondary" className="w-full">Enter Teacher Hub</Button>
              </CardContent>
            </Card>

            <Card className="text-center hover:scale-105 transition-transform cursor-pointer"
                  onClick={() => onRoleSelect('parent')}>
              <CardContent className="pt-8 pb-6">
                <TrendingUp className="h-16 w-16 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Parents</h3>
                <p className="text-muted-foreground mb-4">
                  Monitor your child's progress and communicate with teachers.
                </p>
                <Button variant="outline" className="w-full">Enter Parent Dashboard</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-muted-foreground">
              Real feedback from students, teachers, and parents using eShuri.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">eShuri</h3>
            <p className="text-background/80 mb-6">
              Empowering education in Rwanda through digital innovation.
            </p>
            <p className="text-sm text-background/60">
              © 2024 eShuri. All rights reserved. | Built for the Rwandan Education Board curriculum.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};