import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  BookOpen,
  CheckCircle,
  Calendar,
  Phone
} from "lucide-react";

export const ParentDashboard = () => {
  const children = [
    { 
      id: 1, 
      name: "Alice Uwimana", 
      class: "S4", 
      overallProgress: 82,
      weeklyHours: 18,
      upcomingQuiz: "Mathematics - Dec 20"
    },
    { 
      id: 2, 
      name: "David Uwimana", 
      class: "S2", 
      overallProgress: 75,
      weeklyHours: 15,
      upcomingQuiz: "Science - Dec 22"
    }
  ];

  const recentReports = [
    { subject: "Mathematics", score: 85, grade: "A", date: "Dec 15" },
    { subject: "Physics", score: 78, grade: "B+", date: "Dec 12" },
    { subject: "Chemistry", score: 92, grade: "A", date: "Dec 10" }
  ];

  const teacherMessages = [
    { 
      teacher: "Teacher Mukamuganga", 
      subject: "Mathematics Progress", 
      message: "Alice is showing excellent improvement in algebra...",
      time: "2 days ago"
    },
    { 
      teacher: "Teacher Uwimana", 
      subject: "David's participation", 
      message: "David is actively participating in class discussions...",
      time: "1 week ago"
    }
  ];

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-accent-light to-primary-light rounded-lg p-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Welcome, Mr. & Mrs. Uwimana!
        </h2>
        <p className="text-muted-foreground mb-4">
          Stay connected with your children's educational journey and progress.
        </p>
        <Button className="bg-primary hover:bg-primary/90">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message Teachers
        </Button>
      </div>

      {/* Children Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children.map((child) => (
          <Card key={child.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {child.name}
                <Badge variant="outline">{child.class}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-success-light rounded-lg">
                  <TrendingUp className="h-6 w-6 text-success mx-auto mb-1" />
                  <p className="text-2xl font-bold">{child.overallProgress}%</p>
                  <p className="text-sm text-muted-foreground">Overall Progress</p>
                </div>
                <div className="text-center p-3 bg-accent-light rounded-lg">
                  <Clock className="h-6 w-6 text-accent mx-auto mb-1" />
                  <p className="text-2xl font-bold">{child.weeklyHours}h</p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Next Quiz:</p>
                <div className="flex items-center justify-between bg-warning-light p-2 rounded">
                  <span className="text-sm">{child.upcomingQuiz}</span>
                  <Calendar className="h-4 w-4 text-warning" />
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Academic Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recent Academic Reports
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{report.subject}</h3>
                  <Badge variant={
                    report.grade.startsWith('A') ? 'default' : 
                    report.grade.startsWith('B') ? 'secondary' : 'outline'
                  }>
                    {report.grade}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">{report.score}%</span>
                  <span className="text-sm text-muted-foreground">{report.date}</span>
                </div>
                <Progress value={report.score} className="h-2 mt-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Teacher Communications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Teacher Communications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {teacherMessages.map((message, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{message.teacher}</h4>
                  <span className="text-xs text-muted-foreground">{message.time}</span>
                </div>
                <p className="text-sm font-medium text-primary mb-1">{message.subject}</p>
                <p className="text-sm text-muted-foreground">{message.message}</p>
                <Button size="sm" variant="outline" className="mt-2">
                  <Phone className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              </div>
            ))}
            
            <Button className="w-full">
              View All Messages
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              Schedule Parent-Teacher Meeting
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CheckCircle className="h-6 w-6 mb-2" />
              Review Homework Status
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              View Progress Analytics
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};