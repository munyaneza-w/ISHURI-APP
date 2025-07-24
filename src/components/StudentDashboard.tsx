import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  TrendingUp, 
  CheckCircle, 
  Play,
  MessageSquare,
  Calendar,
  Award
} from "lucide-react";

export const StudentDashboard = () => {
  const recentCourses = [
    { 
      id: 1, 
      title: "Mathematics S4", 
      progress: 75, 
      nextLesson: "Quadratic Equations",
      dueDate: "Tomorrow"
    },
    { 
      id: 2, 
      title: "Physics S4", 
      progress: 60, 
      nextLesson: "Forces and Motion",
      dueDate: "In 3 days"
    },
    { 
      id: 3, 
      title: "Chemistry S4", 
      progress: 45, 
      nextLesson: "Chemical Bonds",
      dueDate: "In 1 week"
    }
  ];

  const upcomingQuizzes = [
    { subject: "Biology", topic: "Cell Structure", date: "Dec 20" },
    { subject: "History", topic: "Pre-colonial Rwanda", date: "Dec 22" },
    { subject: "English", topic: "Literature Analysis", date: "Dec 25" }
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-light to-accent-light rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome back, Jean!
        </h2>
        <p className="text-muted-foreground mb-4">
          Continue your learning journey. You're doing great!
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-warning" />
            <span className="text-sm font-medium">Level 4 Learner</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <span className="text-sm font-medium">12 Lessons Completed</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-light rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Courses</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success-light rounded-lg">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Score</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent-light rounded-lg">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Study Time</p>
                <p className="text-2xl font-bold">24h</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-light rounded-lg">
                <MessageSquare className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Messages</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="border border-border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">Next: {course.nextLesson}</p>
                    </div>
                    <Badge variant="outline">{course.dueDate}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Button size="sm" className="mt-3 w-full">
                    Continue Learning
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Quizzes */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Quizzes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingQuizzes.map((quiz, index) => (
                <div key={index} className="border border-border rounded-lg p-3">
                  <h4 className="font-medium">{quiz.subject}</h4>
                  <p className="text-sm text-muted-foreground">{quiz.topic}</p>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant="secondary">{quiz.date}</Badge>
                    <Button size="sm" variant="outline">
                      Study
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};